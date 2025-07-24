import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/footer/footer';

const RootLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const showFooterPaths = ['/home', '/money', '/feed', '/mypage'];
  const shouldShowFooter =
    showFooterPaths.some(
      (path) => currentPath === path || currentPath.startsWith(path + '/')
    ) &&
    !currentPath.startsWith('/feed/post') &&
    !currentPath.startsWith('/mypage/badge');

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};
export default RootLayout;
