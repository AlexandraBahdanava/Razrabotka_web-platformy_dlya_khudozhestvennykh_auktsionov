const { Artist,AuctionArchive,Auction,ExhibitedPainting,Portfolio,Review, Collector }= require("../database/models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

class ArtistController {

  async create(req, res) {
    try {
        const artist = { ...req.body };

        if (
          (await Artist.findOne({ where: { email: artist.email } })) !== null ||
          (await Collector.findOne({ where: { email: artist.email } })) !== null
        ) {
          return res.status(400).json({ error: "Email is already taken" });
        }

        if (
          (await Artist.findOne({ where: { login: artist.login } })) !== null ||
          (await Collector.findOne({ where: { login: artist.login } })) !== null
        ) {
          return res.status(400).json({ error: "Login is already taken" });
        }

        artist.password = await bcrypt.hash(artist.password, 10);

        const createdArtist = await Artist.create(artist);

        return res.status(201).json(createdArtist);
    }  catch (err) {
      console.error("Ошибка при создании артиста:", err); // Логируем ошибку
      return res.status(500).json({ message: "Ошибка сервера", error: err.message });
    
    }
    
}

async getAvatar(req, res) {
  try {
      const id  = req.artistId;
      if (isNaN(id)) {
          return res.sendStatus(400);
      }

      const imagePath = path.join(__dirname, "../", "avatars", "artist", id + ".png");

      if (!fs.existsSync(imagePath)) {
          return res.sendStatus(204);
      }

      return res.sendFile(imagePath);
  } catch (err) {
      console.log(err);
      return res.sendStatus(500);
  }
}

async getOne(req, res) {
  const id = req.artistId;

  if (!/^\d+$/.test(id)) {
    console.log(req.params);
    return res.sendStatus(400);
}
  try {
      const artist = await Artist.findOne({
          where: { id: id },
          attributes: { exclude: ["password"] },
          include: [
            { model: AuctionArchive },
            { model: Auction },
            { model: Portfolio },
            { model: Review,
            include:[
              {model: Collector},
            ] },
          ],
      });
  
      if (artist == null) {
          return res.sendStatus(404);
      }

     // artist.Portfolios.forEach(portfolioItem => {
       // console.log(portfolioItem.photo);
      //});

      return res.json(artist);
  } catch (err) {
      return res.sendStatus(500);
  }
}

async update(req, res) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.sendStatus(400);
  }
  console.log(req.params);
  console.log(req.body);
  const artistData = { ...req.body };

  const artist = await Artist.findByPk(id);

  if (artist == null) {
    return res.sendStatus(404);
  }

  try {
    await Artist.update(artistData, { where: { id: id } });

    const result = await Artist.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] },
      include: [
        { model: AuctionArchive },
        { model: Auction },
        { model: ExhibitedPainting },
        { model: Portfolio },
        { model: Review },
      ],
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error(err); // Выводим ошибку в консоль для детализации
    return res.status(500).json({ error: err.message }); // Отправляем детали ошибки в ответ
  }
  
}



      // Получение электронной почты художника по его идентификатору
    async getEmailById(id) {
        try {
          const artist = await Artist.findOne({
            attributes: ['authorization_data_id'],
            where: { id: id },
          });
      
          if (!artist) {
            return null; // или выбросить ошибку, в зависимости от логики вашего приложения
          }
      
          const { authorization_data_id } = artist;
          
          // Предположим, что в модели AuthorizationData есть атрибут email
          const authorizationData = await AuthorizationData.findByPk(authorization_data_id, {
            attributes: ['email'],
          });
      
          if (!authorizationData) {
            return null; // или выбросить ошибку
          }
      
          return authorizationData.email;
        } catch (error) {
          console.error('Error retrieving artist email:', error);
          throw error;
        }
      }
      
}

module.exports = new ArtistController();