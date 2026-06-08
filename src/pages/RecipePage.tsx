import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { categoryColors } from "../data/recipes";
import type { Recipe } from "../types";

type Props = {
  recipes: Recipe[];
};

function RecipePage({ recipes }: Props) {
  const { id } = useParams();
  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  if (!currentRecipe) {
    return <p className="app__message">Recipe not found</p>;
  }

  return (
    <article className="app__container">
      <div className="recipe-detail">
        <span
          style={{
            backgroundColor:
              categoryColors[currentRecipe.category.toLocaleLowerCase()],
          }}
          className="recipe-detail__category"
        >
          {currentRecipe.category}
        </span>
        <h1>{currentRecipe.title}</h1>
        <p>{currentRecipe.description}</p>
        <div className="markdown">
          <ReactMarkdown>{currentRecipe.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

export default RecipePage;
