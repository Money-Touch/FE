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
    <S.DropdownContainer>
      <S.DropdownButton onClick={onToggle}>
        <S.DropdownText>
          {sortBy === 'popular' ? '인기순' : '최신순'}
        </S.DropdownText>
        <S.ChevronIcon>
          <img src={isOpen ? CaretUpIcon : CaretDownIcon} alt="정렬 아이콘" />
        </S.ChevronIcon>
      </S.DropdownButton>

      {isOpen && (
        <S.DropdownMenu>
          <S.DropdownItem
            isActive={sortBy === 'popular'}
            onClick={() => handleSortChange('popular')}
          >
            인기순
          </S.DropdownItem>
          <S.DropdownItem
            isActive={sortBy === 'latest'}
            onClick={() => handleSortChange('latest')}
          >
            최신순
          </S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};
