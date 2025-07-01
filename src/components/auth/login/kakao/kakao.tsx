import * as L from "../../../../styles/auth/login/login";
import KakaoIcon from "../../../../assets/images/auth/login/kakaoIcon.png";
import { useEffect } from "react";
import { initKakao } from "../../../../utils/auth/login/kakao/initKakao";
import { getRedirectUri } from "../../../../utils/auth/login/kakao/getRedirectUri";

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
        <L.KakaoButton onClick={handleLogin}>
            <L.InnerContainer>
                <L.KakaoIconImg src={KakaoIcon} alt="kakao" />
                카카오 로그인
            </L.InnerContainer>
        </L.KakaoButton>
    )
}

export default Kakao;