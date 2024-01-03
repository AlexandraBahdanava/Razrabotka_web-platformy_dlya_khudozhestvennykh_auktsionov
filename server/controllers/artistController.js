const { Artist, AuthorizationData }= require("../database/models");
const bcrypt = require("bcrypt");

class ArtistController {

  async create(req, res) {
    const { login, password, ...artistData } = req.body;

    try {
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание записи в таблице ДанныеАвторизации
        const createdAuthorizationData = await AuthorizationData.create({
            login: login,
            password: hashedPassword,
        });

        // Создание записи в таблице художники с привязкой к записи в таблице ДанныеАвторизации
        const createdArtist = await Artist.create({
            ...artistData,
            AuthorizationDataId: createdAuthorizationData.id,
        });

        return res.status(201).json(createdArtist);
    } catch (err) {
        console.error("Error during artist creation:", err);
        return res.sendStatus(500);
    }
}

    async update(req, res) {
        const { id } = req.params;

        const artist = { ...req.body };

        if (isNaN(id) || parseInt(id) !== artist.id) {
            return res.sendStatus(400);
        }

        if ((await Artist.findOne({ where: { id: id } })) == null) {
            return res.sendStatus(404);
        }

        try {
            await Artist.update(artist, { where: { id: id } });

            return res.sendStatus(204);
        } catch (err) {
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