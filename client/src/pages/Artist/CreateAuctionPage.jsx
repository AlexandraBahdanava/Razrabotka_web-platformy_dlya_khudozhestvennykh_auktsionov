import React, { useState } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import ArtistHeader from "../../components/headers/ArtistHeader";
import CreateAuctionForm from "../../components/forms/CreateAuctionForm";
import { createAuction } from "../../api/auctionApi";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const CreateAuctionPage = () => {
    const navigate = useNavigate();
  
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [image, setImage] = useState(null); // Для хранения изображения
  
    const create = async (auctionData) => {
      if (auctionData.bidding_rate === "") {
        auctionData.bidding_rate = null;
      }
  
      // Передаем изображение и данные аукциона в createAuction
      const response = await createAuction(auctionData, image);
  
      if (!response) {
        displayError("Сервис временно недоступен");
        return;
      }
  
      if (response.status === 401) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        window.location.reload();
      }
  
      if (response.status >= 300) {
        displayError("Ошибка при создании аукциона. Код: " + response.status);
        return;
      }
  
      navigate("/");
    };
  
    const displayError = (message) => {
      setErrorMessage(message);
      setError(true);
    };
  
    const closeSnackbar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setError(false);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file); // Сохраняем выбранное изображение
      }
    };
  
    return (
      <Grid
        container
        width={"100%"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        bgcolor={"#E7E7E7"}
      >
        <ArtistHeader />
        <Grid
          container
          item
          flexDirection={"column"}
          alignItems={"center"}
          width={"100%"}
          flexGrow={1}
          bgcolor={"#FFFFFF"}
        >
          {/* Передаем функцию обработчика для изображения */}
          <CreateAuctionForm submitHandler={create} onImageChange={handleImageChange} />
        </Grid>
        <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
          <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Footer />
      </Grid>
    );
  };
  

export default CreateAuctionPage;