import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/footer";

const RootLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const showFooterPaths = ["/home", "/money", "/feed", "/mypage"];
    const shouldShowFooter = showFooterPaths.some(path => currentPath.startsWith(path));

    return (
        <>
            <Outlet />
            {shouldShowFooter && <Footer />}
        </>
    );
};

export default RootLayout;
