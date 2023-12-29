const express = require('express');
const router = express.Router();
const ExhibitedPaintingController = require('../controllers/ExhibitedPaintingsController');

// Получение картин по ид выставки
router.get('/exhibitions-paintings/:exhibitionId/paintings', async (req, res) => {
  try {
    const exhibitionId = req.params.exhibitionId;
    const paintings = await ExhibitedPaintingController.getPaintingsByExhibition(exhibitionId);

    res.status(200).json(paintings);
  } catch (error) {
    console.error('Error getting paintings by exhibition:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Добавление выставочных картин к заданному ид выставки
router.post('/exhibitions-paintings/:exhibitionId/paintings', async (req, res) => {
  try {
    const exhibitionId = req.params.exhibitionId;
    const paintingsData = req.body;

    const addedPaintings = await ExhibitedPaintingController.addPaintingsToExhibition(exhibitionId, paintingsData);

    res.status(201).json({ message: 'Paintings added to exhibition successfully', paintings: addedPaintings });
  } catch (error) {
    console.error('Error adding paintings to exhibition:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
