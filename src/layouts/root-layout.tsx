import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/footer";

const RootLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const showFooterPaths = ["/home", "/money", "/feed", "/mypage"];
  const shouldShowFooter = showFooterPaths.some((path) =>
    currentPath.startsWith(path)
  );

  return (
    <div
      className="pageContainer"
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </div>

      {shouldShowFooter && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Footer />
        </div>
      )}
    </div>
  );
};

export default RootLayout;
