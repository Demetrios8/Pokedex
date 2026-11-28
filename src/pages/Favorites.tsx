import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";
import { useFavorites } from "../context/FavoritesContext";
import { getErrorMessage, getPokemon } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loadedFor, setLoadedFor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const favoritesKey = favorites.join(",");

  useEffect(() => {
    if (favorites.length === 0) {
      setPokemonList([]);
      setError(null);
      setLoadedFor(favoritesKey);
      return;
    }

    let cancelled = false;
    setError(null);
    setLoadedFor("");

    Promise.all(favorites.map((id) => getPokemon(id)))
      .then((pokemon) => {
        if (!cancelled) {
          setPokemonList(pokemon);
          setLoadedFor(favoritesKey);
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(getErrorMessage(reason));
          setLoadedFor(favoritesKey);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [favorites, favoritesKey, retryCount]);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="Você ainda não tem favoritos"
        description="Marque um Pokémon com o coração para vê-lo aqui."
      />
    );
  }

  const loading = loadedFor !== favoritesKey;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" component="h1">
        Favoritos
      </Typography>

      {loading && <Loading />}
      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => setRetryCount((count) => count + 1)}
        />
      )}
      {!loading && !error && (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </Box>
      )}
    </Box>
  );
}
