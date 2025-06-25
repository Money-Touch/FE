import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/root-layout';
import HomePage from "../pages/home/home";
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
        ]
    }
]);

export default router;