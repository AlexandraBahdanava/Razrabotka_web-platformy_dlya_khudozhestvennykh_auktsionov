const { Router } = require("express");
const path = require("path");

const artistController = require("../controllers/artistController");
const collectorController = require("../controllers/collectorController");
const auctionController = require("../controllers/auctionController");
const portfolioController = require("../controllers/portfolioController");
const rateController = require("../controllers/rateController");
const auctionArchiveController = require("../controllers/auctionArchiveController");

const router = new Router();

router.get("/artist/:id", artistController.getOne);
router.put("/artist/update/:id", artistController.update);
// Роут для загрузки изображения
router.post(
  "/artist/create/:id/photo",
  artistController.upload.single("image"), // Обработчик файла
  artistController.createImage
);

router.delete("/portfolio/:id", portfolioController.deletePortfolio);

router.post("/auctions", auctionController.create);
router.get("/auctions/:id", auctionController.getAuctionsByArtist);
router.get("/auctions/material", auctionController.searchMaterial); 
router.get("/auctions/active/:id", auctionController.getAuctionByCollectorId);

router.get("/auctions/archive/:id", auctionArchiveController.getAuctionArchiveByArtistId);

router.post("/rate/create", rateController.createRate);
router.get("/rates/:id", rateController.getRatesByAuction); 
router.post("/portfolio", portfolioController.addToPortfolio);

module.exports = router;
