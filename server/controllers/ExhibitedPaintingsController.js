const { ExhibitedPaintings } = require('../models/ExhibitedPaintings');

class ExhibitedPaintingController {
  // Получение картин по ид выставки
  async getPaintingsByExhibition(exhibitionId) {
    try {
      const paintings = await ExhibitedPaintings.findAll({
        where: { exhibitions_id: exhibitionId },
      });

      return paintings;
    } catch (error) {
      console.error('Error retrieving paintings by exhibition:', error);
      throw error;
    }
  }

  // Добавление выставочных картин к заданному ид выставки
  async addPaintingsToExhibition(exhibitionId, paintingsData) {
    try {
      const paintings = await ExhibitedPaintings.bulkCreate(
        paintingsData.map(painting => ({ ...painting, exhibitions_id: exhibitionId }))
      );

      return paintings;
    } catch (error) {
      console.error('Error adding paintings to exhibition:', error);
      throw error;
    }
  }
}

module.exports = new ExhibitedPaintingController();
