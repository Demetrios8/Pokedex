import axios from "axios";
import { api } from "./api";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

// Lista paginada (Integrante 2)
export async function getPokemonList(limit = 20, offset = 0) {
  const { data } = await api.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });
  return data;
}

// Busca por nome ou número (Integrantes 3 e 4)
export async function getPokemon(nameOrId: string | number) {
  const { data } = await api.get<Pokemon>(
    `/pokemon/${String(nameOrId).trim().toLowerCase()}`
  );
  return data;
}

// Transforma qualquer erro em uma mensagem amigável para a tela
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) return "Pokémon não encontrado.";
    if (!error.response) return "Falha de conexão. Verifique sua internet.";
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}