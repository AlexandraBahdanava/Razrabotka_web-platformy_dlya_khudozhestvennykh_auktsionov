const Artists = require('../models/Artists');
const  AuthorizationData  = require('../models/AuthorizationData');

class ArtistController {
  async create(req, res) {
    try {
      const { name, country, city, photo, about_artist, authorization_data_id } = req.body;

      // Проверка наличия пользователя в AuthorizationData
      const authorizationData = await AuthorizationData.findByPk(authorization_data_id);

      if (!authorizationData) {
        return res.status(404).json({ error: 'Authorization data not found' });
      }

      // Создание художника
      const newArtist = await Artists.create({
        name,
        country,
        city,
        photo,
        about_artist,
        authorization_data_id,
      });

      res.status(201).json({ message: 'Artist created successfully', artist: newArtist });
    } catch (error) {
      console.error('Error creating artist', error);
      res.status(500).json({ error: 'Artist creation failed' });
    }
  }


async update(req, res) {
    try {
      const { id } = req.params; // ID художника, который нужно обновить
      const { name, country, city, photo, about_artist } = req.body;

      // Проверка наличия художника
      const artist = await Artists.findByPk(id);

      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }

      // Обновление данных художника
      await Artists.update(
        { name, country, city, photo, about_artist },
        { where: { id } }
      );

      // Получение обновленных данных художника
      const updatedArtist = await Artists.findByPk(id);

      res.status(200).json({ message: 'Artist updated successfully', artist: updatedArtist });
    } catch (error) {
      console.error('Error updating artist', error);
      res.status(500).json({ error: 'Artist update failed' });
    }
  }
}
module.exports = new ArtistController();
