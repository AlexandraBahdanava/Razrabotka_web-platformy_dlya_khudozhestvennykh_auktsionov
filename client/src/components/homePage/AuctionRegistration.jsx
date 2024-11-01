import React from "react";
import { Box, Button, Typography } from "@mui/material";

const AuctionContainer = ({ onRegisterClick, isAuthenticated }) => {
    if (isAuthenticated) {
        return null; // Не отображаем контейнер, если пользователь авторизован
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                backgroundColor: "#f6f8fa",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                marginBottom: "24px"
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    То что надо!
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "8px" }}>
                    Покупай картины на сотнях онлайн-аукционов по всему миру в пару кликов. Быстрые и выгодные сделки для обеих сторон.
                </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "16px" }}>
                <Button
                    variant="contained"
                    onClick={onRegisterClick}
                    sx={{
                        backgroundColor: "#007aff",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#0056b3",
                        },
                    }}
                >
                    Создать аукцион
                </Button>
                <Button
                    variant="outlined"
                    onClick={onRegisterClick}
                    sx={{
                        borderColor: "#ff4081",
                        color: "#ff4081",
                        "&:hover": {
                            borderColor: "#ff1a4d",
                            backgroundColor: "#ffe5e9",
                        },
                    }}
                >
                    Зарегистрироваться
                </Button>
            </Box>
        </Box>
    );
};

export default AuctionContainer;
