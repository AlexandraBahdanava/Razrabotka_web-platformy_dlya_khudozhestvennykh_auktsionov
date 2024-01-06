import React, { useState } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import ArtistHeader from "../../components/headers/ArtistHeader";
import CreateAuctionForm from "../../components/forms/CreateAuctionForm";
import { createAuction } from "../../api/auctionApi";
import { useNavigate } from "react-router-dom";

const CreateAuctionPage = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const create = async (auctionData) => {

        if (auctionData.bidding_rate === "") {
            auctionData.bidding_rate = null;
        }
        const response = await createAuction(auctionData);

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
                maxWidth={"1300px"}
                flexGrow={1}
                bgcolor={"#FFFFFF"}
            >
                <CreateAuctionForm submitHandler={create} />
            </Grid>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default CreateAuctionPage;