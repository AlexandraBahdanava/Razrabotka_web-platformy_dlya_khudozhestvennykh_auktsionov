import { Grid, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import PublicHeader from "../components/headers/PublicHeader";
import ArtistHeader from "../components/headers/ArtistHeader";
import CollectorHeader from "../components/headers/CollectorHeader";
import Footer from "../components/Footer";
import AuctionRegistration from "../components/homePage/AuctionRegistration";
import LoginDialog from "../components/dialogs/LoginDialog";
import RegistrationDialog from "../components/dialogs/RegistrationDialog";
import AllAuctions from "../components/AllAuctions";

const HomePage = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleRoleChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleRoleChange);
    return () => window.removeEventListener("storage", handleRoleChange);
  }, []);

  const renderHeader = () => {
    if (!role) {
      return <PublicHeader />;
    } else if (role === "artist") {
      return <ArtistHeader />;
    } else if (role === "collector") {
      return <CollectorHeader />;
    }
    return <PublicHeader />;
  };

  const renderAuctionRegistration = () => {
    if (!role) {
      return (
        <Grid>
          <AuctionRegistration
            isAuthenticated={isAuthenticated}
            openLogin={openLogin}
            openRegister={openRegister}
          />
          <LoginDialog
            isOpen={isLoginOpen}
            onClose={handleLoginClose}
            onRegisterClick={handleRegisterOpen}
          />
          <RegistrationDialog
            isOpen={isRegisterOpen}
            onClose={handleRegisterClose}
            onLoginClick={handleLoginOpen}
          />
        </Grid>
      );
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const openRegister = () => setRegisterOpen(true);

  const handleLoginOpen = () => {
    setRegisterOpen(false); // Закрываем форму регистрации
    setLoginOpen(true); // Открываем форму входа
  };

  const handleRegisterOpen = () => {
    setLoginOpen(false); // Закрытие формы входа
    setRegisterOpen(true); // Открытие формы регистрации
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  return (
    <>
      <Grid container>
        {renderHeader()}
       
        {renderAuctionRegistration()}
        <AllAuctions />
        <Footer />
      </Grid>
    </>
  );
};

export default HomePage;
