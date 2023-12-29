const express = require('express');
const router = express.Router();
const RateController = require('../controllers/RatesController');

// Добавление ставки на аукцион
router.post('/rates', async (req, res) => {
  const { auctionId, collectorId, betSize } = req.body;
  try {
    const rate = await RateController.addRate(auctionId, collectorId, betSize);
    res.status(201).json(rate);
  } catch (error) {
    console.error('Error adding rate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
