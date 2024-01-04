import React, { useState } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import ArtistHeader from "../../components/headers/ArtistHeader";
import CreateAuctionForm from "../../components/forms/CreateAuctionForm";
import { create } from "../../api/auctionApi";
import { useNavigate } from "react-router-dom";

const CreateAuctionPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const created = async (auctionData) => {
        const response = await create(auctionData);

        if (!response) {
            displayError("Сервис временно недоступен");
            return;
        }

        if (response.status >= 300) {
            displayError("Ошибка при создании пользователя. Код: " + response.status);
            console.log(response)
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

          <CreateAuctionForm submitHandler={created} />

            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default CreateAuctionPage;