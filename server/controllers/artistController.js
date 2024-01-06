const { Artist,AuctionArchive,Auction,ExhibitedPainting,Portfolio,Review }= require("../database/models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

class ArtistController {

  async create(req, res) {
    try {
        const artist = { ...req.body };

        if ((await Artist.findOne({ where: { email: artist.email } })) !== null) {
            return res.status(400).json({ error: "Email is taken" });
        }

        artist.password = await bcrypt.hash(artist.password, 10);

        const createdArtist = await Artist.create(artist);

        return res.status(201).json(createdArtist);
    } catch (err) {
        return res.sendStatus(500);
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
            { model: Review },
          ],
      });

      if (artist == null) {
          return res.sendStatus(404);
      }

      return res.json(artist);
  } catch (err) {
      return res.sendStatus(500);
  }
}

async update(req, res) {
  const { id } = req.artistId;

  if (id != req.artistId) {
      return res.sendStatus(403);
  }

  const artistData = { ...req.body };

  if (isNaN(id) || parseInt(id) !== artistData.id) {
      return res.sendStatus(400);
  }

  const artist = await Artist.findOne({ where: { id: id } });

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
      return res.sendStatus(500);
  }
}

async updateAvatar(req, res) {
  try {
      const { id } = req.params;

      if (isNaN(id)) {
          return res.sendStatus(400);
      }

      if (id != req.artistId) {
          return res.sendStatus(403);
      }

      const savePath = path.join(__dirname, "../", "avatars", "artist", id + ".png");

      const imagePath = path.join(__dirname, "../", "uploads", id + ".png");

      if (!fs.existsSync(imagePath)) {
          return res.sendStatus(404);
      }

      fs.rename(imagePath, savePath, (err) => {
          if (err) throw err;
      });

      return res.sendStatus(204);
  } catch (err) {
      console.log(err);
      return res.sendStatus(500);
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