import HomePage from "../pages/HomePage";
import AuctionPage from "../pages/AuctionPage";

export const publicRoutes = [  
    {
        path: "/home",
        Component: HomePage,
    },
    {
        path: "/auction/one/:id", // Добавляем маршрут для страницы аукциона
        Component: AuctionPage,
      },
];