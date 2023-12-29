const { FeaturedArtists } = require('../models/FeaturedArtists');

class FeaturedArtistController {
async  addFeaturedArtist(collectorId, artistId) {
  try {
    // Ищем запись в таблице FeaturedArtists с заданными collector_id и artist_id
    const [featuredArtist, created] = await FeaturedArtists.findOrCreate({
      where: {
        collector_id: collectorId,
        artist_id: artistId,
      },
    });

    // Возвращаем созданную запись и флаг, указывающий, была ли создана новая запись
    return { featuredArtist, created };
  } catch (error) {
    console.error('Error adding featured artist:', error);
    throw error;
  }
}

async removeFeaturedArtist(collectorId, artistId) {
    try {
      // Удаляем запись в таблице FeaturedArtists с заданными collector_id и artist_id
      const deletedCount = await FeaturedArtists.destroy({
        where: {
          collector_id: collectorId,
          artist_id: artistId,
        },
      });
  
      // Возвращаем количество удаленных записей
      return deletedCount;
    } catch (error) {
      console.error('Error removing featured artist:', error);
      throw error;
    }
  }
}
module.exports = new FeaturedArtistController();
