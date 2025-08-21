import * as S from '../../styles/home/routine.style';
import { useState } from 'react';
import searchIcon from '../../assets/images/home/routine/search.png';
import noResult from '../../assets/images/home/routine/noResult.png';
import Header from '../../components/header/header';
import RoutineCard from '../../components/home/routine/routineCard';
import { useRoutineData } from '../../hooks/home/routine/useRoutineData';
import { useInfiniteScroll } from '../../hooks/home/routine/useInfiniteScroll';
import type { UserRoutineDetail } from '../../types/home/routine';

function Routine() {
  const [inputValue, setInputValue] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isSearching,
  } = useRoutineData(inputValue);

  const routines: UserRoutineDetail[] = data
    ? data.pages.flatMap((page) => page.result.routineList)
    : [];

  const bottomRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setInputValue(inputValue.trim());
    }
  };

  const handleSearchClick = () => {
    setInputValue(inputValue.trim());
  };

  if (isLoading) return <div></div>;
  if (error) return <div></div>;

  return (
    <div className={S.Container}>
      <Header title="소비 루틴" />
      <div className={S.SectionContainer}>
        <div className={S.SearchWrapper}>
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={S.SearchInput}
          />
          <img
            src={searchIcon}
            alt="검색"
            className={S.SearchIcon}
            onClick={handleSearchClick}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {isSearching && routines.length === 0 ? (
          <div className={S.NoResultWrapper}>
            <img
              src={noResult}
              alt="검색 결과 없음"
              className={S.NoResultImg}
            />
          </div>
        ) : (
          <>
            <div className={S.List}>
              {routines.map((item) => (
                <RoutineCard key={item.routineId} item={item} />
              ))}
            </div>
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
}

export default Routine;
