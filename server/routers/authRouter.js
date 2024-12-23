const { Router } = require("express");
const artistController = require("../controllers/artistController");
const authController = require("../controllers/authController");
const collectorController = require("../controllers/collectorController");
const auctionController = require("../controllers/auctionController");
const rateController = require("../controllers/rateController")

const router = new Router();

router.post("/login", authController.login);
router.post("/register/artist", artistController.create);
router.post("/register/collector", collectorController.create);
router.get("/auctions/all", auctionController.getAll);
router.get(`/auction/one/:id`, auctionController.getAuctionById);

router.get("/rates/:id", rateController.getRatesByAuction);

module.exports = router;