import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Введите ваш запрос..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon icon="iconoir:search" />
          </InputAdornment>
        ),
      }}
      sx={{
        backgroundColor: "#f6f8fa",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          height: "40px", // Уменьшение высоты контейнера
          "& fieldset": { borderColor: "#b3b9c4" },
          "&:hover fieldset": { borderColor: "#007aff" },
          "&.Mui-focused fieldset": { borderColor: "#007aff" },
        },
        "& .MuiInputBase-input": {
          padding: "10px 14px", // Настройка отступов внутри поля
        },
      }}
    />
  );
};

export default SearchBar;
