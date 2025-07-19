import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/root-layout';
import Splash from '../components/splash/splash';
import LoginPage from '../pages/auth/login/login';
import KakaoCallbackPage from '../pages/auth/login/kakaoCallback';
import SignupPage from '../pages/auth/signup/signup';
import TestPage from '../pages/auth/test/test';

import HomePage from '../pages/home/home';
import NotifyPage from '../pages/home/notify';
import RecordPage from '../pages/home/record';
import RankingPage from '../pages/home/ranking';
import RoutinePage from '../pages/home/routine';
import RoutineDetailPage from '../pages/home/routinedetail';

import MoneyPage from '../pages/money/money';
import AddDayPage from '../pages/money/addday';
import FixedCostPage from '../pages/money/fixedcost';
import BudgetRegisterPage from '../pages/money/registration';
import AddCategoryPage from '../pages/money/addcategory';

import FeedPage from '../pages/feed/feed';

import MypagePage from '../pages/auth/mypage/mypage';
import MyfeedPage from '../pages/auth/mypage/myfeed';
import MybadgePage from '../pages/auth/mypage/mybadge';

import NotFoundPage from '../pages/notFound/notFound';

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
        path: 'login',
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: 'auth',
            element: <KakaoCallbackPage />,
          },
        ],
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'test',
        element: <TestPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'notify',
        element: <NotifyPage />,
      },
      {
        path: 'record',
        element: <RecordPage />,
      },
      {
        path: 'ranking',
        element: <RankingPage />,
      },
      {
        path: 'routine',
        element: <RoutinePage />,
      },
      {
        path: '/routine/:id',
        element: <RoutineDetailPage />,
      },
      {
        path: 'money',
        element: <MoneyPage />,
      },
      {
        path: 'add-day',
        element: <AddDayPage />,
      },
      {
        path: 'fixed-cost',
        element: <FixedCostPage />,
      },
      {
        path: 'budget-register',
        element: <BudgetRegisterPage />,
      },
      {
        path: 'add-category',
        element: <AddCategoryPage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'mypage',
        children: [
          {
            index: true,
            element: <MypagePage />,
          },
          {
            path: 'feed',
            element: <MyfeedPage />,
          },
          {
            path: 'badge',
            element: <MybadgePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
