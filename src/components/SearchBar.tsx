import { TextField } from "@mui/material";

interface Props {
  value: string;
  onSearch: (value: string) => void;
}

// TODO (Integrante 3): adicionar debounce, botão de limpar e ícone de busca
export default function SearchBar({ value, onSearch }: Props) {
  return (
    <TextField
      fullWidth
      label="Buscar por nome ou número"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}