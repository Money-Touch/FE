import * as S from '../../styles/home/routine.style';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import { mockRoutineDetailData } from '../../mocks/home/mockRoutineData';

function RoutineDetail() {
  const { id } = useParams<{ id: string }>();

  const routine = mockRoutineDetailData.find((item) => item.id === Number(id));

  return (
    <S.Container className="pageContainer">
      <Header title={routine?.title || '소비 루틴 상세'} />
    </S.Container>
  );
}

export default RoutineDetail;
