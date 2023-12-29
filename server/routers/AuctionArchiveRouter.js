const express = require('express');
const router = express.Router();
const AuctionArchiveController = require('../controllers/AuctionArchiveController');

// Получение аукционов из архива
router.get('/auction-archive', async (req, res) => {
    const auctions = await AuctionArchiveController.getAuctionArchive();
    res.status(200).json(auctions);
  });
  
  // Автоматическое удаление строк из архива аукционов, если с момента его закрытия прошло больше 1 года
  router.delete('/auction-archive/auto-delete-expired', async (req, res) => {
    const deletedRows = await AuctionArchiveController.autoDeleteExpiredAuctions();
    res.status(200).json({ message: `Successfully deleted ${deletedRows} expired auctions from the archive` });
  });

  
  module.exports = router;
