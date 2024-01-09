import React, {useState, useEffect} from "react";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";
import AuctionRates from "./AuctionRates";

const ActiveAuctionsForm = ({ auction }) => {
  
  const [price, setPrice] = useState(auction.starting_price);

  const calculateRemainingTime = () => {
    const createdAt = new Date(auction.createdAt).getTime();
    const duration = auction.duration * 24 * 60 * 60 * 1000; // Преобразуем дни в миллисекунды
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
  }, [auction.createdAt, auction.duration]);


  return (
    <Paper
      sx={{
        borderRadius: "16px",
        p: 0,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        height: "820px",
        width:"450px",
      }}
    >
        <img src={auction.photo} alt="Auction" style={{objectFit: "cover", width: "450px", height: "380px", borderRadius: "8px" }} />
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
        padding: "10px 40px",
      }}
      >
      <Box>
        <AuctionRates auctionId={auction}/>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
       
        <Typography variant="body1">{auction.Artist.name}</Typography>
        <Typography variant="body1">{`$${auction.starting_price}`}</Typography>
      </Box>
      </Box>
      </Grid>
    </Paper>
  );
};

export default ActiveAuctionsForm;
