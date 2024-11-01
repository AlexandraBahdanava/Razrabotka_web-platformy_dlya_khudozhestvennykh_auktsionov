// components/RegistrationDialog.js
import React, { useState } from "react";
import { Dialog, DialogContent, Button, TextField, Typography, IconButton, Grid, Tabs, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

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
            <DialogContent sx={{ padding: "24px", position: "relative", backgroundColor: "#f6f8fa" }}>
                <IconButton onClick={onClose} sx={{ position: "absolute", right: "16px", top: "16px" }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                    Регистрация
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "24px" }}>
                    Уже есть аккаунт?{" "}
                    <Button
                        onClick={onLoginClick} // Переход к форме входа
                        sx={{ color: "#091E42", textTransform: "none", fontWeight: "bold", padding: 0 }}
                    >
                        Войти
                    </Button>
                </Typography>

                <Tabs value={role} onChange={handleRoleChange} centered sx={{ marginBottom: "16px" }}>
                    <Tab value="artist" label="Художник" />
                    <Tab value="collector" label="Коллекционер" />
                </Tabs>

                {/* Форма для Коллекционера и Художника */}
                {role === "collector" ? (
                    <>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Фамилия"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            name="name"
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
                            value={formData.surname}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Страна"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Город"
                            name="city"
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
                            value={formData.bio}
                            onChange={handleInputChange}
                            sx={{ marginBottom: "16px" }}
                        />
                    </>
                )}

                {/* Поля для ввода логина, email и пароля */}
                <TextField fullWidth variant="outlined" label="Логин" name="login" value={formData.login} onChange={handleInputChange} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth variant="outlined" label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth variant="outlined" label="Придумайте пароль" name="password" type="password" value={formData.password} onChange={handleInputChange} sx={{ marginBottom: "16px" }} />

                <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: "#091E42", color: "#fff", marginBottom: "24px" }}>
                    Загрузите аватар
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
