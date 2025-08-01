import React from 'react';
import * as S from '../../styles/feed/feed.style';
import CaretDownIcon from '../../assets/images/feed/CaretDown.png';
import CaretUpIcon from '../../assets/images/feed/CaretUp.png';

export type SortBy = 'popular' | 'latest';

interface SortDropdownProps {
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  onSortChange,
  isOpen,
  onToggle,
}) => {
  const handleSortChange = (newSortBy: SortBy) => {
    onSortChange(newSortBy);
    onToggle();
  };

  return (
    <div className={S.DropdownContainer}>
      <button className={S.DropdownButton} onClick={onToggle}>
        <span className={S.DropdownText}>
          {sortBy === 'popular' ? '인기순' : '최신순'}
        </span>
        <div className={S.ChevronIcon}>
          <img
            src={isOpen ? CaretUpIcon : CaretDownIcon}
            alt="정렬 아이콘"
            className="w-[0.48rem] h-[0.35rem]"
          />
        </div>
      </button>

      {isOpen && (
        <div className={S.DropdownMenu}>
          <button
            className={`${S.DropdownItem} ${sortBy === 'popular' ? '!text-[var(--color-G1)]' : ''}`}
            onClick={() => handleSortChange('popular')}
          >
            인기순
          </button>
          <button
            className={`${S.DropdownItem} ${sortBy === 'latest' ? '!text-[var(--color-G1)]' : ''}`}
            onClick={() => handleSortChange('latest')}
          >
            최신순
          </button>
        </div>
      )}
    </div>
  );
};
