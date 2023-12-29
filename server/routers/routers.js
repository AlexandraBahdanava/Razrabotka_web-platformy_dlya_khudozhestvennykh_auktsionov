const express = require('express');
const router = express.Router();

const artistsRoutes = require('./ArtistsRouter'); // Подключите файлы роутов для художника
const auctionArchiveRoutes = require('./AuctionArchiveRouter'); 
const austionsRoutes = require('./AuctionsRouter'); 
const collectorsRoutes = require('./CollectorsRouter'); 
const exhibitedPaintingsRoutes = require('./ExhibitedPaintingsRouter'); // Подключите файлы роутов для художника
const exhibitionsRoutes = require('./ExhibitionsRouter'); 
const featuredArtistsRoutes = require('./FeaturedArtistsRouter'); 
const portfolioRoutes = require('./PortfolioRouter'); 
const ratesRoutes = require('./RatesRouter'); 
const reviewsRoutes = require('./ReviewsRouter'); 

router.use('/artists', artistsRoutes);
router.use('/auction-archive', auctionArchiveRoutes);
router.use('/auctions', austionsRoutes);
router.use('/collector', collectorsRoutes);
router.use('/exhibitions-paintings', exhibitedPaintingsRoutes);
router.use('/exhibitions', exhibitionsRoutes);
router.use('/featured-artists', featuredArtistsRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/rates', ratesRoutes);
router.use('/reviews', reviewsRoutes);

module.exports = router;
