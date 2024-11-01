// components/RegistrationDialog.js
import React, { useState } from "react";
import { Dialog, DialogContent, Button, TextField, Typography, IconButton, Grid, Tabs, Tab, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

import InfoIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

const RegistrationDialog = ({ isOpen, onClose, onLoginClick }) => {
    const [role, setRole] = useState("collector");
    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        avatar: null,
        country: "",
        city: "",
        bio: "",
        login: "",
        email: "",
        password: "",
    });

    const handleRoleChange = (event, newRole) => {
        setRole(newRole);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = () => {
        // Логика отправки формы
        console.log(formData);
    };

    const handleCancel = () => {
        // Очищаем поля формы
        setFormData({ surname: "",name: "",avatar: null,country: "",city: "",bio: "",login: "",email: "",password: "", });
    };

    return (
          <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent 
                sx={{ 
                    padding: "24px",
        position: "relative",
        backgroundColor: "#f6f8fa",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },      
                }}
            >
                <IconButton onClick={onClose} sx={{ position: "absolute", right: "16px", top: "16px" }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                    Регистрация
                </Typography>
                <Typography variant="body2">
                    Уже есть аккаунт?{" "}
                    <Button
                        onClick={onLoginClick}
                        sx={{ color: "#091E42", textTransform: "none", fontWeight: "bold", padding: 0 }}
                    >
                        Войти
                    </Button>
                </Typography>               

                <Tabs value={role} onChange={handleRoleChange} centered>
                    <Tab value="artist" label="Художник" />
                    <Tab value="collector" label="Коллекционер" />
                </Tabs>
                <Divider sx={{ width: '100%', backgroundColor: '#b3b9c4', paddingBottom: '0px',  marginBottom: "16px" }} />
                {/* Форма для Коллекционера и Художника */}
                {role === "collector" ? (
                    <>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Фамилия"
                            name="surname"
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Введите свою фамилию."
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
                            value={formData.surname}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            name="name"
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Введите свое имя."
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
                            value={formData.name}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                    </>
                ) : (
                    <>
                    <TextField
                            fullWidth
                            variant="outlined"
                            label="Фамилия"
                            name="surname"
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Введите свою фамилию."
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
                            value={formData.surname}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            name="name"
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Введите свое имя."
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
                            value={formData.name}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Страна"
                            name="country"
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Введите страну, где вы проживаете."
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
                            value={formData.country}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Город"
                            name="city"
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Введите город, в котором вы проживаете."
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
                            value={formData.city}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Расскажите о себе"
                            name="bio"
                            multiline
                            rows={3}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="Напишите пару предложений о себе для зрителей."
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
                            value={formData.bio}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                    </>
                )}

                {/* Поля для ввода логина, email и пароля */}
                <TextField fullWidth variant="outlined" label="Логин" name="login" 
                InputProps={{
                    endAdornment: (
                        <Tooltip title="Придумайте уникальный логин. Логин должен состоять не более чем из 20 символов, а также содержать только цифры от 0 до 9 и латинские буквы."
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
                value={formData.login} onChange={handleInputChange} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth variant="outlined" label="Email" name="email" type="email"
                InputProps={{
                    endAdornment: (
                        <Tooltip title="Введите свой адрес электронной почты (он должен использоваться на платформе впервые)."
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
                 value={formData.email} onChange={handleInputChange} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth variant="outlined" label="Придумайте пароль" name="password" type="password"
                InputProps={{
                    endAdornment: (
                        <Tooltip title="Придумайте уникальный пароль. Пароль должен состоять не более чем из 20 символов, а также содержать цифры от 0 до 9 и латинские буквы. Запомните свой пароль!"
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
                 value={formData.password} onChange={handleInputChange} sx={{  }} />
<Typography variant="body2" sx={{ marginBottom: "24px", fontSize:"12px",marginLeft:"10px", marginTop:"10px", color: "#42526D" }}>
                    Поля, помеченные "*" обязательны для заполнения
                </Typography>
                <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: "#091E42", color: "#fff", marginBottom: "24px" }}>
                    Загрузить аватар
                    <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                </Button>
                
                <Grid container justifyContent="space-between">
                    <Button variant="outlined" onClick={handleCancel} sx={{ borderColor: "#dcdcdc", color: "#333" }}>
                        Отмена
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ color: "#fff", backgroundColor: "#091E42" }}>
                        Создать
                    </Button>
                </Grid>
                
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationDialog;
