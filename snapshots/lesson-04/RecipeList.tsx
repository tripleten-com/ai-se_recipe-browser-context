import type { Recipe } from "../../types";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeList.css";

type Props = {
  recipes: Recipe[];
};

function RecipeList({ recipes }: Props) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="recipe-list__item">
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
