const express = require('express');
const router = express.Router();
const ExhibitionController = require('../controllers/ExhibitionsController');

// Получение всех выставок
router.get('/exhibitions', async (req, res) => {
  try {
    const exhibitions = await ExhibitionController.getAllExhibitions();
    res.status(200).json(exhibitions);
  } catch (error) {
    console.error('Error getting all exhibitions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Автоматическое удаление выставок после наступления даты окончания
router.delete('/exhibitions/auto-delete-expired', async (req, res) => {
  try {
    const deletedCount = await ExhibitionController.autoDeleteExpiredExhibitions();
    res.status(200).json({ message: `Successfully deleted ${deletedCount} expired exhibitions` });
  } catch (error) {
    console.error('Error auto-deleting expired exhibitions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Получение одной выставки по id
router.get('/exhibitions/:id', async (req, res) => {
  const exhibitionId = req.params.id;
  try {
    const exhibition = await ExhibitionController.getExhibitionById(exhibitionId);
    if (exhibition) {
      res.status(200).json(exhibition);
    } else {
      res.status(404).json({ error: 'Exhibition not found' });
    }
  } catch (error) {
    console.error('Error getting exhibition by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
