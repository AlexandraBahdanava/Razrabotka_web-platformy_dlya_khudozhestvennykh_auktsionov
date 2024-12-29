const { AuctionArchive } = require("../database/models");

class AuctionArchiveController {

  // Метод для получения архивных аукционов по ArtistId
  async getAuctionArchiveByArtistId(req, res) {
    const artistId = req.artistId;

    // Проверка на валидность ID (только цифры)
    if (!/^\d+$/.test(artistId)) {
      console.log(req.params);
      return res.sendStatus(400);  // Возвращаем ошибку 400 (Bad Request)
    }

    try {
      // Ищем архивные аукционы для указанного artistId
      const auctions = await AuctionArchive.findAll({
        where: { ArtistId: artistId },
        order: [["closing_date", "DESC"]],  // Сортировка по дате закрытия (от новых к старым)
      });

      // Если не найдено ни одного аукциона
      if (auctions.length === 0) {
        return res.sendStatus(404);  // Возвращаем ошибку 404 (Not Found)
      }

      // Возвращаем найденные архивные аукционы
      return res.json(auctions);
    } catch (err) {
      console.error("Error fetching auction archives:", err);
      return res.sendStatus(500);  // Возвращаем ошибку 500 (Internal Server Error)
    }
  }
}

module.exports = new AuctionArchiveController();
