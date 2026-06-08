import type { Recipe } from "../../types";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeList.css";

type Props = {
  recipes: Recipe[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

function RecipeList({ recipes, favorites, onToggleFavorite }: Props) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="recipe-list__item">
          <RecipeCard
            recipe={recipe}
            isFavorited={favorites.has(recipe.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
