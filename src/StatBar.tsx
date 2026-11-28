
import { Box, LinearProgress, Typography } from "@mui/material";

interface Props {
  name: string;
  value: number;
}

export default function StatBar({ name, value }: Props) {
  const percentage = Math.min(
    Math.max((value / 255) * 100, 0),
    100
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography
          variant="body2"
          sx={{ textTransform: "capitalize", fontWeight: 600 }}
        >
          {name}
        </Typography>

        <Typography variant="body2" fontWeight="bold">
          {value}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 9,
          borderRadius: 5,
          backgroundColor: "action.hover",
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundColor:
              value >= 100
                ? "#4caf50"
                : value >= 60
                ? "#2196f3"
                : "#ff9800",
          },
        }}
      />
    </Box>
  );
}
