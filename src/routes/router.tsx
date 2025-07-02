import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/root-layout';
import Splash from '../components/splash/splash';
import LoginPage from "../pages/auth/login/login";
import KakaoCallbackPage from '../pages/auth/login/kakaoCallback';
import SignupPage from '../pages/auth/signup/signup';
import TestPage from "../pages/auth/test/test";

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
                errorElement: <NotFoundPage />,
                children: [
                {
                    index: true,
                    element: <LoginPage />,
                },
                {
                    path: "auth",
                    element: <KakaoCallbackPage />,
                },
                ],
            },
            {
                path: "signup",
                element: <SignupPage /> 
            },
            {
                path: "test",
                element: <TestPage />
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