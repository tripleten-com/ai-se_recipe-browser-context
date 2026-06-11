import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import type { Recipe } from "../../types";
import { allRecipes } from "../../data/recipes";
import AppLayout from "../AppLayout/AppLayout";
import HomePage from "../../pages/HomePage";
import FavoritesPage from "../../pages/FavoritesPage";
import RecipePage from "../../pages/RecipePage";
import NotFoundPage from "../../pages/NotFoundPage";

import "./App.css";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRecipes(allRecipes);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return <p className="app__loading">Loading...</p>;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage recipes={recipes} />} />
        <Route
          path="/favorites"
          element={<FavoritesPage recipes={recipes} />}
        />
        <Route path="/recipes/:id" element={<RecipePage recipes={recipes} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
