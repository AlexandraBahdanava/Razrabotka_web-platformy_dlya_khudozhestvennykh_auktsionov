const { Rate, Collector } = require("../database/models");

class rateController {
  // Метод для создания ставки

  async createRate(req, res) {
    try {
      const { bet_size, collectorId, auctionId } = req.body;
  
      if (!bet_size || !collectorId || !auctionId) {
        return res.status(400).json({ error: "Все поля обязательны" });
      }
  
      const newRate = await Rate.create({
        bet_size,
        CollectorId: collectorId, // Убедитесь, что это поле соответствует модели
        AuctionId: auctionId,
      });
  
      return res.status(201).json(newRate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ошибка сервера" });
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
