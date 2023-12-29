const { Portfolio } = require('../models/Portfolio');

class PortfolioController {
async  addToPortfolio(artistId, photo) {
  try {
    const portfolioItem = await Portfolio.create({
      artist_id: artistId,
      photo: photo,
    });

    return portfolioItem;
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    throw error;
  }
}

async  getPortfolioByArtistId(artistId) {
  try {
    const portfolioItems = await Portfolio.findAll({
      where: {
        artist_id: artistId,
      },
    });

    return portfolioItems;
  } catch (error) {
    console.error('Error getting portfolio by artist id:', error);
    throw error;
  }
}
}
module.exports = new PortfolioController();

