import CollectorProfilePage from "../pages/CollectorProfilePage";

export const collectorRoutes = [
    {
        path: "/collector",
        Component: CollectorProfilePage,
    },
    {
        path: "/orders/:id",
        Component: "Order details page",
    },
    {
        path: "/my-orders",
        Component: "My orders page",
    },
    {
        path: "/my-orders/:id",
        Component: "Order details page",
    },
    {
        path: "/company/:id",
        Component: "Company details page",
    },
    {
        path: "/profile",
        Component: "User profile",
    },
];