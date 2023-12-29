const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewsController');

// Добавление отзыва
router.post('/reviews', async (req, res) => {
  const { text, rating, artistId, collectorId } = req.body;
  try {
    const review = await ReviewController.addReview(text, rating, artistId, collectorId);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Получение отзывов по идентификатору художника
router.get('/reviews/artist/:artistId', async (req, res) => {
  const artistId = req.params.artistId;
  try {
    const reviews = await ReviewController.getReviewsByArtistId(artistId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews by artist id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
