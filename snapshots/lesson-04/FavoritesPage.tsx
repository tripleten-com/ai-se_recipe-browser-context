import type { Recipe } from "../types";
import RecipeList from "../components/RecipeList/RecipeList";
import { useFavorites } from "../contexts/FavoritesContext";

type Props = {
  recipes: Recipe[];
};

function FavoritesPage({ recipes }: Props) {
  const { favorites } = useFavorites();
  const favoritedRecipes = recipes.filter((recipe) => favorites.has(recipe.id));

  return (
    <div className="app__container">
      <h1 className="app__heading">Favorites</h1>
      {favoritedRecipes.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <RecipeList recipes={favoritedRecipes} />
      )}
    </div>
  );
}

export default FavoritesPage;
