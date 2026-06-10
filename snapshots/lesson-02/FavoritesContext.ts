import { createContext } from "react";

export const FavoritesContext = createContext({ favorites: new Set<string>() });
