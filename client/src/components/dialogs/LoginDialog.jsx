// components/LoginDialog.js
import React, { useState } from "react";
import { Dialog, DialogContent, Button, TextField, Typography, IconButton, Grid, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { login } from "../../api/authApi";
import Tooltip from "@mui/material/Tooltip";

const LoginDialog = ({ isOpen, onClose, onRegisterClick }) => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") return;
        setError(false);
    };
    const submit = async () => {
        const response = await login(loginData);
        if (!response) {
            setErrorMessage("Сервис временно недоступен");
            setError(true);
            return;
        }
        if (response.status >= 300) {
            setErrorMessage(response.status === 500 ? "Повторите попытку позже" : "Неверные данные аккаунта");
            setError(true);
            return;
        }

        localStorage.setItem("role", response.data.role);
        localStorage.setItem("jwt", response.data.token);
        onClose();
        window.location.reload();
    };
    
    const handleCancel = () => {
        // Очищаем поля формы
        setLoginData({ email: "", password: "" });
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ padding: "24px", position: "relative", backgroundColor: "#f6f8fa" }}>
                <IconButton onClick={onClose} sx={{ position: "absolute", right: "16px", top: "16px" }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                    Вход
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "24px" }}>
                    Еще нет аккаунта?{" "}
                    <Button
                        onClick={onRegisterClick} // Используем переданную функцию для открытия формы регистрации
                        sx={{ color: "#091E42", textTransform: "none", fontWeight: "bold", padding: 0 }}
                    >
                        Зарегистрироваться
                    </Button>
                </Typography>
                <TextField
                id="email"
                name="email"
                    fullWidth
                    variant="outlined"
                    label="Введите email"
                    type="email"
                    InputProps={{
                        endAdornment: (
                            <Tooltip title="Введите электронную почту, привязанную к вашему аккаунту."
                            PopperProps={{
                                modifiers: [
                                    {
                                        name: "offset",
                                        options: {
                                            offset: [0, 8], // Смещение подсказки, если нужно
                                        },
                                    },
                                ],
                            }}
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        backgroundColor: "#ffffff", // Белый фон
                                        color: "#42526D",           // Цвет текста
                                        padding: "10px",            // Внутренние отступы
                                        fontSize: "0.875rem",       // Размер шрифта
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Тень
                                    },
                                },
                            }}
                        >
                            <InfoIcon sx={{ color: "#b3b9c4" }} />
                            </Tooltip>
                        ),
                    }}
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              <TextField
    fullWidth
    variant="outlined"
    label="Введите пароль"
    type="password"
    InputProps={{
        endAdornment: (
            <Tooltip title="Введите пароль от вашего аккаунта."PopperProps={{
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, 8], // Смещение подсказки, если нужно
                        },
                    },
                ],
            }}
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: "#ffffff", // Белый фон
                        color: "#42526D",           // Цвет текста
                        padding: "10px",            // Внутренние отступы
                        fontSize: "0.875rem",       // Размер шрифта
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Тень
                    },
                },
            }}
        >
            <InfoIcon sx={{ color: "#b3b9c4" }} />
            </Tooltip>
        ),
    }}
    value={loginData.password}
    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
    sx={{
        marginBottom: "24px",
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#b3b9c4" },
            "&:hover fieldset": { borderColor: "#007aff" },
            "&.Mui-focused fieldset": { borderColor: "#b3b9c4" },
            "&.Mui-focused": {
                backgroundColor: "transparent",
            },
        },
    }}
/>
                <Grid container justifyContent="space-between">
                    <Button variant="outlined"  onClick={handleCancel} sx={{ borderColor: "#dcdcdc", color: "#333", "&:hover": { borderColor: "#007aff", backgroundColor: "#f6f8fa" } }}>
                        Отмена
                    </Button>
                    <Button variant="contained" color="primary" onClick={submit} sx={{ color: "#fff", backgroundColor: "#091E42"}}>
                        Войти
                    </Button>
                </Grid>
            </DialogContent>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default LoginDialog;
