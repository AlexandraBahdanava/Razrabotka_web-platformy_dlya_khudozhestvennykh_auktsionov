import ArtistProfilePage from "../pages/Artist/ArtistProfilePage";
import CreateAuctionPage from "../pages/Artist/CreateAuctionPage";
import AuctionArtistPage from "../pages/Artist/AuctionArtistPage";
import HomePage from "../pages/HomePage";
import AuctionPage from "../pages/AuctionPage";

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
    {
        path: "/auction/one/:id", // Добавляем маршрут для страницы аукциона
        Component: AuctionPage,
      },
];