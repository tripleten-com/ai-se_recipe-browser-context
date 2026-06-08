import { useNavigate } from "react-router";

import type { Recipe } from "../../types";
import { categoryColors } from "../../data/recipes";
import "./RecipeCard.css";

import heartIcon from "../../assets/heart.svg";
import heartFilledIcon from "../../assets/heart-filled.svg";

type Props = {
  recipe: Recipe;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
};

function RecipeCard({ recipe, onToggleFavorite, isFavorited }: Props) {
  const navigate = useNavigate();

  return (
    <article className="recipe-card">
      <button
        type="button"
        className="recipe-card__view"
        onClick={() => navigate(`/recipes/${recipe.id}`)}
        aria-label="View recipe details"
      ></button>
      <span
        style={{
          backgroundColor: categoryColors[recipe.category.toLocaleLowerCase()],
        }}
        className="recipe-card__category"
      >
        {recipe.category}
      </span>
      <h2 className="recipe-card__title">{recipe.title}</h2>
      <p className="recipe-card__description">{recipe.description}</p>
      <button
        className="recipe-card__favorite"
        onClick={() => onToggleFavorite(recipe.id)}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <img
          src={isFavorited ? heartFilledIcon : heartIcon}
          alt=""
          className="recipe-card__favorite-icon"
        />
      </button>
    </article>
  );
}

export default RecipeCard;
