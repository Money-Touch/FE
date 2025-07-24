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
    <div className={S.AgreeContainer}>
      <p className={S.SuccessMainP}>
        이메일 계정으로
        <br />
        회원가입이 완료되었어요!
      </p>

      <img className={S.SuccessImg} src={SuccessIcon} alt="success" />
      <p className={S.SuccessSubP}>3초 뒤에 온보딩 화면으로 이동합니다.</p>
    </div>
  );
};

export default Success;
