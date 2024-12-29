import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuctionsByArtist } from "../../api/auctionApi";
import { getRateByAuction } from "../../api/rateApi";
import { useTheme } from "@mui/material/styles";

const CurrentPrice = ({ startingPrice, bids, rate_step }) => {
  const totalPrice = (Array.isArray(bids) ? bids : []).reduce(
    (sum, bid) => sum + (bid.bet_size || 0),
    0
  );

  // Добавляем начальную цену только в конце, если она еще не была учтена
  const finalPrice = startingPrice + totalPrice;

  return (
    <Typography sx={{ fontSize: "16px" }}>
      {`$${finalPrice.toFixed(2)}`}
    </Typography>
  );
};

const CountdownTimer = ({ createdAt, duration }) => {
  const calculateRemainingTime = (createdAt, duration) => {
    const createdAtTime = new Date(createdAt).getTime();
    const durationMs = duration * 24 * 60 * 60 * 1000;
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
      )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    } else {
      return "Ошибка";
    }
  };

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

const AuctionSliderForm = () => {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const theme = useTheme();
  const [auctionBids, setAuctionBids] = useState({}); // Храним ставки для каждого аукциона
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await getAuctionsByArtist();
        const data = response.data || [];
        setAuctions(data);

        // Загрузим ставки для каждого аукциона
        const bidsData = {};
        for (const auction of data) {
          const bidsResponse = await getRateByAuction(auction.id);

          bidsData[auction.id] = bidsResponse.data || [];
        }
        setAuctionBids(bidsData);
      } catch (error) {
        console.error("Ошибка при загрузке аукционов:", error);
      }
    };

    fetchAuctions();
  }, []);

  const settings = {
    dots: false,
    infinite: false, // Отключаем бесконечное пролистывание
    speed: 500,
    slidesToShow: 5, // Количество видимых слайдов
    slidesToScroll: 1, // Стрелки пролистывают по одному слайду
    draggable: true, // Включаем перетаскивание мышью
    swipeToSlide: true, // Мышью можно листать на любое количество слайдов
    arrows: false, // Отключаем стандартные стрелки
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden",
        "&:hover .arrow": {
          opacity: 1,
        },
      }}
    >
      {/* Левая стрелка */}
      <Box
        className="arrow"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "50px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        onClick={() => sliderRef.current.slickPrev()}
      >
        <span style={{ fontSize: "24px", color: "#fff" }}>{"<"}</span>
      </Box>

      <Slider ref={sliderRef} {...settings}>
        {auctions.map((auction) => {
          const bids = auctionBids[auction.id] || []; // Получаем ставки для текущего аукциона

          return (
            <Box key={auction.id}>
              <Paper
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  width: "260px",
                  padding: 0,
                  margin: "0 15px",
                  boxShadow: 3,
                }}
              >
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

                <img
                  src={`http://localhost:3000${auction.photo}`}
                  alt={auction.title}
                  onClick={() => navigate(`/auction/one/${auction.id}`)}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "220px",
                  }}
                />
                <Box
                  sx={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    {auction.Artist?.name} {auction.Artist?.surname}
                  </Typography>
                  <CurrentPrice
                    startingPrice={auction.starting_price}
                    bids={bids}
                    rate_step={auction.rate_step}
                  />
                </Box>
              </Paper>
            </Box>
          );
        })}
      </Slider>

      {/* Правая стрелка */}
      <Box
        className="arrow"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "50px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        onClick={() => sliderRef.current.slickNext()}
      >
        <span style={{ fontSize: "24px", color: "#fff" }}>{">"}</span>
      </Box>
    </Box>
  );
};

export default AuctionSliderForm;
