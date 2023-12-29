const express = require('express');
const router = express.Router();
const CollectorController = require('../controllers/CollectorsController');

// Создание записи о коллекционере
router.post('/collectors', async (req, res) => {
  try {
    const { phone } = req.body;

    // Предполагается, что authorization_data_id передается в теле запроса или доступно в req
    const authorization_data_id = req.authorization_data_id;

    // Вызов метода контроллера для создания коллекционера
    const collector = await CollectorController.createCollector({ phone, authorization_data_id });

    // Отправка успешного ответа
    res.status(201).json({ message: 'Collector created successfully', collector });
  } catch (error) {
    console.error('Error creating collector', error);
    // Отправка ошибки в случае неудачи
    res.status(500).json({ error: 'Collector creation failed' });
  }
});

module.exports = router;
