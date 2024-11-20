import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { getAuctions } from "../api/auctionApi";
import { useNavigate } from "react-router-dom";

// Компонент для вычисления и отображения текущей цены
const CurrentPrice = ({ startingPrice, bids }) => {
  const totalPrice = bids.reduce((sum, bid) => sum + bid.amount, startingPrice);
  return <Typography variant="h6">{`$${totalPrice.toFixed(2)}`}</Typography>;
};

// Функция для вычисления оставшегося времени
const calculateRemainingTime = (createdAt, duration) => {
  const createdAtTime = new Date(createdAt).getTime();
  const durationMs = duration * 24 * 60 * 60 * 1000; // Преобразуем дни в миллисекунды
  const currentTime = new Date().getTime();
  const remainingTime = createdAtTime + durationMs - currentTime;

  if (remainingTime > 0) {
    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    return `${String(days).padStart(2, "0")}:${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    return "Expired";
  }
};

const AllAuctions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
          return;
        }
        setAuctionData(response.data || []);
      } catch (error) {
        displayError("Не удалось загрузить данные. Попробуйте позже.");
      }
    };

    loadData();
  }, []);

  const displayError = (message) => {
    setErrorMessage(message);
    setError(true);
  };

  return (
    <>
      {auctionData.length > 0 ? (
        <Grid container spacing={2} justifyContent="flex-start">
          {auctionData.map((auction) => (
            <Grid
              key={auction.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              onClick={() => navigate(`/auction/one/${auction.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <Paper
                sx={{
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  p: 2,
                  width: "260px",
                  height: "350px",
                }}
              >
                {/* Таймер обратного отсчета */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: theme.palette.success.main,
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  <CountdownTimer
                    createdAt={auction.createdAt}
                    duration={auction.duration}
                  />
                </Box>
                <img
                  src={auction.photo}
                  alt="Auction"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                    borderRadius: "8px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {auction.Artist?.name}
                  </Typography>
                  <CurrentPrice
                    startingPrice={auction.starting_price}
                    bids={auction.bids || []}
                  />
                </Box>
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

// Таймер обратного отсчета
const CountdownTimer = ({ createdAt, duration }) => {
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(createdAt, duration)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime(createdAt, duration));
    }, 1000);

    return () => clearInterval(timer);
  }, [createdAt, duration]);

  return <>{remainingTime}</>;
};

export default AllAuctions;
