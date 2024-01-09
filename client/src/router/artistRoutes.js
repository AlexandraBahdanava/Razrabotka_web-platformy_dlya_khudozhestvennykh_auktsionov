import ArtistProfilePage from "../pages/Artist/ArtistProfilePage";
import CreateAuctionPage from "../pages/Artist/CreateAuctionPage";
import AuctionArtistPage from "../pages/Artist/AuctionArtistPage";

export const artistRoutes = [
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