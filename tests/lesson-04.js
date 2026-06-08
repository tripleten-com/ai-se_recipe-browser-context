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

console.log("\nLesson 04: Updating Context from a Nested Component\n");

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

const recipeCard = read("src/components/RecipeCard/RecipeCard.tsx");
const recipeList = read("src/components/RecipeList/RecipeList.tsx");
const homePage = read("src/pages/HomePage.tsx");
const favoritesPage = read("src/pages/FavoritesPage.tsx");

test("RecipeCard.tsx calls useFavorites", () => {
  assert(
    recipeCard && recipeCard.includes("useFavorites"),
    "RecipeCard.tsx does not call useFavorites — replace the onToggleFavorite prop with context",
  );
});

test("RecipeCard.tsx no longer accepts onToggleFavorite as a prop", () => {
  assert(
    recipeCard && !recipeCard.includes("onToggleFavorite:"),
    "RecipeCard.tsx still declares onToggleFavorite in its Props type — remove it",
  );
});

test("RecipeCard.tsx no longer accepts isFavorited as a prop", () => {
  assert(
    recipeCard && !recipeCard.includes("isFavorited:"),
    "RecipeCard.tsx still declares isFavorited in its Props type — derive it from context instead",
  );
});

test("RecipeList.tsx does not pass onToggleFavorite to RecipeCard", () => {
  assert(
    recipeList && !recipeList.includes("onToggleFavorite"),
    "RecipeList.tsx still references onToggleFavorite — remove it from the props passed to RecipeCard",
  );
});

test("RecipeList.tsx does not pass favorites to RecipeCard", () => {
  assert(
    recipeList && !recipeList.includes("isFavorited"),
    "RecipeList.tsx still passes isFavorited to RecipeCard — RecipeCard now derives this from context",
  );
});

test("HomePage.tsx no longer has favorites-related props", () => {
  assert(
    homePage && !homePage.includes("onToggleFavorite"),
    "HomePage.tsx still references onToggleFavorite — remove it from the component's props",
  );
});

test("FavoritesPage.tsx reads favorites from useFavorites", () => {
  assert(
    favoritesPage && favoritesPage.includes("useFavorites"),
    "FavoritesPage.tsx does not call useFavorites — replace the favorites prop with context",
  );
});

test("Favorite toggle behavior works through context after prop chain removal", () => {
  const result = checkBehavior(root, "tests/lib/lesson-04.behavior.test.tsx");
  assert(
    result.ok,
    "Behavioral tests failed — run `npm test -- tests/lib/lesson-04.behavior.test.tsx` for details",
  );
});

console.log(`\n${pass} passed, ${fail} failed`);
if (fail === 0) {
  const code = Buffer.from("cWE2eW53NWM=", "base64").toString();
  console.log(`\nVerification code: ${code}`);
}
if (fail > 0) process.exit(1);