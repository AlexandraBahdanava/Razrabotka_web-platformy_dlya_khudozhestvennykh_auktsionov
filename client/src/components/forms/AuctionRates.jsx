import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { getRateByAuction } from "../../api/rateApi";

const AuctionRates = ({ auctionId, startingPrice, rateStep }) => {
  const [ratesData, setRatesData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getRateByAuction(auctionId);

        if (!response || response.status >= 300) {
          console.error("Ошибка при загрузке ставок:", response?.status);
          return;
        }

        setRatesData(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных ставок:", error);
      }
    };

    loadData();
  }, [auctionId]);

  return (
    <Box>
      {ratesData.length > 0 ? (
        // Отображаем последние 4 ставки
        ratesData
          .slice(-4)
          .map((item, index) => {
            // Рассчитываем сумму ставки
            const betAmount = startingPrice + rateStep * index;

            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={item.Collector.avatar} alt="Avatar" />
                  <Typography
                    variant="body1"
                    sx={{ ml: 2 }}
                  >
                    {item.Collector.login}
                  </Typography>
                </Box>
                <Typography variant="body1">{`$${betAmount}`}</Typography>
              </Box>
            );
          })
      ) : (
        <Typography
          variant="h3"
          height={"69px"}
          display={"flex"}
          alignItems={"center"}
        >
          Ставок нет
        </Typography>
      )}
    </Box>
  );
};

export default AuctionRates;
