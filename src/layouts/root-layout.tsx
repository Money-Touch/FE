import { Outlet, useLocation } from "react-router-dom";
// import Header from "../components/header/header";
import Footer from "../components/footer/footer";

const RootLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // const showHeaderPaths = ["/signup"];
    // const shouldShowHeader = showHeaderPaths.includes(currentPath);

    const showFooterPaths = ["/home", "/money", "/feed", "/mypage"];
    const shouldShowFooter = showFooterPaths.some(path => currentPath.startsWith(path));

    return (
        <>
            {/* {shouldShowHeader && <Header />} */}
            <Outlet />
            {shouldShowFooter && <Footer />}
        </>
    );
};

export default RootLayout;
