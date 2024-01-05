const { Router } = require("express");
const artistController = require("../controllers/artistController");
const collectorController = require("../controllers/collectorController");
const auctionController = require('../controllers/auctionController');

const router = new Router();

router.post("/artists", artistController.create);
router.post("/collectors", collectorController.create);

router.post("/auctions", auctionController.create);


module.exports = router;