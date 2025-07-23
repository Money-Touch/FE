import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashLogo from '../../assets/images/splash/splashLogo.png';
import * as S from '../../styles/splash/splash.style';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="pageContainer splashBackground">
      <div className={S.LogoContainer}>
        <img src={SplashLogo} alt="splash" className={S.SplashImg} />
        <p className={S.SplashP}>Touch</p>
      </div>
    </div>
  );
};

export default Splash;
