import ArtistProfilePage from "../pages/ArtistProfilePage";

export const artistRoutes = [
    {
        path: "/profile",
        Component: ArtistProfilePage,
    },
    {
        path: "/artist/:id",
        Component: "Order details page",
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