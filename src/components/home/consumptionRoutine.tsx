import * as S from '../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';

import more from '../../assets/images/home/more.png';
import rightArrow from '../../assets/images/home/rightArrow.png';

import { mockRoutineData } from '../../mocks/home/mockRoutineData'; // mock data
import { isToday } from '../../utils/home/todayCheck';

function ConsumptionRoutine() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/routine');
  };

  const sortedRoutineData = [...mockRoutineData].sort(
    (a, b) => b.views - a.views,
  );

  return (
    <S.RoutineContainer>
      <S.SectionHeader>
        <S.SectionTitle>소비 루틴 가져오기</S.SectionTitle>
        <S.MoreIcon src={more} alt="more" onClick={handleMoreClick} />
      </S.SectionHeader>
      <S.RoutineSection>
        {sortedRoutineData.map((routine) => (
          <S.RoutineCard
            key={routine.id}
            onClick={() => navigate(`/routine/${routine.id}`)}
          >
            <S.RoutineIcon src={routine.icon} alt="routine" />
            <S.RoutineText>
              {routine.title}
              {isToday(routine.startDate) && <S.NewBadge>NEW</S.NewBadge>}
            </S.RoutineText>
            <S.RoutineArrow src={rightArrow} alt="arrow" />
          </S.RoutineCard>
        ))}
      </S.RoutineSection>
    </S.RoutineContainer>
  );
}

export default ConsumptionRoutine;
