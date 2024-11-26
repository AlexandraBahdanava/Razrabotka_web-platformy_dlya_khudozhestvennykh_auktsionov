import React from "react";
import { Button, Grid } from "@mui/material";
import { createRate } from "../../api/rateApi"; // Предполагается, что этот метод реализован
import { useParams } from "react-router-dom";

const BidButton = ({ auctionId, fixedBidAmount,  onBidSuccess, onBidError }) => {
  const { id } = useParams();

  const handleBid = async () => {
    try {
      // Формируем данные для отправки
      const bidData = {
        auctionId, // ID текущего аукциона
        id, // ID коллекционера
        bidAmount: fixedBidAmount, // Фиксированная ставка
      };

      // Вызываем API для добавления ставки
      await createRate(bidData);

      // Уведомляем об успехе
      if (onBidSuccess) onBidSuccess();
      alert("Ставка успешно добавлена!");
    } catch (error) {
      console.error("Ошибка при добавлении ставки:", error);
      if (onBidError) onBidError(error);
      alert("Ошибка при добавлении ставки.");
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
        Сделать ставку
      </Button>
    </Grid>
  );
};

export default BidButton;
