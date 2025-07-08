import React from 'react';
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownText,
  ChevronIcon
} from '../../styles/feed/feed';
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
  onToggle
}) => {
  const handleSortChange = (newSortBy: SortBy) => {
    onSortChange(newSortBy);
    onToggle();
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={onToggle}>
        <DropdownText>
          {sortBy === 'popular' ? '인기순' : '최신순'}
        </DropdownText>
        <ChevronIcon>
          <img
            src={isOpen ? CaretUpIcon : CaretDownIcon}
            alt="정렬 아이콘"
          />
        </ChevronIcon>
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          <DropdownItem
            isActive={sortBy === 'popular'}
            onClick={() => handleSortChange('popular')}
          >
            인기순
          </DropdownItem>
          <DropdownItem
            isActive={sortBy === 'latest'}
            onClick={() => handleSortChange('latest')}
          >
            최신순
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};
