const {
  Artist,
  Auction,
  Collector,
  AuctionArchive,
  Rate,
} = require("../database/models");

class AuctionController {
  // Получение аукционов коллекционера
  async getAuctionByCollectorId(req, res) {
    const id = req.collectorId;
    console.log(req.params);

    if (!/^\d+$/.test(id)) {
      console.log(req.params);
      return res.sendStatus(400);
    }

    try {
      const auction = await Rate.findAll({
        where: { CollectorId: id },

        include: [
          {
            model: Collector,
            where: { id: id },
          },
          {
            model: Auction,
          },
        ],
      });
      console.log(auction);
      return res.json(auction);
    } catch (error) {
      console.error("Error retrieving auctions by artist:", error);
      throw error;
    }
  }

  async delete(auctionId) {
    const transaction = await sequelize.transaction();

    try {
      // Удаление ставок по аукциону
      await Rates.destroy({
        where: { auction_id: auctionId },
        transaction,
      });

      // Удаление самого аукциона
      await Auction.destroy({
        where: { id: auctionId },
        transaction,
      });

      // Фиксация транзакции
      await transaction.commit();

      console.log(
        `Auction with id ${auctionId} and related rates deleted successfully.`
      );
    } catch (error) {
      // Откат транзакции в случае ошибки
      await transaction.rollback();
      console.error("Error deleting auction with rates:", error);
      throw error;
    }
  }

  // Получение аукционов по жанру
  async getAuctionsByGenre(genre) {
    try {
      const auction = await Auction.findAll({
        where: { genre: genre },
      });

      return auction;
    } catch (error) {
      console.error("Error retrieving auctions by genre:", error);
      throw error;
    }
  }

  // Получение аукционов по цвету
  async getAuctionsByColor(color) {
    try {
      const auction = await Auction.findAll({
        where: { color: color },
      });

      return auction;
    } catch (error) {
      console.error("Error retrieving auctions by color:", error);
      throw error;
    }
  }

  // Получение аукционов по тегу
  async getAuctionsByTag(tag) {
    try {
      const auction = await Auction.findAll({
        where: {
          tags: {
            [Sequelize.Op.contains]: [tag],
          },
        },
      });

      return auction;
    } catch (error) {
      console.error("Error retrieving auctions by tag:", error);
      throw error;
    }
  }

  // Получение аукциона по заголовку
  async getAuctionByTitle(title) {
    try {
      const auction = await Auction.findOne({
        where: { title: title },
      });

      return auction;
    } catch (error) {
      console.error("Error retrieving auction by title:", error);
      throw error;
    }
  }

  // Сортировка аукционов по цене
  async getAuctionsByPriceOrder(order = "ASC") {
    try {
      const auction = await Auction.findAll({
        order: [["starting_price", order]],
      });

      return auction;
    } catch (error) {
      console.error("Error retrieving auctions by price order:", error);
      throw error;
    }
  }

  // Сортировка аукционов по длительности
  async getAuctionsByDurationOrder(order = "ASC") {
    try {
      const auction = await Auction.findAll({
        order: [["duration", order]],
      });

      return auction;
    } catch (error) {
      console.error("Error retrieving auctions by duration order:", error);
      throw error;
    }
  }

  // Создание аукциона
async create(req, res) {
  try {
    // Получаем данные из тела запроса
    const auction = { ...req.body };

    // Если название аукциона не передано, присваиваем значение по умолчанию
    if (!auction.title) {
      auction.title = "Без названия";
    }

    // Получаем ID артиста, который привязан к аукциону
    const artistId = req.artistId;
    console.log(artistId);
    console.log(req.body);

    // Если файл с изображением был загружен
    if (req.file) {
      // Сформируем путь к изображению (папка avatars, имя файла из req.file.filename)
      const imagePath = path.join('photo/artist', req.file.filename);
      auction.image = imagePath; // Добавляем путь к изображению в объект аукциона
    }

    // Создаем новый аукцион в базе данных
    const createdAuction = await Auction.create(auction);

    // Устанавливаем связь с артистом (предполагается, что аукцион связан с артистом через метод setArtist)
    await createdAuction.setArtist(artistId);

    // Отправляем успешный ответ с созданным аукционом
    return res.status(201).json(createdAuction);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

  // Получение всех аукционов
  async getAll(req, res) {
    try {
      const auctions = await Auction.findAll({
        include: [
          {
            model: Artist, // Убедитесь, что модель существует и связь настроена
          },
        ],
      });

      return res.json(auctions);
    } catch (error) {
      console.error(
        "Error retrieving all auctions:",
        error.message,
        error.stack
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  // Получение аукционов художника
  async getAuctionsByArtist(req, res) {
    const artistId = req.artistId;
    try {
      const auction = await Auction.findAll({
        where: { ArtistId: artistId },
        include: [
          {
            model: Artist,
            where: { id: artistId },
          },
        ],
      });

      return res.json(auction);
    } catch (error) {
      console.error("Error retrieving auctions by artist:", error);
      throw error;
    }
  }

  async searchMaterial(req, res) {
    try {
      const { material } = req.params;

      // Search auctions by material
      const auctions = await Auction.findAll({
        where: {
          material: {
            [Op.iLike]: `%${material}%`, // Case-insensitive search
          },
        },
      });

      // Respond with the found auctions
      res.json({ auctions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Получение аукциона по id
  async getAuctionById(req, res) {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      console.log("да я", req.params.id);
      return res.sendStatus(400);
    }
    try {
      const auction = await Auction.findOne({
        where: { id: id },
        include: [{ model: Artist }],
      });

      if (auction == null) {
        return res.sendStatus(404);
      }

      return res.json(auction);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}
module.exports = new AuctionController();
