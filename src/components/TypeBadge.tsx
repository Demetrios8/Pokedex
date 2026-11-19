import { Chip } from "@mui/material";

interface Props {
  type: string;
}

// TODO (Integrante 5): cor própria para cada tipo (fogo, água, grama...)
export default function TypeBadge({ type }: Props) {
  return <Chip label={type} size="small" sx={{ textTransform: "capitalize" }} />;
}