import HomePage from "../pages/Collector/HomePage";
import ActiveAuctionPage from "../pages/Collector/ActiveAuctionPage";
import AuctionPage from "../pages/AuctionPage";

export const collectorRoutes = [
    {
        path: "/collector",
        Component: HomePage,
    },
    {
        path: "/artist/select",
        Component: "Order details page",
    },
    {
        path: "/auction",
        Component: ActiveAuctionPage,
    },
    {
        path:"/auction/one/:id",
        Component: AuctionPage,
    },
];