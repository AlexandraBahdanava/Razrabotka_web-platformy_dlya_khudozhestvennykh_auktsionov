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

const types = ['image/png', 'image/jpg', 'image/jpeg']

const FileFilter = (req, file, cb) =>{
    if (types.includes(file.mimeType)){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const upload = multer({ storage: storage,FileFilter });

const artistController = require("../controllers/artistController");
const collectorController = require("../controllers/collectorController");
const auctionController = require('../controllers/auctionController');
const portfolioController = require('../controllers/portfolioController')

const router = new Router();

router.get("/artist/:id", artistController.getOne);
router.put("/artists/:id", artistController.update);
router.get("/artists/:id/avatar", artistController.getAvatar);
router.post("/artists/:id/avatar", upload.single("image"), artistController.updateAvatar);

router.get("/portfolio/${id}",portfolioController.getPortfolioById);
router.post("/auctions", auctionController.create);
router.post("/portfolio", portfolioController.addToPortfolio);


module.exports = router;