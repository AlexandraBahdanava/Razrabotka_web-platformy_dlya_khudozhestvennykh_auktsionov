require("dotenv").config();
const express = require("express");
const sequelize = require("./database/index");
const router = require("./routers/index");
const cors = require("cors");
const path = require("path");
const initializeApp = require("./controllers/initializeApp");
const { Auction, AuctionArchive, Rate } = require("./database/models"); // Импорт моделей
const PORT = process.env.PORT || 3000; // Используем один порт

const app = express();

// Middleware
app.use(cors()); // Включаем CORS для всех маршрутов
app.use(express.json());
app.use(router); // Основной роутер

// Обслуживание статических файлов (аватары)
app.use("/photo", express.static(path.join(__dirname, "photo")));

// Функция запуска сервера
const start = async () => {
  try {
    await sequelize.authenticate(); // Аутентификация с базой данных
    await sequelize.sync({ alter: true }); // Синхронизация базы данных

    // Инициализация логики обработки аукционов
    await initializeApp(Auction, AuctionArchive, Rate);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log("Error while starting the server:", e);
  }
};

start();
