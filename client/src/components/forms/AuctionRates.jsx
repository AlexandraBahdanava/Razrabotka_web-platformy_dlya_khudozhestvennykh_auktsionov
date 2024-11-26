import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getRateByAuction } from "../../api/rateApi";

const AuctionRates = (auction) => {
    const theme = useTheme();
    const [readonly, setReadonly] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [ratesData, setRatesData] = useState([]);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        
        <Box>
      {ratesData.length > 0 ? (
        ratesData.map((item) => (
            <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box
             sx={{display: "flex",
            justifyContent: "space-between",
            alignItems: "left",
        }}
            >
            <Avatar></Avatar>
              <Typography variant="body1">{item.Collector.email}</Typography>
              </Box>
            <Typography variant="body1">{`$${item.bet_size}`}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="h3" height={"69px"} display={"flex"} alignItems={"center"}>
          Ставок нет
        </Typography>
      )}
    </Box>

      );
      
};

export default AuctionRates;