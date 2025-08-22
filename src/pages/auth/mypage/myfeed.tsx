import { useState, useEffect } from 'react';
import * as S from '../../../styles/auth/signup/signup.style';
import Header from '../../../components/header/header';
import ListGrid from '../../../components/auth/mypage/myfeed/grid/list-grid';
import ListGrid4 from '../../../components/auth/mypage/myfeed/grid/list-grid4';
import ListGrid2 from '../../../components/auth/mypage/myfeed/grid/list-grid2';
import { useInfiniteFeedQuery } from '../../../hooks/auth/mypage/useInfiniteFeedQuery';
import { useInView } from 'react-intersection-observer';

const Myfeed = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const viewMode = selectedId === 1 ? 'CARD' : 'LIST';

  const { data, fetchNextPage, hasNextPage } = useInfiniteFeedQuery(viewMode);
  console.log(data);

  const { ref, inView } = useInView();

  const feedData = data?.pages.flatMap((page) => page.result.feedList) || [];
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div
      className={`${S.AgreeContainer} !mt-[8.4rem] !h-[calc(100vh-10rem)] !pb-[10rem] !overflow-y-auto`}
    >
      <Header title="MY 피드" />
      <ListGrid selectedId={selectedId} setSelectedId={setSelectedId} />

      {viewMode === 'CARD' && <ListGrid4 data={feedData} />}
      {viewMode === 'LIST' && <ListGrid2 data={feedData} />}

      <div ref={ref} style={{ height: 1 }} />
    </div>
  );
};

export default Myfeed;
