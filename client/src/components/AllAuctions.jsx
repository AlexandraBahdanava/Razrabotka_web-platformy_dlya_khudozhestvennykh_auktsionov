import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Pagination,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getAuctions } from "../api/auctionApi";
import { useNavigate } from "react-router-dom";

const displayError = (message) => {
  console.error(message); // Можно заменить на всплывающее сообщение или другой метод
  alert(message); // Отобразит всплывающее сообщение
};

// Компонент для вычисления и отображения текущей цены
const CurrentPrice = ({ startingPrice, bids }) => {
  const totalPrice = bids.reduce((sum, bid) => sum + bid.amount, startingPrice);
  return (
    <Typography sx={{ fontSize: "16px" }}>{`$${totalPrice.toFixed(
      2
    )}`}</Typography>
  );
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

const AllAuctions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [auctionData, setAuctionData] = useState([]);
  const [displayedAuctions, setDisplayedAuctions] = useState([]); // Аукционы для текущего отображения
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [lastLoadedPage, setLastLoadedPage] = useState(1); // Последняя загруженная страница
  const auctionsPerPage = 30;

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
        setDisplayedAuctions(response.data.slice(0, auctionsPerPage));
      } catch (error) {
        console.error("Не удалось загрузить данные. Попробуйте позже.");
      }
    };

    loadData();
  }, []);

  // Обработчик смены страницы
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setDisplayedAuctions(
      auctionData.slice((page - 1) * auctionsPerPage, page * auctionsPerPage)
    );
    setLastLoadedPage(page);
  };

  // Обработчик кнопки "Загрузить еще"
  const handleLoadMore = () => {
    const nextPage = lastLoadedPage + 1;
    const nextAuctions = auctionData.slice(0, nextPage * auctionsPerPage);
    setDisplayedAuctions(nextAuctions);
    setLastLoadedPage(nextPage);
  };

  const totalPages = Math.ceil(auctionData.length / auctionsPerPage);

  const baseURL = "http://localhost:3000"; // URL сервера

  return (
    <Box sx={{ padding: "16px" }}>
      {displayedAuctions.length > 0 ? (
        <>
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            sx={{ padding: "16px" }}
          >
            {displayedAuctions.map((auction) => {
              const fullImageUrl = `${baseURL}${auction.photo}`;
              return (
                <Grid
                  key={auction.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2.4}
                  onClick={() => navigate(`/auction/one/${auction.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <Paper
                    sx={{
                      borderRadius: "16px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      p: 0,
                      width: "260px",
                      height: "260px",
                    }}
                  >
                    {/* Таймер обратного отсчета */}
                    <Box
                      sx={{
                        position: "absolute",
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

                    {/* Изображение аукциона */}
                    <img
                      src={fullImageUrl}
                      alt="Auction"
                      style={{
                        objectFit: "cover",
                        width: "260px",
                        height: "220px",
                        borderRadius: "8px",
                      }}
                    />

                    {/* Данные об авторе и цене */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "5px 10px",
                      }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>
                        {auction.Artist?.login}
                      </Typography>
                      <CurrentPrice
                        startingPrice={auction.starting_price}
                        bids={auction.bids || []}
                      />
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* Панель постраничного переключения */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>

          {/* Кнопка "Загрузить еще" */}
          {lastLoadedPage < totalPages && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" onClick={handleLoadMore}>
                Загрузить еще
              </Button>
            </Box>
          )}
        </>
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
    </Box>
  );
};

export default AllAuctions;
