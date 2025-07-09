import * as S from '../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import type { UserRoutine } from '../../types/home/routine';
import more from '../../assets/images/home/more.png';
import routine_t from '../../assets/images/home/routine_t.png';
import rightArrow from '../../assets/images/home/rightArrow.png';

function ConsumptionRoutine() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/routine');
  };

  // mock data
  const mockRoutineData: UserRoutine[] = [
    {
      id: 1,
      title: '50만원으로 한 달 살기 루틴',
      icon: routine_t,
      startDate: '2025-07-09',
      views: 300,
    },
    {
      id: 2,
      title: '배달 끊고 집밥 먹기 예산',
      icon: routine_t,
      startDate: '2025-07-09',
      views: 200,
    },
    {
      id: 3,
      title: '커피값을 아끼자',
      icon: routine_t,
      startDate: '2025-07-07',
      views: 100,
    },
    {
      id: 4,
      title: '쇼핑은 10만원만',
      icon: routine_t,
      startDate: '2025-07-06',
      views: 10,
    },
    {
      id: 5,
      title: '줄줄 새는 고정비 확인하기',
      icon: routine_t,
      startDate: '2025-07-01',
      views: 50,
    },
  ];

  const isToday = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
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
          <S.RoutineCard key={routine.id}>
            <S.RoutineIcon src={routine.icon} alt="routine" />
            <S.RoutineText>
              {routine.title}
              {isToday(routine.startDate) && <S.NewBadge>NEW</S.NewBadge>}
            </S.RoutineText>
            <S.RoutineArrow
              src={rightArrow}
              alt="arrow"
              onClick={() => navigate(`/routine/${routine.id}`)}
            />
          </S.RoutineCard>
        ))}
      </S.RoutineSection>
    </S.RoutineContainer>
  );
}

export default ConsumptionRoutine;
