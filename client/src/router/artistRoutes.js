import ArtistProfilePage from "../pages/Artist/ArtistProfilePage";
import CreateAuctionPage from "../pages/Artist/CreateAuctionPage";


export const artistRoutes = [
    {
        path: "/profile",
        Component: ArtistProfilePage,
    },
    {
        path: "/auction/create",
        Component: CreateAuctionPage,
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
        path: "/profile",
        Component: "Company profile",
    },
];