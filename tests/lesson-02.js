import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { checkCompiles, checkBuilds, normalize } from "./lib/utils.js";

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

console.log("\nLesson 02: createContext and useContext\n");

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

const contextFile = read("src/contexts/FavoritesContext.ts");
const counter = read("src/components/Counter/Counter.tsx");
const main = read("src/main.tsx");

test("src/contexts/FavoritesContext.ts exists", () => {
  assert(
    contextFile !== null,
    "src/contexts/FavoritesContext.ts not found — create it and export FavoritesContext",
  );
});

test("FavoritesContext.ts uses createContext", () => {
  assert(
    contextFile && contextFile.includes("createContext"),
    "FavoritesContext.ts does not call createContext",
  );
});

test("FavoritesContext.ts exports FavoritesContext", () => {
  assert(
    contextFile && contextFile.includes("FavoritesContext"),
    "FavoritesContext.ts does not export FavoritesContext",
  );
});

test("main.tsx provides FavoritesContext.Provider", () => {
  assert(
    main && main.includes("FavoritesContext.Provider"),
    "main.tsx does not render <FavoritesContext.Provider> — wrap <App /> with it",
  );
});

test("Counter.tsx uses useContext", () => {
  assert(
    counter && counter.includes("useContext"),
    "Counter.tsx does not call useContext — call useContext(FavoritesContext) to read the favorites",
  );
});

test("Counter.tsx reads favorites.size from context", () => {
  assert(
    counter && counter.includes("favorites.size"),
    "Counter.tsx does not use favorites.size — destructure { favorites } from context and render favorites.size",
  );
});

console.log(`\n${pass} passed, ${fail} failed`);
if (fail === 0) {
  const code = Buffer.from("Zno5d3ZqMnI=", "base64").toString();
  console.log(`\nVerification code: ${code}`);
}
if (fail > 0) process.exit(1);