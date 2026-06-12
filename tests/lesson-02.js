import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { runGates, test, assert, summary, normalize } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function read(relPath) {
  try {
    return normalize(readFileSync(join(root, relPath), "utf8"));
  } catch {
    return null;
  }
}

console.log("\nLesson 02: createContext and useContext\n");

runGates(root);

const contextFile =
  read("src/contexts/FavoritesContext.ts") ||
  read("src/contexts/FavoritesContext.tsx");
const counter = read("src/components/Counter/Counter.tsx");
const main = read("src/main.tsx");

test("src/contexts/FavoritesContext.ts exists", () => {
  assert(
    contextFile !== null,
    "src/contexts/FavoritesContext.ts not found — create it and export FavoritesContext",
  );
});

test("FavoritesContext uses createContext", () => {
  assert(
    contextFile && contextFile.includes("createContext"),
    "FavoritesContext does not call createContext",
  );
});

test("FavoritesContext exports FavoritesContext", () => {
  assert(
    contextFile && contextFile.includes("FavoritesContext"),
    "FavoritesContext does not export FavoritesContext",
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

summary("Zno5d3ZqMnI=");