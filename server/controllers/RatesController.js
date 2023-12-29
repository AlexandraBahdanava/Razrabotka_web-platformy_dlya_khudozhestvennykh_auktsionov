const { Rates } = require('../models/Rates');

class RateController {
async  addRate(auctionId, collectorId, betSize) {
  try {
    const rate = await Rates.create({
      auction_id: auctionId,
      collector_id: collectorId,
      bet_size: betSize,
    });

    return rate;
  } catch (error) {
    console.error('Error adding rate:', error);
    throw error;
  }
}
}

module.exports = new RateController();
