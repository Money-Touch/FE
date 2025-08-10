import * as S from '../../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import more from '../../../assets/images/home/more.png';
import rightArrow from '../../../assets/images/home/rightArrow.png';
import routine_t from '../../../assets/images/home/routine_t.png';
import { useRoutinePreview } from '../../../hooks/home/routine/useRoutinePreview';

function ConsumptionRoutine() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useRoutinePreview();
  const handleMoreClick = () => {
    navigate('/routine');
  };

  if (isLoading) return null;
  if (isError || !data) return null;

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
        {data.result.map((routine) => (
          <div
            key={routine.routineId}
            className={S.RoutineCard + ' cursor-pointer'}
            onClick={() => navigate(`/routine/${routine.routineId}`)}
          >
            <img src={routine_t} alt="routine" className={S.RoutineIcon} />
            <div className={S.RoutineText}>
              {routine.routineName}
              {routine.new && <span className={S.NewBadge}>NEW</span>}
            </div>
            <img src={rightArrow} alt="arrow" className={S.RoutineArrow} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConsumptionRoutine;
