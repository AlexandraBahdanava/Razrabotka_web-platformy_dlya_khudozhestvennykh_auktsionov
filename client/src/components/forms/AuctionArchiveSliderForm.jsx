import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuctionArchiveByArtistId } from "../../api/auctionArchiveApi";
import { useTheme } from "@mui/material/styles";

const AuctionArchiveSliderForm = () => {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const theme = useTheme();
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await getAuctionArchiveByArtistId();
        const data = response.data || [];
        setAuctions(data);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`; // Форматируем дату в виде "день.месяц.год"
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
      {auctions.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "bold",
            color: theme.palette.text.secondary,
          }}
        >
          Архив пуст
        </Typography>
      ) : (
        <>
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
                      position: "relative", // Важный стиль для позиционирования даты
                    }}
                  >
                    {/* Блок с датой */}
                    <Box
                      sx={{
                        position: "absolute",
                        backgroundColor: "yellow", // Желтый фон
                        color: "#000",
                        padding: "4px 12px",
                        borderRadius: "15px", // Овальная форма
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatDate(auction.closing_date)}{" "}
                      {/* Форматируем дату */}
                    </Box>

                    <img
                      src={`http://localhost:3000${auction.photo}`}
                      alt={auction.title}
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
                        justifyContent: "center", // Центрируем цену
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        ${auction.selling_price}
                      </Typography>
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
        </>
      )}
    </Box>
  );
};

export default AuctionArchiveSliderForm;
