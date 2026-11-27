import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import { getErrorMessage, getPokemon } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

interface SearchResult {
  query: string;
  pokemon: Pokemon | null;
  error: string | null;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  useEffect(() => {
    if (!normalizedQuery) return;

    // evita que uma resposta antiga sobrescreva uma busca mais nova
    let cancelled = false;

    getPokemon(normalizedQuery)
      .then((pokemon) => {
        if (!cancelled) setResult({ query: normalizedQuery, pokemon, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setResult({ query: normalizedQuery, pokemon: null, error: getErrorMessage(error) });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [normalizedQuery, retryCount]);

  // O resultado só vale se for da busca atual; senão, ainda está carregando
  const current = result?.query === normalizedQuery ? result : null;
  const loadingSearch = normalizedQuery !== "" && current === null;
  const searchError = current?.error ?? null;
  const searchedPokemon = current?.pokemon ?? null;

  const handleRetry = () => {
    setResult(null);
    setRetryCount((count) => count + 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" component="h1">
        Pokédex
      </Typography>

      <SearchBar value={searchQuery} onSearch={setSearchQuery} />

      {normalizedQuery ? (
        <>
          {loadingSearch && <Loading />}

          {!loadingSearch && searchError && (
            <ErrorMessage message={searchError} onRetry={handleRetry} />
          )}

          {!loadingSearch && !searchError && searchedPokemon && (
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              <PokemonCard pokemon={searchedPokemon} />
            </Box>
          )}

          {!loadingSearch && !searchError && !searchedPokemon && (
            <EmptyState
              title="Nenhum Pokémon encontrado"
              description="Tente buscar por outro nome ou número."
            />
          )}
        </>
      ) : (
        <Box>
          {/* Espaço reservado para a listagem e paginação da Home (#2) quando mesclada na main */}
        </Box>
      )}
    </Box>
  );
}