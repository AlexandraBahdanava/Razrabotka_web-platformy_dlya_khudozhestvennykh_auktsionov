const express = require('express');
const router = express.Router();
const AuctionsController = require('../controllers/AuctionsController');

// Получение аукционов художника
router.get('/auctions/artist/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    const auctions = await AuctionsController.getAuctionsByArtist(artistId);
    res.status(200).json(auctions);
  });
  
  // Получение аукционов по жанру
  router.get('/auctions/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    const auctions = await AuctionsController.getAuctionsByGenre(genre);
    res.status(200).json(auctions);
  });
  
  // Получение аукционов по цвету
  router.get('/auctions/color/:color', async (req, res) => {
    const color = req.params.color;
    const auctions = await AuctionsController.getAuctionsByColor(color);
    res.status(200).json(auctions);
  });
  
  // Получение всех аукционов
  router.get('/auctions', async (req, res) => {
    const auctions = await AuctionsController.getAllAuctions();
    res.status(200).json(auctions);
  });
  
  // Получение аукционов по тегу
  router.get('/auctions/tag/:tag', async (req, res) => {
    const tag = req.params.tag;
    const auctions = await AuctionsController.getAuctionsByTag(tag);
    res.status(200).json(auctions);
  });
  
  // Получение аукциона по заголовку
  router.get('/auctions/title/:title', async (req, res) => {
    const title = req.params.title;
    const auction = await AuctionsController.getAuctionByTitle(title);
    res.status(200).json(auction);
  });
  
  // Сортировка аукционов по цене
  router.get('/auctions/sort/price/:order', async (req, res) => {
    const order = req.params.order.toUpperCase();
    const auctions = await AuctionsController.getAuctionsByPriceOrder(order);
    res.status(200).json(auctions);
  });
  
  // Сортировка аукционов по длительности
  router.get('/auctions/sort/duration/:order', async (req, res) => {
    const order = req.params.order.toUpperCase();
    const auctions = await AuctionsController.getAuctionsByDurationOrder(order);
    res.status(200).json(auctions);
  });
  
  // Создание аукциона
  router.post('/auctions', async (req, res) => {
    const auctionData = req.body;
    const newAuction = await AuctionsController.createAuction(auctionData);
    res.status(201).json(newAuction);
  });
  
  // Перемещение аукционов в архив после окончания
  router.post('/auctions/move-to-archive', async (req, res) => {
    await AuctionsController.moveAuctionsToArchive();
    res.status(200).json({ message: 'Auctions moved to archive successfully' });
  });

 // Получение аукциона по id
router.get('/auctions/:auctionId', async (req, res) => {
    const auctionId = req.params.auctionId;
    const auction = await AuctionsController.getAuctionById(auctionId);
    res.status(200).json(auction);
  });
  
  // Удаление аукциона с учетом ставок
  router.delete('/auctions/:auctionId', async (req, res) => {
    const auctionId = req.params.auctionId;
    await AuctionsController.deleteAuctionWithRates(auctionId);
    res.status(200).json({ message: 'Auction and related rates deleted successfully' });
  });
  
module.exports = router;
  