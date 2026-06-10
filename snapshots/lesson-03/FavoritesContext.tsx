import { createContext, useContext, useState } from "react";

// Context value type is an object storing whatever values
// we want to include.
type FavoritesContextValue = {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

// Create the context and pass it reasonable defaults.
export const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: new Set(),
  onToggleFavorite: () => {},
});

// Export the FavoritesProvider function. It has a `children` prop, which
// renders the child elements of the Provider.
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // Declare the state owned by context.
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  function handleToggleFavorite(id: string) {
    const newSet = new Set(favorites);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setFavorites(newSet);
  }

  // Return the provider. When rendered, {children} will be replaced by
  // the provider's children.
  return (
    <FavoritesContext.Provider
      value={{ favorites, onToggleFavorite: handleToggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
