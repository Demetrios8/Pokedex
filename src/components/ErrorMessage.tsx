import { Alert, Button } from "@mui/material";

interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <Alert
      severity="error"
      sx={{ my: 2 }}
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Tentar de novo
          </Button>
        )
      }
    >
      {message}
    </Alert>
  );
}