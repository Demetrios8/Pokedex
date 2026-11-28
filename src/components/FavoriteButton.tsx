import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useFavorites } from "../context/FavoritesContext";

interface Props {
  id: number;
}

// TODO (Integrante 6): se for usado dentro do card clicável, evitar navegar ao favoritar
export default function FavoriteButton({ id }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  return (
    <IconButton
      color={active ? "error" : "default"}
      onClick={(event) => {
        // Evita que o clique no coração acione também um link/card ancestral.
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(id);
      }}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      aria-pressed={active}
    >
      {active ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
