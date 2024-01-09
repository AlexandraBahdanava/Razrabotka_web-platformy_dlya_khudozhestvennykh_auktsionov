import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { createRate } from "../../api/rateApi";
import { useParams } from "react-router-dom";

const BidButton = ({ auctionId, onBidSuccess, onBidError }) => {
  const [bidAmount, setBidAmount] = useState("");
const {id}=useParams();
  const handleBid = async () => {
    try {
      const response = await createRate(auctionId, parseFloat(bidAmount), id);

      if (response.status === 200) {
        // Обновление данных или выполнение других действий при успешной ставке
        onBidSuccess();
      } else {
        // Обработка ошибок при неудачной ставке
        onBidError(response.data.message);
      }
    } catch (error) {
      console.error("Error making bid:", error);
      onBidError("Internal Server Error");
    }
  };

  return (
    <Grid
    bgcolor={"#091E42"}
    color={"#FFFFFF"}
    borderRadius={"20px"}
    margin={"30px"}
    alignContent={"center"}
    textAlign={"center"}
    width={"100%"}
    padding={"20px"}
    >
        <Button
        variant="2"
        onClick={handleBid}
        style={{ borderRadius: "16px", color: "white" }}
        
      >
        Сделать ставку
      </Button>
    </Grid>
  );
};

export default BidButton;
