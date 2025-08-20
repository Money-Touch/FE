import React, { useState, useEffect, useCallback } from 'react';
import SearchIcon from '../../assets/images/feed/Search.png';
import NoResult from '../../assets/images/feed/NO_RESULT.png';
import * as S from '../../styles/feed/feed.style';
import { useSearch } from '../../hooks/feed/useSearch';
import type { FeedItem } from '../../types/feed/feed';
import LeftArrowIcon from '../../assets/images/feed/leftArrow.png';

interface SearchBoxProps {
  onSearchResults?: (results: FeedItem[]) => void;
  onSearchStart?: (keyword: string) => void;
  isSearchMode?: boolean;
  onBack?: () => void;
  resetToken?: number;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearchResults,
  onSearchStart,
  isSearchMode = false,
  onBack,
  resetToken = 0,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');

  const { flatList, isFetching } = useSearch(currentKeyword);

  useEffect(() => {
    if (!isSearchMode) return;
    if (!currentKeyword) return;
    onSearchResults?.(flatList);
  }, [flatList, currentKeyword, isSearchMode, onSearchResults]);

  useEffect(() => {
    setSearchTerm('');
    setCurrentKeyword('');
  }, [resetToken]);

  const handleSearch = useCallback(() => {
    const q = searchTerm.trim();
    if (!q) return;
    onSearchStart?.(q);
    setCurrentKeyword(q);
  }, [searchTerm, onSearchStart]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      <div className={S.SearchContainer}>
        {isSearchMode && (
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로가기"
            className={S.SearchBackButton}
          >
            <img src={LeftArrowIcon} alt="뒤로가기" className={S.backButton} />
          </button>
        )}

        <div className={S.SearchInputWrapper}>
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className={S.SearchInput}
          />
          <button onClick={handleSearch} className={S.SearchButton}>
            <img src={SearchIcon} alt="검색" width={20} height={20} />
          </button>
        </div>
      </div>

      {currentKeyword && (
        <div className={S.searchContentContainer}>
          {!isFetching && flatList.length === 0 && (
            <div className={S.NoResultContainer}>
              <img
                src={NoResult}
                alt="검색 결과 없음"
                className={S.noSearchImg}
              />
              <span className={S.noSearchText}>검색 결과가 없어요.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
