import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";
import AuctionRates from "./AuctionRates";
import { useNavigate } from "react-router-dom";

const ActiveAuctionsForm = ({ auction }) => {
  const calculateRemainingTime = () => {
    const createdAt = new Date(auction.createdAt).getTime();
    const duration = auction.duration * 24 * 60 * 60 * 1000; // Преобразуем дни в миллисекунды
    const currentTime = new Date().getTime();
    const remainingTime = createdAt + duration - currentTime;

    if (remainingTime > 0) {
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const minutes = Math.floor(
        (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      return `${days}:${hours}:${minutes}:${seconds}`;
    } else {
      return "Expired";
    }
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.createdAt, auction.duration]);

  const baseURL = "http://localhost:3000"; // URL сервера
  const fullImageUrl = `${baseURL}${auction.photo}`;
  
  return (
    <Paper
      sx={{
        borderRadius: "16px",
        p: 0,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        width: "450px",
        marginBottom: "40px",
      }}
      onClick={() => navigate(`/auction/one/${auction.id}`)}
    >
      <img
        src={fullImageUrl}
        alt="Auction"
        style={{
          objectFit: "cover",
          width: "450px",
          height: "380px",
          borderRadius: "8px",
        }}
      />
      <Box mt={2} marginBottom={"15px"}>
        <Typography fontSize={"40px"} textAlign={"center"}>
          {remainingTime}
        </Typography>
      </Box>
      <Divider
        sx={{
          width: "100%",
          backgroundColor: "#b3b9c4",
          paddingBottom: "0px",
          marginBottom: "0px",
        }}
      />
      <Grid>
        <Box
          sx={{
            padding: "10px 30px",
            height: "250px",
          }}
        >
          <Box
            sx={{
              height: "220px",
            }}
          >
            <AuctionRates auctionId={auction.id} />
          </Box>
          <Typography variant="h1" textAlign={"center"}>
            {" "}
            Начальная цена: {`$${auction.starting_price}`}
          </Typography>
        </Box>

        <>
          {auction.bidding == 1 ? (
            <>
              <Divider
                sx={{
                  width: "100%",
                  backgroundColor: "#b3b9c4",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                }}
              />
              <Box padding={"10px"}>
                <Typography
                  fontSize={"14px"}
                  color={"#1D2939"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Возможность биддинга включена:{" "}
                </Typography>
                <Typography variant="h1" textAlign={"center"}>
                  {" "}
                  Нажмите “Купить сейчас”, чтобы стать владельцем этого предмета
                  немедленно
                </Typography>
              </Box>
            </>
          ) : (
            <></>
          )}
        </>
        <>
          {auction.auto_renewal == 1 ? (
            <>
              <Divider
                sx={{
                  width: "100%",
                  backgroundColor: "#b3b9c4",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                }}
              />
              <Box padding={"10px"}>
                <Typography
                  fontSize={"14px"}
                  color={"#1D2939"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Автопродление аукциона включено:{" "}
                </Typography>
                <Typography variant="h1" textAlign={"center"}>
                  {" "}
                  Ставки за последние 10 минут продлевают аукцион.
                </Typography>
              </Box>
            </>
          ) : (
            <></>
          )}
        </>
      </Grid>
    </Paper>
  );
};

export default ActiveAuctionsForm;
