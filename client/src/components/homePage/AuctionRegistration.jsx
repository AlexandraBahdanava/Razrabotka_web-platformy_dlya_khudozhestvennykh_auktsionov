import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";

const AuctionRegistration = ({ isAuthenticated, openLogin, openRegister }) => {
  if (isAuthenticated) return null;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }} // Колонка на маленьких экранах, строка на больших
      justifyContent="space-between"
      alignItems="flex-start" // Выравниваем по верхнему краю
      p={2}
      width={"100%"}
      sx={{ color: "#091E42", margin: "50px" }} // Добавлены отступы по бокам
    >
      <Box
        sx={{
          flex: "1 1 300px",
          marginRight: { md: 16 },
          maxWidth: "500px",
          textAlign: "left",
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "23px" }}
        >
          То что надо!
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color="#091E42"
          sx={{ fontSize: "13px" }}
        >
          Покупай картины на сотнях онлайн-аукционов по всему миру в пару
          кликов. Быстрые и выгодные сделки для обеих сторон.
        </Typography>
      </Box>

      {/* Кнопки */}
      <Box
        display="flex"
        gap={5}
        sx={{
          alignSelf: "flex-start",
          marginTop: 2,
          justifyContent: "flex-end",
          maxWidth: "600px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={
            <Icon icon="ic:round-plus" color="#91E42" width="20" height="20" />
          }
          onClick={openLogin}
          sx={{
            color: "#091E42",
            borderColor: "#091E42",
            "&:hover": {
              borderColor: "#091E42",
              backgroundColor: "#f5f5f5",
            },
            width: "250px",
            height: "45px",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>
            Организовать аукцион
          </Typography>
        </Button>
        <Button
          variant="contained"
          startIcon={
            <Icon icon="mynaui:send" color="white" width="20" height="20" />
          }
          onClick={openRegister}
          sx={{
            backgroundColor: "#091E42",
            color: "white",
            "&:hover": {
              backgroundColor: "#0f2136",
            },
            width: "250px",
            height: "45px",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>Зарегистрироваться</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default AuctionRegistration;
