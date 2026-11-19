import { useParams } from "react-router-dom";

// TODO (Integrante 4): buscar com getPokemon(id) em useEffect, tratar loading e erro,
//                      mostrar imagem, TypeBadge, habilidades, StatBar, FavoriteButton e botão voltar
export default function Details() {
  const { id } = useParams();
  return <h2>Detalhes do Pokémon {id}</h2>;
}