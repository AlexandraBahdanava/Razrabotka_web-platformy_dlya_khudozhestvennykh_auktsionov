const { Artist, Auction, Collector, AuctionArchive, Rate} = require("../database/models");

class AuctionController {

    async  getAuctionByCollectorId(collectorId) {
        try {
          const auction = await Auction.findAll({
            include: [
              {
                model: Rate,
                where: { collector_id: collectorId },
                required: true,
              },
            ],
          });
      
          return auction;
        } catch (error) {
          console.error('Error retrieving auctions by collector id:', error);
          throw error;
        }
      }
      
      async  delete(auctionId) {
        const transaction = await sequelize.transaction();
      
        try {
          // Удаление ставок по аукциону
          await Rates.destroy({
            where: { auction_id: auctionId },
            transaction,
          });
      
          // Удаление самого аукциона
          await Auction.destroy({
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
          const auction = await Auction.findAll({
            where: { genre: genre },
          });
      
          return auction;
        } catch (error) {
          console.error('Error retrieving auctions by genre:', error);
          throw error;
        }
      }
      
      // Получение аукционов по цвету
      async  getAuctionsByColor(color) {
        try {
          const auction = await Auction.findAll({
            where: { color: color },
          });
      
          return auction;
        } catch (error) {
          console.error('Error retrieving auctions by color:', error);
          throw error;
        }
      }
      
      // Получение всех аукционов
      async  getAll() {
        try {
          const auction = await Auction.findAll();
      
          return auction;
        } catch (error) {
          console.error('Error retrieving all auctions:', error);
          throw error;
        }
      }
      
      // Получение аукционов по тегу
      async  getAuctionsByTag(tag) {
        try {
          const auction = await Auction.findAll({
            where: {
              tags: {
                [Sequelize.Op.contains]: [tag],
              },
            },
          });
      
          return auction;
        } catch (error) {
          console.error('Error retrieving auctions by tag:', error);
          throw error;
        }
      }
      
      // Получение аукциона по заголовку
      async  getAuctionByTitle(title) {
        try {
          const auction = await Auction.findOne({
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
          const auction = await Auction.findAll({
            order: [['starting_price', order]],
          });
      
          return auction;
        } catch (error) {
          console.error('Error retrieving auctions by price order:', error);
          throw error;
        }
      }
      
      // Сортировка аукционов по длительности
      async  getAuctionsByDurationOrder(order = 'ASC') {
        try {
          const auction = await Auction.findAll({
            order: [['duration', order]],
          });
      
          return auction;
        } catch (error) {
          console.error('Error retrieving auctions by duration order:', error);
          throw error;
        }
      }

      // Создание аукциона
      async create(req, res) {
        try {
            const auction = { ...req.body };

            if (!auction.title) {
              auction.title = "Без названия";
          }
          const artistId = req.artistId;
          console.log(artistId);
          console.log(req.body);

            
            const createdAuction = await Auction.create(auction);
    
            await createdAuction.setArtist(artistId);

            return res.status(201).json(createdAuction);
        } catch (err) {
            return res.sendStatus(500);
        }
    }
    
      // Перемещение аукционов в таблицу архива после окончания
      async  moveAuctionsToArchive() {
        try {
          const now = moment();
      
          const endedAuction = await Auction.findAll({
            where: {
              closing_date: {
                [Sequelize.Op.lt]: now,
              },
            },
          });
      
          if (endedAuction.length > 0) {
            await AuctionArchive.bulkCreate(endedAuction.map(auction => ({ ...auction.toJSON(), id: null })));
            await Auction.destroy({
              where: {
                id: {
                  [Sequelize.Op.in]: endedAuction.map(auction => auction.id),
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
      async getAuctionsByArtist(req,res) {
        const artistId = req.artistId;
        try {
          const auction = await Auction.findAll({
            where: { ArtistId: artistId },
            include: [
              {
                model: Artist,
                where: { id: artistId },
               
              },
           
          ]

          });
          
          return res.json(auction);
        } catch (error) {
          console.error('Error retrieving auctions by artist:', error);
          throw error;
        }
      }
      
      // Получение аукциона по id
      async getAuctionById(auctionId) {
        try {
          const auction = await Auction.findByPk(auctionId);
      
          return auction;
        } catch (error) {
          console.error('Error retrieving auction by id:', error);
          throw error;
        }
      }
      
      }
      module.exports = new AuctionController();