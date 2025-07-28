import * as S from '../../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import illust from '../../../assets/images/home/illust.png';
import { mockUser } from '../../../mocks/home/mockUser'; // mock data

const ConsumptionWelcome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/record');
  };

  const user = mockUser.find((user) => user.id === 11);

  return (
    <div className={S.WelcomeContainer}>
      <div className={S.WhiteBackground} />

      <div className={S.WelcomeTopRow}>
        <div className={S.WelcomeTitle}>
          {user && (
            <p>
              안녕하세요, <span className={S.Username}>{user.username}</span>님.{' '}
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
