const {
  Artist,
  AuctionArchive,
  Auction,
  Portfolio,
  Review,
  Collector,
} = require("../database/models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../photo/artist");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const id = req.artistId; // Используем artistId из токена
    cb(null, `${id}.png`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  },
});

// Контроллер артиста
class ArtistController {
  async create(req, res) {
    try {
      const artist = { ...req.body };

      // Проверяем уникальность email и login
      const existingUser = await Artist.findOne({
        where: {
          [Op.or]: [{ email: artist.email }, { login: artist.login }],
        },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email or login is already taken" });
      }

      // Хешируем пароль
      artist.password = await bcrypt.hash(artist.password, 10);

      const createdArtist = await Artist.create(artist);

      return res.status(201).json(createdArtist);
    } catch (err) {
      console.error("Error in create:", err);
      return res
        .status(500)
        .json({ error: "Server error", details: err.message });
    }
  }

  async createImage(req, res) {
    try {
      const artistId = req.artistId; // Получаем artistId из токена
      if (!artistId) {
        return res.status(400).json({ error: "Invalid artist ID" });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }
  
      const artist = await Artist.findByPk(artistId, { attributes: ["login"] });
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
  
      const artistLogin = artist.login;
      const originalName = path.parse(req.file.originalname).name;
      const fileExtension = path.extname(req.file.originalname);
      const newFileName = `${artistLogin}_${originalName}${fileExtension}`;
      const imagePath = path.join(__dirname, "../photo/artist", newFileName);
  
      // Переименовываем файл
      fs.renameSync(req.file.path, imagePath);
  
      // Обновляем путь изображения в базе данных
      await Artist.update(
        { avatar: `/photo/artist/${newFileName}` }, // Обновляем поле с путем к изображению
        { where: { id: artistId } }
      );
  
      return res.status(201).json({
        message: "Image uploaded successfully",
        path: `/photo/artist/${newFileName}`,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Server error", details: err.message });
    }
  }
  

  async getOne(req, res) {
    const id = req.artistId;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    try {
      const artist = await Artist.findOne({
        where: { id },
        attributes: { exclude: ["password"] },
        include: [
          { model: AuctionArchive },
          { model: Auction },
          { model: Portfolio },
          { model: Review, include: [{ model: Collector }] },
        ],
      });

      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }

      return res.json(artist);
    } catch (err) {
      console.error("Error in getOne:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
  
    // Проверяем формат ID
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
  
    try {
      // Ищем художника в базе данных
      const artist = await Artist.findByPk(id);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
  
      // Проверяем, нужно ли хешировать пароль
      if (req.body.password) {
        if (req.body.password.length < 6) {
          return res
            .status(400)
            .json({ error: "Password must be at least 6 characters long" });
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
  
      // Обновляем данные художника
      await Artist.update(req.body, { where: { id } });
  
      // Если было загружено новое изображение, обновляем путь к нему
      if (req.file) {
        const artistLogin = artist.login;
        const originalName = path.parse(req.file.originalname).name;
        const fileExtension = path.extname(req.file.originalname);
        const newFileName = `${artistLogin}_${originalName}${fileExtension}`;
        const imagePath = path.join(__dirname, "../photo/artist", newFileName);
  
        // Переименовываем файл
        fs.renameSync(req.file.path, imagePath);
  
        // Обновляем путь изображения в базе данных
        await Artist.update(
          { avatar: `/photo/artist/${newFileName}` },
          { where: { id } }
        );
      }
  
      // Получаем обновленную информацию о художнике
      const updatedArtist = await Artist.findOne({
        where: { id },
        attributes: { exclude: ["password"] }, // Исключаем пароль из возвращаемых данных
        include: [
          { model: AuctionArchive },
          { model: Auction },
          { model: Portfolio },
          { model: Review },
        ],
      });
  
      return res.json(updatedArtist);
    } catch (err) {
      console.error("Error in update:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
  
  
  // Получение электронной почты художника по его идентификатору
  async getEmailById(id) {
    try {
      const artist = await Artist.findOne({
        attributes: ["authorization_data_id"],
        where: { id: id },
      });

      if (!artist) {
        return null; // или выбросить ошибку, в зависимости от логики вашего приложения
      }

      const { authorization_data_id } = artist;

      // Предположим, что в модели AuthorizationData есть атрибут email
      const authorizationData = await AuthorizationData.findByPk(
        authorization_data_id,
        {
          attributes: ["email"],
        }
      );

      if (!authorizationData) {
        return null; // или выбросить ошибку
      }

      return authorizationData.email;
    } catch (error) {
      console.error("Error retrieving artist email:", error);
      throw error;
    }
  }
}

module.exports = new ArtistController();
module.exports.upload = upload;
