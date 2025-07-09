import * as S from '../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import illust from '../../assets/images/home/illust.png';
import { mockUser } from '../../mocks/home/mockUser'; // mock data

const ConsumptionWelcome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/record');
  };

  return (
    <S.WelcomeContainer>
      <S.WhiteBackground />

      <S.WelcomeTopRow>
        <S.WelcomeTitle>
          <p>
            안녕하세요, <S.Username>{mockUser.username}</S.Username>님. <br />
            오늘의 소비 계획은 세우셨나요?
          </p>
        </S.WelcomeTitle>
        <S.IllustrationBox src={illust} />
      </S.WelcomeTopRow>
      <S.RecordButton onClick={handleClick}>
        <p>오늘의 소비 기록하러 가기</p>
      </S.RecordButton>
    </S.WelcomeContainer>
  );
};

export default ConsumptionWelcome;
