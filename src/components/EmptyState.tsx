import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h6">{title}</Typography>
      {description && (
        <Typography color="text.secondary">{description}</Typography>
      )}
    </Box>
  );
}