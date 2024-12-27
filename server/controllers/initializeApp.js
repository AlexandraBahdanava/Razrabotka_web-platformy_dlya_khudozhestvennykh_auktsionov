const sequelize = require("../database/index");
const fs = require("fs");
const path = require("path");
const { Sequelize, Op } = require("sequelize");
const { Artist } = require("../database/models");

// Функция для обработки аукционов
const processAuctions = async (Auction, AuctionArchive, Rate) => {
  try {
    // Выбираем аукционы, которые завершились
    const completedAuctions = await Auction.findAll();

    for (const auction of completedAuctions) {
      // Расчет даты завершения аукциона с учетом его длительности
      const closingDate = new Date(
        auction.createdAt.getTime() + auction.duration * 24 * 60 * 60 * 1000
      );

      // Проверяем, завершился ли аукцион
      if (closingDate <= new Date()) {
        // Получаем сумму всех шагов ставок для данного аукциона
        const totalRateSteps =
          (await Rate.sum("bet_size", { where: { AuctionId: auction.id } })) ||
          0;

        // Рассчитываем итоговую цену продажи
        const sellingPrice = auction.starting_price + totalRateSteps;

        // Архивируем аукцион
        await AuctionArchive.create({
          closing_date: closingDate,
          selling_price: sellingPrice,
          photo: auction.photo,
          ArtistId: auction.ArtistId,
        });

        // Удаляем завершенный аукцион
        await auction.destroy();
      }
    }

    console.log("Completed auctions processed.");
  } catch (error) {
    console.error("Error during processAuctions:", error);
  }
};

// Функция для обработки архива
async function processAuctionArchive(AuctionArchive) {
  const currentDate = new Date();

  // Выбираем архивные записи, которым более 30 дней
  const oldArchives = await AuctionArchive.findAll({
    where: {
      closing_date: {
        [Op.lt]: new Date(currentDate - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  // Абсолютный путь к изображениям
  const imagesDir = path.resolve(
    "C:/Users/bahda/Desktop/7 семестр/Экспертные системы/Razrabotka_web-platformy_dlya_khudozhestvennykh_auktsionov/server"
  );

  for (const archive of oldArchives) {
    // Получаем путь изображения с учетом нового абсолютного пути
    const photoPath = path.join(imagesDir, archive.photo);

    console.log("Attempting to delete photo:", photoPath); // Логируем путь к изображению

    try {
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
        console.log("Photo deleted successfully:", photoPath);
      } else {
        console.log("File does not exist:", photoPath);
      }
    } catch (err) {
      console.error("Error deleting photo:", err);
    }

    // Удаляем запись из архива
    await archive.destroy();
  }
}

// Основная функция, вызываемая при запуске приложения
async function initializeApp(Auction, AuctionArchive, Rate) {
  try {
    console.log("Processing auctions...");
    await processAuctions(Auction, AuctionArchive, Rate); // Исправляем передачу параметров

    console.log("Processing auction archive...");
    await processAuctionArchive(AuctionArchive);

    console.log("Initialization complete.");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

module.exports = initializeApp;
