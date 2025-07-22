import styled from 'styled-components';
import colors from '../common/colors';

export const Container = styled.div`
  padding: 2.4rem;
  background: ${colors.white};
`;

// SearchBox.tsx
export const SearchContainer = styled.div`
  width: 100%;
  height: 6rem;
  border-radius: 0.5rem;
`;

export const SearchInputWrapper = styled.div`
  width: 37.7rem
  height: 4.5rem;
  border: 0.1rem solid ${colors.G7};
  border-radius: 0.5rem;
  margin: 0.8rem auto;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  padding: 1.2rem 1.5rem;
  color: ${colors.G5};
`;

export const SearchButton = styled.button`
  height: 100%;
  cursor: pointer;
  padding: 1.2rem;
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
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 0.4rem;
  width: 8rem;
  background: ${colors.G8};
  border-radius: 0.5rem;
  z-index: 10;
  color: ${colors.G4};
`;

interface DropdownItemProps {
  isActive?: boolean;
}

export const DropdownItem = styled.button<DropdownItemProps>`
  width: 100%;
  padding: 0.8rem 0;
  text-align: center;
  cursor: pointer;
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
  padding-bottom: 1.6rem;
`;

export const PostHeader = styled.div`
  padding-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.h3`
  font-size: 1.4rem;
  color: ${colors.G2};
`;

export const PostImageContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 1rem;
  cursor: pointer;
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
  gap: 1.6rem;
  padding-top: 0.5rem;
`;

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 5rem;
  height: 3.6rem;
  cursor: pointer;
`;

export const DislikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 5rem;
  height: 3.6rem;
  cursor: pointer;
`;

export const LikeCount = styled.span`
  width: 2rem;
  text-align: center;
  font-size: 1.4rem;
  color: ${colors.G1};
`;

export const DislikeCount = styled.span`
  width: 2rem;
  text-align: center;
  font-size: 1.4rem;
  color: ${colors.G1};
`;

export const NoResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  text-align: center;
  margin-top: 10rem;
`;

export const NoResultImage = styled.img`
  width: auto;
  height: 12rem;
  display: block;
`;

export const NoResultText = styled.div`
  font-size: 20px;
  color: ${colors.G1};
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
    width: 0.8rem;
    height: 0.8rem;
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
  height: ${({ height }) => height || '1.6rem'};
  border-radius: ${({ circle }) => (circle ? '50%' : '0.4rem')};
`;

export const ImageSkeleton = styled.div`
  position: absolute;
  background-color: ${colors.G7};
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;

//PostItem Default
export const DefaultProfile = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${colors.G6};
`;

export const DefaultPostImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.G6};
  border-radius: 1rem;
`;
