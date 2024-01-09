import React, {useState, useEffect} from "react";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";
import AuctionRates from "./AuctionRates";

const ActiveAuctionsCollectorForm = ({ auction }) => {

  const calculateRemainingTime = () => {
    const createdAt = new Date(auction.Auction.createdAt).getTime();
    const duration = auction.Auction.duration * 24 * 60 * 60 * 1000; // Преобразуем дни в миллисекунды
    const currentTime = new Date().getTime();
    const remainingTime = createdAt + duration - currentTime;

    if (remainingTime > 0) {
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      return `${days}:${hours}:${minutes}:${seconds}`;
    } else {
      return "Expired";
    }
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.Auction.createdAt, auction.Auction.duration]);

  return (

    <Paper
      sx={{
        borderRadius: "16px",
        p: 0,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        width:"450px",
        marginBottom:"40px",
      }}
    >
        <img src={auction.Auction.photo} alt="Auction" style={{objectFit: "cover", width: "450px", height: "380px", borderRadius: "8px" }} />
        <Box mt={2}
        marginBottom={"15px"}
        >
        <Typography 
        fontSize={"40px"}
        textAlign= {"center"}
        >{remainingTime}
        </Typography>
      </Box>
      <Divider sx={{ width: '100%', backgroundColor: '#b3b9c4', paddingBottom: '0px', marginBottom:'0px'}} />
      <Grid>
     
      <Box
       sx={{
        height:'25px',
        padding: '10px 0'
      }}>
       
      <Typography variant="h1" textAlign={"center"}> Начальная цена:  {`$${auction.Auction.starting_price}`}</Typography>
      </Box>
      <Divider sx={{ width: '100%', backgroundColor: '#b3b9c4', paddingBottom: '0px', marginBottom:'0px'}} />
      <>
      {auction.Auction.bidding == 0 ? (
        <>
        <Box padding={"10px"}>
        <Typography fontSize={"14px"} color={"#1D2939"} fontWeight={"bold"} textAlign={"center"}>Возможность биддинга включена: </Typography>
      <Typography variant="h1" textAlign={"center"}> Нажмите “Купить сейчас”, чтобы стать владельцем этого предмета немедленно</Typography>
      </Box>
      <Divider sx={{ width: '100%', backgroundColor: '#b3b9c4', paddingBottom: '0px', marginBottom:'0px'}} />
      </>
      ) : (
       <></>
      )}
      </>
      <>
      {auction.Auction.auto_renewal == 0 ? (
        <>
        <Box padding={"10px"}>
        <Typography fontSize={"14px"} color={"#1D2939"} fontWeight={"bold"} textAlign={"center"}>Автопродление аукциона включено: </Typography>
      <Typography variant="h1" textAlign={"center"}> Ставки за последние 10 минут продлевают аукцион.</Typography>
      </Box>
      <Divider sx={{ width: '100%', backgroundColor: '#b3b9c4', paddingBottom: '0px', marginBottom:'0px'}} />
      </>
      ) : (
       <></>
      )}
      </>
      </Grid>
    </Paper>
  );
};

export default ActiveAuctionsCollectorForm;
