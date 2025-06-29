import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/root-layout';
import Splash from '../components/splash/splash';
import LoginPage from "../pages/auth/login/login";

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
                element: <Splash />,
            },
            {
                path: "login",
                element: <LoginPage />
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