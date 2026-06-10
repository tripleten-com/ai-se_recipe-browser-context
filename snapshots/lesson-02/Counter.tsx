import { useContext } from "react";
import { FavoritesContext } from "../../contexts/FavoritesContext";

function Counter() {
  const { favorites } = useContext(FavoritesContext);
  return <span className="header__count">({favorites.size})</span>;
}

export default Counter;
