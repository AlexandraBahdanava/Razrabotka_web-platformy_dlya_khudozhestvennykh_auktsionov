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

const artistController = require("../controllers/artistController");
const collectorController = require("../controllers/collectorController");
const auctionController = require('../controllers/auctionController');

const router = new Router();

router.get("/artist/:id", artistController.getOne);
router.put("/artists/:id", artistController.update);
router.get("/artists/:id/avatar", artistController.getAvatar);
router.post("/artists/:id/avatar", upload.single("image"), artistController.updateAvatar);

router.post("/auctions", auctionController.create);


module.exports = router;