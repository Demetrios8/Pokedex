import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const { mode, toggleMode } = useThemeMode();
  const { favorites } = useFavorites();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pokédex
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/favoritos">
          Favoritos ({favorites.length})
        </Button>
        <IconButton color="inherit" onClick={toggleMode} aria-label="Alternar tema">
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}