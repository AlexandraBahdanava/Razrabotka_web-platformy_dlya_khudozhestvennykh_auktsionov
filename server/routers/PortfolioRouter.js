const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/portfolioController');

// Добавление работы в портфолио
router.post('/portfolio', async (req, res) => {
  const { artistId, photo } = req.body;
  try {
    const portfolioItem = await PortfolioController.addToPortfolio(artistId, photo);
    res.status(201).json({ message: 'Successfully added to portfolio', portfolioItem });
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Получение портфолио по идентификатору художника
router.get('/portfolio/:artistId', async (req, res) => {
  const artistId = req.params.artistId;
  try {
    const portfolioItems = await PortfolioController.getPortfolioByArtistId(artistId);
    res.status(200).json(portfolioItems);
  } catch (error) {
    console.error('Error getting portfolio by artist id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
