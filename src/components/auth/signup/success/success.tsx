import * as S from '../../../../styles/auth/signup/signup.style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessIcon from '../../../../assets/images/auth/signup/successIcon.png';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/test');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <S.AgreeContainer>
      <S.SuccessMainP>
        이메일 계정으로
        <br />
        회원가입이 완료되었어요!
      </S.SuccessMainP>

      <S.SuccessImg src={SuccessIcon} alt="success" />
    </S.AgreeContainer>
  );
};

export default Success;
