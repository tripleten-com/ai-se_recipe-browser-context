import { useState } from "react";

import type { Recipe } from "../types";
import RecipeList from "../components/RecipeList/RecipeList";

type Props = {
  recipes: Recipe[];
};

function HomePage({ recipes }: Props) {
  const [query, setQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app__container">
      <input
        className="app__search"
        type="search"
        placeholder="Filter recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <h1 className="app__heading">Recipes</h1>
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}
export default HomePage;
