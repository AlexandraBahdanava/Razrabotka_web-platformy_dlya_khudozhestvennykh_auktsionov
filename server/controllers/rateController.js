const { Rate, Collector } = require("../database/models");

class rateController {
  // Метод для создания ставки
  async createRate(req, res) {
    const { collectorId, auctionId, amount } = req.body;

    // Проверка входных данных
    if (!collectorId || !auctionId || !amount) {
      return res.status(400).json({ message: "Не все данные переданы." });
    }

    try {
      // Создание новой ставки
      const rate = await Rate.create({
        collectorId,
        auctionId,
        amount,
        createdAt: new Date(),
      });

      return res.status(201).json({
        message: "Ставка успешно создана.",
        rateId: rate.id,
      });
    } catch (error) {
      console.error("Ошибка при создании ставки:", error);
      return res.status(500).json({
        message: "Ошибка сервера при создании ставки.",
      });
    }
  }

  async getRatesByAuction(req, res) {
    const id = req.params.id;

    if (!/^\d+$/.test(id)) {
      //  console.log(req.params);
      return res.sendStatus(400);
    }
    try {
      const rates = await Rate.findAll({
        where: { AuctionId: id },
        include: [
          {
            model: Collector,
          },
        ],
      });

      return res.json(rates);
    } catch (error) {
      console.error("Error retrieving rates by artist:", error);
      throw error;
    }
  }
}
module.exports = new rateController();
