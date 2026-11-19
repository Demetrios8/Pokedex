import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

// TODO (Integrante 2): melhorar o visual (tipos com TypeBadge, botão de favorito, hover)
export default function PokemonCard({ pokemon }: Props) {
  const image =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default ??
    "";

  return (
    <Card>
      <CardActionArea component={Link} to={`/pokemon/${pokemon.id}`}>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={pokemon.name}
          sx={{ objectFit: "contain", p: 1 }}
        />
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            #{pokemon.id}
          </Typography>
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
            {pokemon.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}