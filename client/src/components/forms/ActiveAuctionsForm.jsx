import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActiveAuctionsForm = ({ auction }) => {
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
        <img src={auction.photo} alt="Auction" style={{ width: "100%", borderRadius: "8px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body1">{auction.Artist.name}</Typography>
        <Typography variant="body1">{`$${auction.price}`}</Typography>
      </Box>
    </Paper>
  );
};

export default ActiveAuctionsForm;
