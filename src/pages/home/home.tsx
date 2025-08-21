import * as S from '../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/main/HomeHeader';
import ConsumptionWelcome from '../../components/home/main/consumptionWelcome';
import ConsumptionStatistics from '../../components/home/main/consumptionStatistics';
import ConsumptionRanking from '../../components/home/main/consumptionRanking';
import ConsumptionRoutine from '../../components/home/main/consumptionRoutine';
import { useNotifications } from '../../hooks/home/notify/useNotifications';

const Home = () => {
  const navigate = useNavigate();
  const { notifications } = useNotifications();

  const handleAlarmClick = () => {
    navigate('/notify');
  };

  const hasUnread = (notifications || []).some((n) => !n.isRead);

  return (
    <div className={S.Container}>
      <Header hasUnread={hasUnread} onAlarmClick={handleAlarmClick} />
      <div className={S.Section}>
        <ConsumptionWelcome />
        <ConsumptionStatistics />
        <ConsumptionRanking />
        <ConsumptionRoutine />
      </div>
    </div>
  );
};

export default Home;
