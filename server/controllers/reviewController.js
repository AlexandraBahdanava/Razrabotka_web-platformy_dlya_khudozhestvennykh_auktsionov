const { Reviews } = require('../models/Reviews');

class ReviewController {
async  addReview(text, rating, artistId, collectorId) {
  try {
    const review = await Reviews.create({
      text: text,
      rating: rating,
      artist_id: artistId,
      collector_id: collectorId,
    });

    return review;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}

async  getReviewsByArtistId(artistId) {
    try {
      const reviews = await Reviews.findAll({
        where: { artist_id: artistId },
      });
  
      return reviews;
    } catch (error) {
      console.error('Error retrieving reviews by artist id:', error);
      throw error;
    }
  }
}

module.exports = new ReviewController();
