require("dotenv").config();
const express = require("express");
const sequelize = require("./database/index");
const router = require("./routers/index");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000; // Используем один порт

const app = express();

// Middleware
app.use(cors()); // Включаем CORS для всех маршрутов
app.use(express.json());
app.use(router); // Основной роутер

// Обслуживание статических файлов (аватары)
app.use("/avatars", express.static(path.join(__dirname, "avatars")));

// Функция запуска сервера
const start = async () => {
  try {
    await sequelize.authenticate(); // Аутентификация с базой данных
    await sequelize.sync({ alter: true }); // Синхронизация базы данных
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log("Error while starting the server:", e);
  }
};

start();
