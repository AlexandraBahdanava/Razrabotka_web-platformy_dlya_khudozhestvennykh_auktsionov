const { Router } = require("express");
const artistController = require('../controllers/ArtistsController');


const router = new Router();
// Роут для создания художника
router.post('/artists', artistController.create);

// Роут для обновления художника
router.put('/artists/:id', artistController.update);

// Роут для получения электронной почты художника по его идентификатору
router.get('/artists/:id/email', artistController.getEmailById);

module.exports = router;