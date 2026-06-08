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
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const favoritesJSON = JSON.stringify([...favorites]);
    localStorage.setItem("favorites", favoritesJSON);
  }, [favorites]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRecipes(allRecipes);
      setIsLoading(false);

      return () => clearTimeout(timeoutId);
    }, 500);
  }, []);

  if (isLoading) {
    return <p className="app__loading">Loading...</p>;
  }

  function handleToggleFavorite(id: string) {
    const newSet = new Set(favorites);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setFavorites(newSet);
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <HomePage
              recipes={recipes}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              recipes={recipes}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route path="/recipes/:id" element={<RecipePage recipes={recipes} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
