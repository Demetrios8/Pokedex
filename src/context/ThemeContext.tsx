import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

type Mode = "light" | "dark";

interface ThemeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(
    () => (localStorage.getItem("mode") as Mode) || "light"
  );

  const toggleMode = () =>
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("mode", next);
      return next;
    });

  const theme = useMemo(
  () =>
    createTheme({
      palette: {
        mode,
        primary: { main: "#e3350d" },
        secondary: { main: "#3b4cca" },
        background:
          mode === "light"
            ? { default: "#f5f5f7", paper: "#ffffff" }
            : { default: "#121212", paper: "#1e1e1e" },
      },
      shape: { borderRadius: 12 },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 },
      },
      components: {
        MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
        MuiCard: {
          styleOverrides: {
            root: {
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
            },
          },
        },
      },
    }),
  [mode]
);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeMode deve ser usado dentro de AppThemeProvider");
  return ctx;
}