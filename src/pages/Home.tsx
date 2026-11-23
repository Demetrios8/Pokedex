import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import { getErrorMessage, getPokemon } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const executeSearch = useCallback(async (query: string) => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      setSearchedPokemon(null);
      setSearchError(null);
      setLoadingSearch(false);
      return;
    }

    setLoadingSearch(true);
    setSearchError(null);

    try {
      const data = await getPokemon(cleanQuery);
      setSearchedPokemon(data);
    } catch (error: unknown) {
      setSearchedPokemon(null);
      setSearchError(getErrorMessage(error));
    } finally {
      setLoadingSearch(false);
    }
  }, []);

  useEffect(() => {
    void executeSearch(searchQuery);
  }, [searchQuery, executeSearch]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h4" component="h1">
          Pokédex
        </Typography>

        <SearchBar value={searchQuery} onSearch={handleSearch} />

        {normalizedQuery ? (
            <>
              {loadingSearch && <Loading />}

              {!loadingSearch && searchError && (
                  <ErrorMessage
                      message={searchError}
                      onRetry={() => void executeSearch(searchQuery)}
                  />
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
