import React from 'react';
import * as S from '../../styles/feed/feed.style';
import SearchIcon from '../../assets/images/feed/Search.png';

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
    <S.SearchContainer>
      <S.SearchInputWrapper>
        <S.SearchInput
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <S.SearchButton onClick={onSearch}>
          <img src={SearchIcon} alt="검색" width={20} height={20} />
        </S.SearchButton>
      </S.SearchInputWrapper>
    </S.SearchContainer>
  );
};
