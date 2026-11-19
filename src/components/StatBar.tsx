import { Box, LinearProgress, Typography } from "@mui/material";

interface Props {
  name: string;
  value: number;
}

// TODO (Integrante 5): cor por faixa de valor, nomes dos atributos em português
export default function StatBar({ name, value }: Props) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
        {name}: {value}
      </Typography>
      <LinearProgress variant="determinate" value={Math.min((value / 255) * 100, 100)} />
    </Box>
  );
}