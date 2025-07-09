import * as S from '../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/home/logo.png';
import Alarm from '../../assets/images/home/alarm.png';

import ConsumptionWelcome from '../../components/home/consumptionWelcome';
import ConsumptionStatistics from '../../components/home/consumptionStatistics';
import ConsumptionRanking from '../../components/home/consumptionRanking';
import ConsumptionRoutine from '../../components/home/consumptionRoutine';

const Home = () => {
  const navigate = useNavigate();

  const handleAlarmClick = () => {
    navigate('/alerts');
  };

  return (
    <S.Container>
      <S.Header>
        <S.LogoImg src={Logo} alt="logo" />
        <S.AlarmImg src={Alarm} alt="alarm" onClick={handleAlarmClick} />
      </S.Header>
      <S.Section>
        <ConsumptionWelcome />
        <ConsumptionStatistics />
        <ConsumptionRanking />
        <ConsumptionRoutine />
      </S.Section>
    </S.Container>
  );
};

export default Home;
