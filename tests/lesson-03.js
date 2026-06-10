import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { checkCompiles, checkBuilds, checkBehavior, normalize } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function read(relPath) {
  try {
    return normalize(readFileSync(join(root, relPath), "utf8"));
  } catch {
    return null;
  }
}

let pass = 0;
let fail = 0;

function test(label, fn) {
  try {
    fn();
    console.log(`✅ ${label}`);
    pass++;
  } catch (err) {
    console.log(`❌ ${label} — ${err.message}`);
    fail++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log("\nLesson 03: The Provider Pattern\n");

const compiled = checkCompiles(root);
if (!compiled.ok) {
  console.log(
    "❌ TypeScript compilation failed — fix all type errors before running tests\n",
  );
  console.log(compiled.output);
  process.exit(1);
}
console.log("✅ Project compiles without type errors");

const built = checkBuilds(root);
if (!built.ok) {
  console.log("❌ Vite build failed — the app does not run without errors\n");
  console.log(built.output);
  process.exit(1);
}
console.log("✅ App builds without errors\n");

const contextFile = read("src/contexts/FavoritesContext.tsx");
const contextFileTs = read("src/contexts/FavoritesContext.ts");
const main = read("src/main.tsx");
const app = read("src/components/App/App.tsx");

test("src/contexts/FavoritesContext.tsx exists", () => {
  const hint = contextFileTs !== null
    ? "Found FavoritesContext.ts — rename it to FavoritesContext.tsx (it now exports a React component)"
    : "src/contexts/FavoritesContext.tsx not found — complete lesson 2 first, then rename FavoritesContext.ts to FavoritesContext.tsx";
  assert(contextFile !== null, hint);
});

test("FavoritesContext.tsx exports FavoritesProvider", () => {
  assert(
    contextFile && contextFile.includes("FavoritesProvider"),
    "FavoritesContext.tsx does not export a FavoritesProvider component",
  );
});

test("FavoritesContext.tsx exports useFavorites hook", () => {
  assert(
    contextFile && contextFile.includes("useFavorites"),
    "FavoritesContext.tsx does not export a useFavorites hook",
  );
});

test("FavoritesContext.tsx context value includes favorites and onToggleFavorite", () => {
  assert(
    contextFile &&
      contextFile.includes("favorites") &&
      contextFile.includes("onToggleFavorite"),
    "FavoritesContext.tsx context value should include both favorites and onToggleFavorite",
  );
});

test("main.tsx wraps the app with FavoritesProvider", () => {
  assert(
    main && main.includes("FavoritesProvider"),
    "main.tsx does not render <FavoritesProvider> — wrap <App /> with it",
  );
});

test("App.tsx no longer owns favorites state", () => {
  assert(
    app && !app.includes("setFavorites"),
    "App.tsx still contains setFavorites — move favorites state into FavoritesProvider",
  );
});

test("Favoriting behavior works through the Provider", () => {
  const result = checkBehavior(root, "tests/lib/lesson-03.behavior.test.tsx");
  assert(
    result.ok,
    "Behavioral tests failed — run `npm test -- tests/lib/lesson-03.behavior.test.tsx` for details",
  );
});

test("FavoritesContext.tsx reads from localStorage on init", () => {
  assert(
    contextFile && contextFile.includes("localStorage.getItem"),
    "FavoritesContext.tsx does not call localStorage.getItem — use a lazy initializer to read saved favorites on mount",
  );
});

test("FavoritesContext.tsx uses the 'saved-recipes' key", () => {
  assert(
    contextFile && contextFile.includes("saved-recipes"),
    "FavoritesContext.tsx does not use the key 'saved-recipes' — use that key for both reading and writing",
  );
});

test("FavoritesContext.tsx uses JSON.parse to restore saved favorites", () => {
  assert(
    contextFile && contextFile.includes("JSON.parse"),
    "FavoritesContext.tsx does not call JSON.parse — parse the stored JSON string back into an array",
  );
});

test("FavoritesContext.tsx has a useEffect that writes to localStorage", () => {
  assert(
    contextFile &&
      contextFile.includes("useEffect") &&
      contextFile.includes("localStorage.setItem"),
    "FavoritesContext.tsx does not have a useEffect that calls localStorage.setItem — sync favorites to storage on each change",
  );
});

test("FavoritesContext.tsx serializes the Set to JSON before storing", () => {
  assert(
    contextFile && contextFile.includes("JSON.stringify"),
    "FavoritesContext.tsx does not call JSON.stringify — convert favorites to a JSON array before storing",
  );
});

console.log(`\n${pass} passed, ${fail} failed`);
if (fail === 0) {
  const code = Buffer.from("bWc0dGhzOGI=", "base64").toString();
  console.log(`\nVerification code: ${code}`);
}
if (fail > 0) process.exit(1);