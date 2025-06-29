import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/root-layout';
import HomePage from "../pages/home/home";
import MoneyPage from "../pages/money/money";
import FeedPage from "../pages/feed/feed";
import MypagePage from "../pages/mypage/mypage";
import NotFoundPage from "../pages/notFound/notFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <NotFoundPage />
            },
            {
                path: "home",
                element: <HomePage />
            },
            {
                path: "money",
                element: <MoneyPage />
            },
            {
                path: "feed",
                element: <FeedPage />
            },
            {
                path: "mypage",
                element: <MypagePage />
            }
        ]
    }
]);

export default router;