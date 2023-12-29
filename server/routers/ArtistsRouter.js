const express = require('express');
const router = express.Router();
const artistController = require('../controllers/ArtistsController');

// Роут для создания художника
router.post('/artists', artistController.create);

// Роут для обновления художника
router.put('/artists/:id', artistController.update);

// Роут для получения электронной почты художника по его идентификатору
router.get('/artists/:id/email', artistController.getEmailById);

module.exports = router;
