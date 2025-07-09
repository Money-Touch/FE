import styled from 'styled-components';
import colors from '../common/colors';

export const Container = styled.div`
  min-height: calc(100vh - 100px);
  padding: 24px 24px 100px;
  background: ${colors.white};
`;

// SearchBox.tsx
export const SearchContainer = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 5px;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 45px;
  border: 1px solid ${colors.G7};
  border-radius: 5px;
  margin: 8px auto;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding: 12px 15px;
  color: ${colors.G5};
`;

export const SearchButton = styled.button`
  height: 100%;
  cursor: pointer;
  padding: 12px;
`;

// Dropdown Styles
export const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  width: 80px;
  background: ${colors.G8};
  border-radius: 5px;
  z-index: 10;
  color: ${colors.G4};
`;

interface DropdownItemProps {
  isActive?: boolean;
}

export const DropdownItem = styled.button<DropdownItemProps>`
  width: 100%;
  padding: 8px 0;
  text-align: center;
  border: none;
  background: transparent;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isActive }) => (isActive ? colors.G1 : colors.G4)};
`;

// Post List Styles
export const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostCard = styled.div`
  background: ${colors.white};
  overflow: hidden;
  padding-bottom: 16px;
`;

export const PostHeader = styled.div`
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.h3`
  font-size: 14px;
  color: ${colors.G2};
  margin: 0;
`;

export const PostImageContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

export const PostImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 5px;
`;

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 40px;
  height: 36px;
  cursor: pointer;
`;

export const DislikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 40px;
  height: 36px;
  cursor: pointer;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;

  p {
    color: ${colors.G5};
    font-size: 18px;
  }
`;

// Dropdown Text Styles
export const DropdownText = styled.span`
  color: ${colors.G4};
  align-items: center;
`;

export const ChevronIcon = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 8px;
    height: 8px;
    object-fit: contain;
  }
`;

// Skeleton Styles
export const SkeletonBox = styled.div<{
  width?: string;
  height?: string;
  circle?: boolean;
}>`
  background-color: ${colors.G7};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '16px'};
  border-radius: ${({ circle }) => (circle ? '50%' : '4px')};
`;

export const ImageSkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${colors.G7};
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

//PostItem Default
export const DefaultProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.G6};
`;

export const DefaultPostImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.G6};
  border-radius: 10px;
`;
