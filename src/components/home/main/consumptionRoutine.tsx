import * as S from '../../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import more from '../../../assets/images/home/more.png';
import rightArrow from '../../../assets/images/home/rightArrow.png';
import { isToday } from '../../../utils/home/todayCheck';
import { mockRoutineData } from '../../../mocks/home/mockRoutineData'; // mock data

function ConsumptionRoutine() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/routine');
  };

  const sortedRoutineData = [...mockRoutineData].sort(
    (a, b) => b.views - a.views,
  );

  return (
    <div className={S.RoutineContainer}>
      <div className={S.SectionHeader}>
        <h2 className={S.SectionTitle}>소비 루틴 가져오기</h2>
        <img
          src={more}
          alt="more"
          onClick={handleMoreClick}
          className={S.MoreIcon + ' cursor-pointer'}
        />
      </div>
      <div className={S.RoutineSection}>
        {sortedRoutineData.map((routine) => (
          <div
            key={routine.id}
            className={S.RoutineCard + ' cursor-pointer'}
            onClick={() => navigate(`/routine/${routine.id}`)}
          >
            <img src={routine.icon} alt="routine" className={S.RoutineIcon} />
            <div className={S.RoutineText}>
              {routine.title}
              {isToday(routine.startDate) && (
                <span className={S.NewBadge}>NEW</span>
              )}
            </div>
            <img src={rightArrow} alt="arrow" className={S.RoutineArrow} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConsumptionRoutine;
