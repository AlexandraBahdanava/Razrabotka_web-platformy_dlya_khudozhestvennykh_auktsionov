import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getAuctions } from "../api/auctionApi";
import { Link } from "react-router-dom";

const AllAuctions = () => {
  const theme = useTheme();

  const [auctionData, setAuctionData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getAuctions();

        if (!response || response.status >= 300) {
          const errorMessage = response
            ? `Ошибка при загрузке данных. Код: ${response.status}`
            : "Сервис временно недоступен";
          displayError(errorMessage);
          console.error(response || "Нет ответа от сервера");
          return;
        }

        setAuctionData(response.data || []); // Защита на случай, если `data` будет `undefined`
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        displayError("Не удалось загрузить данные. Попробуйте позже.");
      }
    };

    loadData();
  }, []);

  const displayError = (message) => {
    setErrorMessage(message);
    setError(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setError(false);
  };

  return (
    <>
      {auctionData.length > 0 ? (
        <Grid
          container
          item
          spacing={2}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          flexWrap="wrap"
          gap={2}
        >
          {auctionData.map((auction) => (
            <Grid
              key={auction.id}
              item
              xs={1.6}
              md={2}
              lg={1.4}
              margin="0 40px"
            >
              <Paper
                sx={{
                  borderRadius: "16px",
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: "260px",
                  marginBottom: "220px",
                }}
              >
                <Link
                  to={`/auction/one/${auction.id}`}
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  <img
                    src={auction.photo}
                    alt="Auction"
                    style={{
                      objectFit: "cover",
                      width: "260px",
                      height: "220px",
                      borderRadius: "8px",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                      padding: "0 20px 10px 20px",
                    }}
                  >
                    <Typography variant="h1">{auction.Artist?.name}</Typography>
                    <Typography variant="h1">
                      {`$${auction.starting_price}`}
                    </Typography>
                  </Box>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h3"
          height="69px"
          display="flex"
          alignItems="center"
        >
          Нет аукционов
        </Typography>
      )}
    </>
  );
};

export default AllAuctions;
