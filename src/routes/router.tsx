import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/root-layout';
import ProtectedRoute from './protectedRoute';

import Splash from '../components/splash/splash';
import LoginPage from '../pages/auth/login/login';
import KakaoCallbackPage from '../pages/auth/login/kakaoCallback';
import SignupPage from '../pages/auth/signup/signup';
import TestPage from '../pages/auth/test/test';

import HomePage from '../pages/home/home';
import NotifyPage from '../pages/home/notify';
import RecordPage from '../pages/home/record';
import RankingPage from '../pages/home/ranking';
import HomeRoutinePage from '../pages/home/routine';
import RoutineDetailPage from '../pages/home/routinedetail';

import MoneyPage from '../pages/money/money';
import AddDayPage from '../pages/money/addday';
import FixedCostPage from '../pages/money/fixedcost';
import BudgetRegisterPage from '../pages/money/registration';
import AddCategoryPage from '../pages/money/addcategory';

import FeedPage from '../pages/feed/feed';
import FeedDetailPage from '../pages/feed/feedDetail';

import MypagePage from '../pages/auth/mypage/mypage';
import MyfeedPage from '../pages/auth/mypage/myfeed';
import MybadgePage from '../pages/auth/mypage/mybadge';

import NotFoundPage from '../pages/notFound/notFound';
import MoneyRoutinePage from '../pages/money/routine';
import RoutineRegister from '../pages/money/routineregistration';
import MyRoutinePage from '../pages/money/myroutine';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Splash /> },
      {
        path: 'login',
        children: [
          { index: true, element: <LoginPage /> },
          { path: 'auth', element: <KakaoCallbackPage /> },
        ],
      },
      { path: 'signup', element: <SignupPage /> },
      { path: 'test', element: <TestPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: 'home', element: <HomePage /> },
          { path: 'notify', element: <NotifyPage /> },
          { path: 'record', element: <RecordPage /> },
          { path: 'ranking', element: <RankingPage /> },
          {
            path: 'routine',
            children: [
              { index: true, element: <HomeRoutinePage /> },
              { path: ':id', element: <RoutineDetailPage /> },
            ],
          },

          { path: 'money', element: <MoneyPage /> },
          { path: 'add-day', element: <AddDayPage /> },
          { path: 'fixed-cost', element: <FixedCostPage /> },
          { path: 'budget-register', element: <BudgetRegisterPage /> },
          { path: 'add-category', element: <AddCategoryPage /> },
          { path: 'myroutine/:id', element: <MyRoutinePage /> },
          { path: 'routine-registration', element: <RoutineRegister /> },
          { path: 'money-routine', element: <MoneyRoutinePage /> },

          {
            path: 'feed',
            children: [
              { index: true, element: <FeedPage /> },
              { path: 'post/:postId', element: <FeedDetailPage /> },
            ],
          },
          {
            path: 'mypage',
            children: [
              { index: true, element: <MypagePage /> },
              { path: 'feed', element: <MyfeedPage /> },
              { path: 'badge', element: <MybadgePage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
