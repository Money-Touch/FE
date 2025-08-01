import React from 'react';
import SearchIcon from '../../assets/images/feed/Search.png';
import * as S from '../../styles/feed/feed.style';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className={S.SearchContainer}>
      <div className={S.SearchInputWrapper}>
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={S.SearchInput}
        />
        <button onClick={onSearch} className={S.SearchButton}>
          <img src={SearchIcon} alt="검색" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};
