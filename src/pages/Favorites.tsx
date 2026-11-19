import EmptyState from "../components/EmptyState";
import { useFavorites } from "../context/FavoritesContext";

// TODO (Integrante 6): buscar os Pokémon favoritos (getPokemon por id) e listar com PokemonCard
export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="Você ainda não tem favoritos"
        description="Marque um Pokémon com o coração para vê-lo aqui."
      />
    );
  }

  return <h2>Favoritos: {favorites.length}</h2>;
}