import ArtistProfilePage from "../pages/Artist/ArtistProfilePage";
import CreateAuctionPage from "../pages/Artist/CreateAuctionPage";

export const artistRoutes = [
    {
        path: "/artist",
        Component: ArtistProfilePage,
    },
    {
        path: "/profile",
        Component: "HomePage",
    },
    {
        path: "/orders/create/:id",
        Component: "Order Creation Page",
    },
    {
        path: "/auction/create",
        Component: CreateAuctionPage,
    },
];