const  AuctionArchive = require('../models/AuctionArchive');
const Artists = require('../models/Artists');
const { Op } = require('sequelize');
const moment = require('moment');

class auctionArchiveController {
// Получение аукционов из архива
async  getAuctionArchive() {
  try {
    const auctions = await AuctionArchive.findAll({
      include: [Artists],
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auction archive:', error);
    throw error;
  }
}

// Автоматическое удаление строк из архива аукционов, если с момента его закрытия прошло больше 1 года
async autoDeleteExpiredAuctions() {
  try {
    const oneYearAgo = moment().subtract(1, 'year').toDate();

    const deletedRows = await AuctionArchive.destroy({
      where: {
        closing_date: {
          [Op.lt]: oneYearAgo,
        },
      },
    });

    return deletedRows;
  } catch (error) {
    console.error('Error auto-deleting expired auctions:', error);
    throw error;
  }
}
}

module.exports = new auctionArchiveController();
