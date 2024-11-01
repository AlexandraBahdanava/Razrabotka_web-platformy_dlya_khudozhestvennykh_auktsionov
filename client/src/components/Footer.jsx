import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      bgcolor="#091E42" // Цвет фона (синий)
      color="#FFFFFF" // Цвет текста (белый)
      textAlign="center"
      py={2} // Внутренний отступ сверху и снизу
      width="100%" // Занимает всю ширину страницы
      height="70px"
      bottom={0} // Расположен внизу экрана
      zIndex={1000} // При необходимости, устанавливайте zIndex
    >
      <Typography variant="body1">
        Все права защищены, {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
