import * as S from "../../styles/home/home.style";
import { useNavigate } from "react-router-dom";

type ConsumptionWelcomeProps = {
  username: string;
};

const ConsumptionWelcome = ({ username }: ConsumptionWelcomeProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/record");
  };

  return (
    <S.WelcomeContainer>
      <S.WelcomeTitle>
        <p>
          안녕하세요, {username}님. <br />
          오늘의 소비 계획은 세우셨나요?
        </p>
      </S.WelcomeTitle>
      <S.IllustrationBox>일러스트</S.IllustrationBox>
      <S.RecordButton onClick={handleClick}>
        <p>오늘의 소비 기록하러 가기</p>
      </S.RecordButton>
    </S.WelcomeContainer>
  );
};

export default ConsumptionWelcome;
