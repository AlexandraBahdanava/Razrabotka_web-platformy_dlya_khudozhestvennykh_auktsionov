import { Grid, Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import PublicHeader from "../components/headers/PublicHeader";
import ArtistInfoForm from "../components/forms/ArtistInfoForm";
import AuthDataForm from "../components/forms/AuthDataForm";
import CollectorInfoForm from "../components/forms//CollectorInfoForm";

const RegistrationPage = () => {
    const [authData, setAuthData] = useState({
        email: "",
        password: "",
    });
    const [isCollector, setIsCollector] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [step, setStep] = useState(1);

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
    const nextStep = (authData, isCollector) => {
        setAuthData({ email: authData.email, password: authData.password });
        setIsCollector(isCollector);

        setStep(2);
    };

    return (
        <Grid container width={"100%"} height={"100%"}>
            <PublicHeader />
            <Grid container flexDirection={"column"} alignItems={"center"}>
                {step === 1 && <AuthDataForm nextStepHandler={nextStep} errorHandler={displayError} />}
                {step === 2 && !isCollector && <ArtistInfoForm authData={authData} errorHandler={displayError}/>}
                {step === 2 && isCollector && <CollectorInfoForm authData={authData} errorHandler={displayError}/>}
            </Grid>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default RegistrationPage;