import ArtistProfilePage from "../pages/Artist/ArtistProfilePage";
import CreateAuctionPage from "../pages/Artist/CreateAuctionPage";
import AuctionPage from "../pages/Artist/AuctionPage";

export const artistRoutes = [
    {
        path: "/artist",
        Component: ArtistProfilePage,
    },
    {
        path: "/auction",
        Component: AuctionPage,
    },
    {
        path: "/auction/create",
        Component: CreateAuctionPage,
    },
];