import * as S from '../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/home/logo.png';
import Alarm from '../../assets/images/home/alarm.png';
import New from '../../assets/images/home/alarm_new.png';

import ConsumptionWelcome from '../../components/home/consumptionWelcome';
import ConsumptionStatistics from '../../components/home/consumptionStatistics';
import ConsumptionRanking from '../../components/home/consumptionRanking';
import ConsumptionRoutine from '../../components/home/consumptionRoutine';
import { useNotifications } from '../../hooks/home/useNotifications';

const Home = () => {
  const navigate = useNavigate();
  const { notifications } = useNotifications();

  const handleAlarmClick = () => {
    navigate('/notify');
  };

  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <S.Container>
      <S.Header>
        <S.LogoImg src={Logo} alt="logo" />
        <S.AlarmWrapper>
          <S.AlarmImg src={Alarm} alt="alarm" onClick={handleAlarmClick} />
          {hasUnread && <S.New src={New} alt="new" />}
        </S.AlarmWrapper>
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
