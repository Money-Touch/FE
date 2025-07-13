import { useState } from 'react';
import { useFeedQuery } from '../../../hooks/auth/mypage/useFeedQuery';
import * as S from '../../../styles/auth/signup/signup.style';
import colors from '../../../styles/common/colors';
import Header from '../../../components/header/header';
import ListGrid from '../../../components/auth/mypage/myfeed/grid/list-grid';
import ListGrid4 from '../../../components/auth/mypage/myfeed/grid/list-grid4';
import ListGrid2 from '../../../components/auth/mypage/myfeed/grid/list-grid2';

const Myfeed = () => {
  const { data } = useFeedQuery();
  const [selectedId, setSelectedId] = useState<number>(1);

  return (
    <S.AgreeContainer
      style={{ background: colors.white, paddingBottom: '1.2rem' }}
    >
      <Header title="MY 피드" />

      <ListGrid selectedId={selectedId} setSelectedId={setSelectedId} />

      {selectedId === 1 && <ListGrid4 data={data} />}
      {selectedId === 2 && <ListGrid2 data={data} />}
    </S.AgreeContainer>
  );
};

export default Myfeed;
