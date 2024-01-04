import ArtistProfilePage from "../pages/Artist/ArtistProfilePage";
import CreateAuctionPage from "../pages/Artist/CreateAuctionPage";


export const artistRoutes = [
    {
        path: "/artist",
        Component: ArtistProfilePage,
    },
    {
        path: "/artist/:id",
        Component: "User details page",
    },
    {
        path: "/orders/create",
        Component: "Order Creation Page",
    },
    {
        path: "auction/create",
        Component: CreateAuctionPage,
    },
];