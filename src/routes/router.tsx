import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/root-layout';
import Splash from '../components/splash/splash';
import LoginPage from '../pages/auth/login/login';
import KakaoCallbackPage from '../pages/auth/login/kakaoCallback';
import SignupPage from '../pages/auth/signup/signup';
import TestPage from '../pages/auth/test/test';
import AddDayPage from '../pages/money/addday';
import HomePage from '../pages/home/home';
import RankingPage from '../pages/home/ranking';
import NotifyPage from '../pages/home/notify';
import MoneyPage from '../pages/money/money';
import BudgetRegisterPage from '../pages/money/registration';
import AddCategoryPage from '../pages/money/addcategory';
import FixedCostPage from '../pages/money/fixedcost';
import FeedPage from '../pages/feed/feed';
import MypagePage from '../pages/mypage/mypage';
import NotFoundPage from '../pages/notFound/notFound';
import RoutinePage from '../pages/money/routine';
import RoutineRegister from '../pages/money/routineregistration';
import MyRoutinePage from '../pages/money/myroutine';

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
        errorElement: <NotFoundPage />,
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
        path: 'ranking',
        element: <RankingPage />,
      },
      {
        path: 'notify',
        element: <NotifyPage />,
      },
      {
        path: 'money',
        element: <MoneyPage />,
      },
      {
        path: 'myroutine/:id',
        element: <MyRoutinePage />,
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
        path: 'routine',
        element: <RoutinePage />,
      },
      {
        path: 'routine-registration',
        element: <RoutineRegister />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'mypage',
        element: <MypagePage />,
      },
    ],
  },
]);

export default router;
