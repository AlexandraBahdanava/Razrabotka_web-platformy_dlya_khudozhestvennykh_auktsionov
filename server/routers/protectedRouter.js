const { Router } = require("express");

const path = require("path");


const artistController = require("../controllers/artistController");
const collectorController = require("../controllers/collectorController");
const auctionController = require('../controllers/auctionController');
const portfolioController = require('../controllers/portfolioController');
const rateController = require("../controllers/rateController");

const router = new Router();

router.get("/artist/:id", artistController.getOne);
router.put("/artists/:id", artistController.update);
router.get("/artists/:id/avatar", artistController.getAvatar);

router.get("/portfolio/:id",portfolioController.getPortfolioById);
router.post("/auctions", auctionController.create);
router.get("/auctions/:id", auctionController.getAuctionsByArtist);
router.get("/rates/:id", rateController.getRatesByAuction); 
router.post("/portfolio", portfolioController.addToPortfolio);


module.exports = router;