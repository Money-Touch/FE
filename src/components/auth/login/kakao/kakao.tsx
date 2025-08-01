import * as L from '../../../../styles/auth/login/login.style';
import KakaoIcon from '../../../../assets/images/auth/login/kakaoIcon.png';
import { useEffect } from 'react';
import { initKakao } from '../../../../utils/auth/login/kakao/initKakao';
import { getRedirectUri } from '../../../../utils/auth/login/kakao/getRedirectUri';

const Kakao = () => {
  useEffect(() => {
    initKakao();
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: getRedirectUri(),
    });
  };

  return (
    <button className={L.KakaoButton} onClick={handleLogin}>
      <div className={L.InnerContainer}>
        <img className={L.KakaoIconImg} src={KakaoIcon} alt="kakao" />
        카카오 로그인
      </div>
    </button>
  );
};

export default Kakao;
