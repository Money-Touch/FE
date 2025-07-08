import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashLogo from '../../assets/images/splash/splashLogo.png';
import * as S from '../../styles/splash/splash';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <S.SplashContainer className="pageContainer">
      <S.LogoContainer>
        <S.SplashImg src={SplashLogo} alt="splash" />
        <S.SplashP>Touch</S.SplashP>
      </S.LogoContainer>
    </S.SplashContainer>
  );
};

export default Splash;
