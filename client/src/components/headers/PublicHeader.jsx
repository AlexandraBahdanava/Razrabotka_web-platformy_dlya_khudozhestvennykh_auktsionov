// components/PublicHeader.js
import React, { useState } from "react";
import { IconButton, Grid, Stack, Typography, useMediaQuery, Divider, Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import Logo from "./Logo.png";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import LoginDialog from "../dialogs/LoginDialog"; // Убедитесь, что путь правильный
import RegistrationDialog from "../dialogs/RegistrationDialog"; // Добавляем импорт для формы регистрации

const PublicHeader = () => {
    
    const theme = useTheme();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const handleLoginOpen = () => {
        setIsRegisterOpen(false); // Закрываем форму регистрации
        setIsLoginOpen(true); // Открываем форму входа
    };

    const handleRegisterOpen = () => {
        setIsLoginOpen(false); // Закрытие формы входа
        setIsRegisterOpen(true); // Открытие формы регистрации
    };

    const handleLoginClose = () => {
        setIsLoginOpen(false);
    };

    const handleRegisterClose = () => {
        setIsRegisterOpen(false);
    };


    return (
        <Grid 
        width={"100%"}
        paddingLeft={"0"}>
        <Grid
            container
            width={"100%"}
            height={"78px"}
            bgcolor={theme.palette.primary.main}
            pl={"50px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingBottom={"0"}
            paddingLeft={"50px"}
            paddingRight={"50px"}
        >
           {/* Логотип слева */}
           <Grid item>
                    <img src={Logo} alt="Logo" width="100px" />
                </Grid>

                {/* Блок с кнопками справа */}
                <Grid item width="50%" display="flex" justifyContent="flex-end">
                    <Stack
                        direction="row"
                        spacing={isSmallScreen ? 2 : 4}
                        alignItems="center"
                    >
           {isSmallScreen ? (
    <IconButton>
        <Grid container item height={"100%"} alignItems={"center"} marginRight={"50px"}>
            <Link to={"/home"} style={{ textDecoration: "none", color: "#000000", display: "flex", alignItems: "center" }}>
                <Icon icon="maki:home" color="#b3b9c4" width="24" height="24" />
            </Link>
        </Grid>
    </IconButton>
) : (
    <Typography textAlign={"top"}>
        <Grid container item height={"100%"} alignItems={"center"} marginRight={"100px"}>
            <Link to={"/home"} style={{ textDecoration: "none", color: "#000000", fontSize: "20px", display: "flex", alignItems: "center" }}>
                <Icon icon="maki:home" color="#b3b9c4" width="24" height="24" />
                <span style={{ marginLeft: "8px" }}>Главная</span> {/* Отступ для текста */}
            </Link>
        </Grid>
    </Typography>
)}
                <IconButton
                onClick={handleLoginOpen}  // открытие формы входа
                style={{ padding: 0, color: "#000000" }}
                >
                    {isSmallScreen ? (
                    <Icon icon="maki:entrance-alt1" color="#b3b9c4" width="24" height="24" />
                    ) : (
                    <Typography style={{ textDecoration: "none", color: "#000000", fontSize:"20px", display: "flex", alignItems: "center"}} textAlign="center">
                    <Icon icon="maki:entrance-alt1" color="#b3b9c4" width="24" height="24" />
                    <span style={{ marginLeft: "8px" }}>Войти</span> {/* Отступ для текста */}
                    </Typography>
                    )}
                </IconButton>
            </Stack>
</Grid>
       
        </Grid>
         
          {/* Вызов компонентов форм */}
          <LoginDialog isOpen={isLoginOpen} onClose={handleLoginClose} onRegisterClick={handleRegisterOpen} />
            <RegistrationDialog isOpen={isRegisterOpen} onClose={handleRegisterClose} onLoginClick={handleLoginOpen} />
       
        </Grid>
    );

};

export default PublicHeader;
