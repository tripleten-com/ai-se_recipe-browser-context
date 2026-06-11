import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./components/App/App";
import { FavoritesContext } from "./contexts/FavoritesContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesContext.Provider value={{ favorites: new Set() }}>
        <App />
      </FavoritesContext.Provider>
    </BrowserRouter>
  </StrictMode>,
);
