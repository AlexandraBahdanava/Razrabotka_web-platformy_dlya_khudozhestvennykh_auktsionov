const { Router } = require("express");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);

        if (req.artistId) {
            cb(null, req.artistId + extension);
        } else {
            cb(null, req.collectorId + extension);
        }
    },
});

const upload = multer({ storage: storage });

const artistController = require("../controllers/ArtistsController");
const collectorController = require("../controllers/CollectorsController");


const router = new Router();

// Роут для создания художника
router.post('/artists', artistController.create);

// Роут для обновления художника
router.put('/artists/:id', artistController.update);

// Роут для получения электронной почты художника по его идентификатору
router.get('/artists/:id/email', artistController.getEmailById);
router.post('/collectors', collectorController.create);
module.exports = router;