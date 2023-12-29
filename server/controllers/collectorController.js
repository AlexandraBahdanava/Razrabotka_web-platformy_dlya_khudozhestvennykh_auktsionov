const  Collectors = require('../models/Collectors');
const  AuthorizationData = require('../models/AuthorizationData');

class CollectorController {
  async create(req, res) {
    try {
      const { phone } = req.body;

      // Проверка существования пользователя в AuthorizationData
      const authData = await AuthorizationData.findByPk(req.authorization_data_id);

      if (!authData) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Проверка наличия записи о коллекционере для данного пользователя
      const existingCollector = await Collectors.findOne({
        where: { authorization_data_id: authData.id }
      });

      if (existingCollector) {
        return res.status(400).json({ error: 'Collector record already exists' });
      }

      // Создание записи о коллекционере
      const collector = await Collectors.create({
        phone,
        authorization_data_id: authData.id
      });

      res.status(201).json({ message: 'Collector created successfully', collector });
    } catch (error) {
      console.error('Error creating collector', error);
      res.status(500).json({ error: 'Collector creation failed' });
    }
  }
}

module.exports = new CollectorController();
