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
    <div className={`pageContainer ${S.Container}`}>
      <Header title="소비 루틴" />
      <div className={S.SearchWrapper}>
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={S.SearchInput}
        />
        <img src={searchIcon} alt="검색" className={S.SearchIcon} />
      </div>
      {filteredData.length === 0 ? (
        <div className={S.NoResultWrapper}>
          <img src={noResult} alt="검색 결과 없음" className={S.NoResultImg} />
        </div>
      ) : (
        <div className={S.List}>
          {filteredData.map((item) => (
            <RoutineCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Routine;
