import { Grid } from "@mui/material";
import React, { useState } from "react";
import PublicHeader from "../components/headers/PublicHeader";
import Footer from "../components/Footer";
import AuctionRegistration from "../components/homePage/AuctionRegistration"; // Импортируем компонент

const HomePage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации

    const [isArtistDialogOpen, setArtistDialogOpen] = useState(false);
    const [isCollectorDialogOpen, setCollectorDialogOpen] = useState(false);

    const openArtistRegistration = () => {
        setArtistDialogOpen(true);
    };

    const openCollectorRegistration = () => {
        setCollectorDialogOpen(true);
    };

    const closeArtistDialog = () => {
        setArtistDialogOpen(false);
    };

    const closeCollectorDialog = () => {
        setCollectorDialogOpen(false);
    };

    // Обработчик нажатия на кнопку "Зарегистрироваться"
    const handleRegisterClick = () => {
        // Здесь можно добавить логику открытия формы регистрации
        openCollectorRegistration(); // Например, открываем форму регистрации коллекционера
    };

    // Проверка состояния авторизации (можно заменить на реальную логику проверки)
    const isUserAuthenticated = isAuthenticated; // Или используйте вашу логику аутентификации

    console.log("HomePage rendered", isUserAuthenticated); // Вывод состояния авторизации

    return (
        <>
            <Grid container style={{ width: "100%", height: "100%" }}>
                <PublicHeader />
                <AuctionRegistration onRegisterClick={handleRegisterClick} isAuthenticated={isUserAuthenticated} />
                <Footer />
            </Grid>
        </>
    );
};

export default HomePage;
