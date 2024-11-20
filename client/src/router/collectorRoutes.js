import HomePage from "../pages/HomePage";
import ActiveAuctionPage from "../pages/Collector/ActiveAuctionPage";
import FeaturedArtistsPage from "../pages/Collector/FeaturedArtistsPage";
import AuctionPage from "../pages/AuctionPage";

export const collectorRoutes = [
    {
        path: "/favorites",
        Component: FeaturedArtistsPage,
    },
    {
        path: "/home",
        Component: HomePage,
    },
    {
        path: "/auction",
        Component: ActiveAuctionPage,
    },
    {
        path: "/auction/one/:id", // Добавляем маршрут для страницы аукциона
        Component: AuctionPage,
      },
   
];