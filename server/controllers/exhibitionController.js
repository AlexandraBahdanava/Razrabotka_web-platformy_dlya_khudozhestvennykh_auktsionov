const { Exhibitions } = require('../models/Exhibitions');
const { ExhibitedPaintings } = require('../models/ExhibitedPaintings'); // Предположим, что у вас есть модели Exhibitions и ExhibitedPaintings

const moment = require('moment');

class ExhibitionController {
  // Получение всех выставок
  async getAllExhibitions() {
    try {
      const exhibitions = await Exhibitions.findAll();
      return exhibitions;
    } catch (error) {
      console.error('Error retrieving all exhibitions:', error);
      throw error;
    }
  }

  // Автоматическое удаление выставок после наступления даты окончания
  async  autoDeleteExpiredExhibitions() {
    const transaction = await sequelize.transaction();
  
    try {
      const now = moment();
  
      // Найти выставки, которые нужно удалить
      const expiredExhibitions = await Exhibitions.findAll({
        where: {
          expiration_date: {
            [Sequelize.Op.lt]: now,
          },
        },
      });
  
      // Удалить связанные выставочные картины
      for (const exhibition of expiredExhibitions) {
        await ExhibitedPaintings.destroy({
          where: {
            artist_id: exhibition.artist_id,
            exhibitions_id: exhibition.id,
          },
          transaction,
        });
      }
  
      // Удалить сами выставки
      await Exhibitions.destroy({
        where: {
          expiration_date: {
            [Sequelize.Op.lt]: now,
          },
        },
        transaction,
      });
  
      // Зафиксировать изменения, если все успешно
      await transaction.commit();
  
      return expiredExhibitions.length; // Вернуть количество удаленных выставок
    } catch (error) {
      // Откатить транзакцию в случае ошибки
      await transaction.rollback();
      console.error('Error auto-deleting expired exhibitions:', error);
      throw error;
    }
  }

  // Получение одной выставки по id
  async getExhibitionById(exhibitionId) {
    try {
      const exhibition = await Exhibitions.findByPk(exhibitionId);
      return exhibition;
    } catch (error) {
      console.error('Error retrieving exhibition by id:', error);
      throw error;
    }
  }
}

module.exports = new ExhibitionController();
