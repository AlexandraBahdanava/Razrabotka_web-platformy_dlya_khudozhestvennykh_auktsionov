const { Auctions } = require('../models/Auctions'); // Предположим, что вы импортировали модель Auctions из соответствующего файла
const {AuctionArchive } =require('../models/AuctionArchive');
const {Rates } =require('../models/Rates');
const moment = require('moment');

class auctionController {
async  getAuctionsByCollectorId(collectorId) {
  try {
    const auctions = await Auctions.findAll({
      include: [
        {
          model: Rates,
          where: { collector_id: collectorId },
          required: true,
        },
      ],
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auctions by collector id:', error);
    throw error;
  }
}

async  deleteAuctionWithRates(auctionId) {
  const transaction = await sequelize.transaction();

  try {
    // Удаление ставок по аукциону
    await Rates.destroy({
      where: { auction_id: auctionId },
      transaction,
    });

    // Удаление самого аукциона
    await Auctions.destroy({
      where: { id: auctionId },
      transaction,
    });

    // Фиксация транзакции
    await transaction.commit();

    console.log(`Auction with id ${auctionId} and related rates deleted successfully.`);

  } catch (error) {
    // Откат транзакции в случае ошибки
    await transaction.rollback();
    console.error('Error deleting auction with rates:', error);
    throw error;
  }
}


// Получение аукционов по жанру
async  getAuctionsByGenre(genre) {
  try {
    const auctions = await Auctions.findAll({
      where: { genre: genre },
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auctions by genre:', error);
    throw error;
  }
}

// Получение аукционов по цвету
async  getAuctionsByColor(color) {
  try {
    const auctions = await Auctions.findAll({
      where: { color: color },
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auctions by color:', error);
    throw error;
  }
}

// Получение всех аукционов
async  getAllAuctions() {
  try {
    const auctions = await Auctions.findAll();

    return auctions;
  } catch (error) {
    console.error('Error retrieving all auctions:', error);
    throw error;
  }
}

// Получение аукционов по тегу
async  getAuctionsByTag(tag) {
  try {
    const auctions = await Auctions.findAll({
      where: {
        tags: {
          [Sequelize.Op.contains]: [tag],
        },
      },
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auctions by tag:', error);
    throw error;
  }
}

// Получение аукциона по заголовку
async  getAuctionByTitle(title) {
  try {
    const auction = await Auctions.findOne({
      where: { title: title },
    });

    return auction;
  } catch (error) {
    console.error('Error retrieving auction by title:', error);
    throw error;
  }
}

// Сортировка аукционов по цене
async  getAuctionsByPriceOrder(order = 'ASC') {
  try {
    const auctions = await Auctions.findAll({
      order: [['starting_price', order]],
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auctions by price order:', error);
    throw error;
  }
}

// Сортировка аукционов по длительности
async  getAuctionsByDurationOrder(order = 'ASC') {
  try {
    const auctions = await Auctions.findAll({
      order: [['duration', order]],
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auctions by duration order:', error);
    throw error;
  }
}

// Создание аукциона
async  createAuction(auctionData) {
  try {
    const newAuction = await Auctions.create(auctionData);
    return newAuction;
  } catch (error) {
    console.error('Error creating auction:', error);
    throw error;
  }
}

// Перемещение аукционов в таблицу архива после окончания
async  moveAuctionsToArchive() {
  try {
    const now = moment();

    const endedAuctions = await Auctions.findAll({
      where: {
        closing_date: {
          [Sequelize.Op.lt]: now,
        },
      },
    });

    if (endedAuctions.length > 0) {
      await AuctionArchive.bulkCreate(endedAuctions.map(auction => ({ ...auction.toJSON(), id: null })));
      await Auctions.destroy({
        where: {
          id: {
            [Sequelize.Op.in]: endedAuctions.map(auction => auction.id),
          },
        },
      });
    }
  } catch (error) {
    console.error('Error moving auctions to archive:', error);
    throw error;
  }
}

// Получение аукционов художника
async getAuctionsByArtist(artistId) {
  try {
    const auctions = await Auctions.findAll({
      where: { artist_id: artistId },
    });

    return auctions;
  } catch (error) {
    console.error('Error retrieving auctions by artist:', error);
    throw error;
  }
}

// Получение аукциона по id
async getAuctionById(auctionId) {
  try {
    const auction = await Auctions.findByPk(auctionId);

    return auction;
  } catch (error) {
    console.error('Error retrieving auction by id:', error);
    throw error;
  }
}

}
module.exports = new auctionController();
