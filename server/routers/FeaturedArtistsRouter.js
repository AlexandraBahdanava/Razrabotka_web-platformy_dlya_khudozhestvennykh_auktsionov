const express = require('express');
const router = express.Router();
const FeaturedArtistController = require('../controllers/FeaturedArtistsController');

// Добавление художника в избранные у коллекционера
router.post('/featured-artists', async (req, res) => {
  const { collectorId, artistId } = req.body;
  try {
    const result = await FeaturedArtistController.addFeaturedArtist(collectorId, artistId);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding featured artist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Удаление художника из избранных у коллекционера
router.delete('/featured-artists', async (req, res) => {
  const { collectorId, artistId } = req.body;
  try {
    const deletedCount = await FeaturedArtistController.removeFeaturedArtist(collectorId, artistId);
    res.status(200).json({ message: `Successfully removed ${deletedCount} featured artist(s)` });
  } catch (error) {
    console.error('Error removing featured artist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
