import ArtistProfilePage from "../pages/Artist/ArtistProfilePage";
import CreateAuctionPage from "../pages/Artist/CreateAuctionPage";
import AuctionArtistPage from "../pages/Artist/AuctionArtistPage";
import HomePage from "../pages/HomePage";

export const artistRoutes = [
    {
        path: "/home",
        Component: HomePage,
    },
    {
        path: "/artist",
        Component: ArtistProfilePage,
    },
    {
        path: "/auction",
        Component: AuctionArtistPage,
    },
    {
        path: "/auction/create",
        Component: CreateAuctionPage,
    },
];