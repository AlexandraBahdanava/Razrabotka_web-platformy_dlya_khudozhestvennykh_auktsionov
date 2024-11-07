import HomePage from "../pages/HomePage";
import ActiveAuctionPage from "../pages/Collector/ActiveAuctionPage";
import FeaturedArtistsPage from "../pages/Collector/FeaturedArtistsPage";

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
   
];