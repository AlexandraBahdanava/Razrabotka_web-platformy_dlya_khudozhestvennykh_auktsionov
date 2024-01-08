import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const ActiveAuctionItem = ({ auction }) => {
  return (
    <Paper
      sx={{
        borderRadius: "16px",
        p: 2,
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={auction.image} alt="Auction" style={{ width: "100%", borderRadius: "8px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body1">{auction.artistName}</Typography>
        <Typography variant="body1">{`$${auction.price}`}</Typography>
      </Box>
    </Paper>
  );
};

const ActiveAuctionsForm = () => {
  // Пример данных, загруженных из базы данных (вам нужно будет адаптировать это под ваш проект)
  const activeAuctionsData = [
    { id: 1, image: "path/to/image1.jpg", artistName: "Художник 1", price: 100 },
    { id: 2, image: "path/to/image2.jpg", artistName: "Художник 2", price: 150 },
    { id: 3, image: "path/to/image3.jpg", artistName: "Художник 3", price: 200 },
    { id: 4, image: "path/to/image4.jpg", artistName: "Художник 4", price: 250 },
  ];

  return (
    <Box width="100%">
      <Grid container spacing={2}>
        {activeAuctionsData.map((auction) => (
          <Grid item key={auction.id} xs={12} sm={6} md={3}>
            <ActiveAuctionItem auction={auction} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

