import { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
}

export default function SearchBar({
                                    value,
                                    onSearch,
                                    debounceMs = 400,
                                    placeholder = "Buscar por nome ou número",
                                  }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const trimmed = inputValue.trim();
    if (trimmed === value.trim()) {
      return;
    }

    const timer = window.setTimeout(() => {
      onSearch(inputValue);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [inputValue, value, onSearch, debounceMs]);

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
      <TextField
          fullWidth
          label="Buscar por nome ou número"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch(inputValue);
            }
          }}
          slotProps={{
            input: {
              startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
              ),
              endAdornment: inputValue ? (
                  <InputAdornment position="end">
                    <IconButton
                        aria-label="Limpar busca"
                        edge="end"
                        size="small"
                        onClick={handleClear}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
              ) : null,
            },
          }}
      />
  );
}
            },
          }}
      />
  );
}
