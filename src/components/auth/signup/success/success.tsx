import * as S from "../../../../styles/auth/signup/signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/test");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <S.AgreeContainer>
            <S.SuccessImg />

            <S.SuccessMainP>
                이메일 계정으로<br/>
                회원가입이 완료되었어요!
            </S.SuccessMainP>

            <S.SuccessSubP>3초 뒤에 온보딩 화면으로 이동합니다.</S.SuccessSubP>
        </S.AgreeContainer>
    )
}

export default Success;