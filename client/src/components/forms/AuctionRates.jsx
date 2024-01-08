import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getRateByAuction } from "../../api/rateApi";
import { useParams } from "react-router-dom";

const AuctionRates = (auction) => {
    const theme = useTheme();
    const [readonly, setReadonly] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [ratesData, setRatesData] = useState([]);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

const prise =
    useEffect(() => {
        const loadData = async () => {
            const response =  await getRateByAuction(auction.auctionId.id)

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
                displayError("Ошибка при загрузке профиля. Код: " + response.status);
                console.log(response);
                return;
            }

            setRatesData(response.data);
        };

        loadData();
    }, []);

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
        <>
        {ratesData.length > 0 ? (
    <>
        <Grid
            container
            item
            maxWidth={"700px"}
            width={"450px"}
            height={"820px"}
            flexDirection={"column"}
            gap={"25px"}
        >
             {ratesData.map((item) => (

                                     <Typography>
                                     {auction.auctionId.starting_price+item.bet_size}
                                     </Typography>

                                    ))}
        </Grid>
    </>
) : (
    <Typography
        variant="h3"
        height={"69px"}
        display={"flex"}
        alignItems={"center"}
    >
        Ставок нет
    </Typography>
)}

        </>
      );
      
};

export default AuctionRates;