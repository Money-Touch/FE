import * as S from '../../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import illust from '../../../assets/images/home/illust.png';
import { useMypageQuery } from '../../../hooks/auth/mypage/useMypageQuery';

const ConsumptionWelcome = () => {
  const navigate = useNavigate();
  const { data } = useMypageQuery();

  const handleClick = () => {
    navigate('/record');
  };

  return (
    <div className={S.WelcomeContainer}>
      <div className={S.WhiteBackground} />

      <div className={S.WelcomeTopRow}>
        <div className={S.WelcomeTitle}>
          {data && (
            <p>
              안녕하세요,{' '}
              <span className={S.Username}>{data?.result?.nickname}</span>님.{' '}
              <br />
              오늘의 소비 계획은 세우셨나요?
            </p>
          )}
        </div>
        <img src={illust} alt="illustration" className={S.IllustrationBox} />
      </div>

      <button className={S.RecordButton} onClick={handleClick}>
        <p className={S.RecordButtonText}>오늘의 소비 기록하러 가기</p>
      </button>
    </div>
  );
};

export default ConsumptionWelcome;
