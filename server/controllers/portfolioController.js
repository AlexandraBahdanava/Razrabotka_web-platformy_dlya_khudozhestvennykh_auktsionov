const { Portfolio } = require("../database/models");
const bcrypt = require("bcrypt");

class PortfolioController {
  async addToPortfolio(req, res) {
    try {
      const portfolio = { ...req.body };

      const artistId = req.artistId;
      console.log(artistId);
      console.log(portfolio);

      const createdPortfolio = await Portfolio.create(portfolio);

      await createdPortfolio.setArtist(artistId);

      return res.status(201).json(createdPortfolio);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async getPortfolioById(req, res) {
    const id = req.artistId;

    if (!/^\d+$/.test(id)) {
      console.log(req.params);
      return res.sendStatus(400);
    }
    try {
      const photo = await Portfolio.findAll({
        where: { artistId: id },
      });

      if (artist == null) {
        return res.sendStatus(404);
      }

      return res.json(photo);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
  // Новый метод для удаления портфолио
  async deletePortfolio(req, res) {
    const { id } = req.params; // Получаем id портфолио из параметров запроса

    if (!/^\d+$/.test(id)) {
      return res.sendStatus(400); // Если id не является числом, возвращаем ошибку
    }

    try {
      // Ищем портфолио с указанным id
      const portfolio = await Portfolio.findByPk(id);

      if (!portfolio) {
        return res.sendStatus(404); // Если портфолио не найдено, возвращаем ошибку
      }

      // Удаляем портфолио
      await portfolio.destroy();

      return res.status(200).send("Портфолио успешно удалено"); // Отправляем успешный ответ
    } catch (err) {
      console.error(err);
      return res.sendStatus(500); // Ошибка сервера
    }
  }
}

module.exports = new PortfolioController();
