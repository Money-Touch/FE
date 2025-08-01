import { useState } from 'react';
import { useFeedQuery } from '../../../hooks/auth/mypage/useFeedQuery';
import * as S from '../../../styles/auth/signup/signup.style';
import Header from '../../../components/header/header';
import ListGrid from '../../../components/auth/mypage/myfeed/grid/list-grid';
import ListGrid4 from '../../../components/auth/mypage/myfeed/grid/list-grid4';
import ListGrid2 from '../../../components/auth/mypage/myfeed/grid/list-grid2';

const Myfeed = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const viewMode = selectedId === 1 ? 'CARD' : 'LIST';

  const { data } = useFeedQuery(viewMode);
  console.log(data);

  return (
    <div className={`${S.AgreeContainer} !pb-[1.2rem]`}>
      <Header title="MY 피드" />

      <ListGrid selectedId={selectedId} setSelectedId={setSelectedId} />

      {selectedId === 1 && <ListGrid4 data={data?.result?.feedList} />}
      {selectedId === 2 && <ListGrid2 data={data?.result?.feedList} />}
    </div>
  );
};

export default Myfeed;
