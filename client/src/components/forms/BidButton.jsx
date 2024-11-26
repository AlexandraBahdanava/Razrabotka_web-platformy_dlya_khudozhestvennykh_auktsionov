import React from "react";
import { Button, Grid } from "@mui/material";
import { createRate } from "../../api/rateApi"; // Предполагается, что этот метод реализован
import { useParams } from "react-router-dom";

const BidButton = ({ auctionId, collectorId, betSize, onBidSuccess, onBidError }) => {
  const handleBid = async () => {
    try {
      const rateData = {
        bet_size: betSize, // Размер ставки
        collectorId,       // ID коллекционера
        auctionId,         // ID аукциона
      };
      console.log({ auctionId, collectorId, betSize });

      const response = await createRate(rateData); // Вызов API для создания ставки
      onBidSuccess(response); // Обработчик успешного выполнения
    } catch (error) {
      onBidError(error); // Обработчик ошибок
    }
  };

  return (
    <Grid
      margin={"30px"}
      width={"100%"}
      borderRadius={"34px"}
      alignContent={"center"}
      textAlign={"center"}
      bgcolor={"#091E42"}
    >
      <Button
        variant="2"
        onClick={handleBid}
        style={{
          color: "#FFFFFF",
          width: "100% ",
          padding: "20px",
        }}
      >
        Сделать ставку ({betSize}$)
      </Button>
    </Grid>
  );
};

export default BidButton;
