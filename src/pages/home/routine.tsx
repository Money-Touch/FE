import * as S from '../../styles/home/routine.style';
import { useState } from 'react';

import searchIcon from '../../assets/images/home/routine/search.png';
import noResult from '../../assets/images/home/routine/noResult.png';

import Header from '../../components/header/header';
import RoutineCard from '../../components/home/routine/routineCard';
import { mockRoutineDetailData } from '../../mocks/home/mockRoutineData';

function Routine() {
  const [search, setSearch] = useState('');

  const sortedData = [...mockRoutineDetailData].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  const filteredData = sortedData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <S.Container className="pageContainer">
      <Header title="소비 루틴" />
      <S.SearchWrapper>
        <S.SearchInput
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <S.SearchIcon src={searchIcon} alt="검색" />
      </S.SearchWrapper>

      {filteredData.length === 0 ? (
        <S.NoResultWrapper>
          <S.NoResultImg src={noResult} alt="검색 결과 없음" />
        </S.NoResultWrapper>
      ) : (
        <S.List>
          {filteredData.map((item) => (
            <RoutineCard key={item.id} item={item} />
          ))}
        </S.List>
      )}
    </S.Container>
  );
}

export default Routine;
