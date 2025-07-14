import styled from 'styled-components';
import colors from '../../common/colors';

// mypage.tsx
export const ProfileBar = styled.div`
  width: 100%;
  height: 0.7rem;
  background: ${colors.G8};
`;

// profile.tsx
export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin: 7.9rem 0 2rem 0;
  padding: 0 2rem;
`;

export const ProfileLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  jutify-content: center;
  gap: 0.9rem;
  width: 8rem;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 8rem;
  cursor: pointer;
`;

export const ProfileEditButton = styled.button`
  width: 100%;
  height: 2.3rem;
  border-radius: 0.5rem;
  border: 0.05rem solid ${colors.G7};
  font-size: 1.1rem;
  font-weight: 300;
  cursor: pointer;
  color: ${colors.G1};
`;

export const ProfileRightContaienr = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1.5rem;
`;

export const ProfileP = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  color: ${colors.G1};
`;

export const BadgeImg = styled.img`
  width: 4.5rem;
  height: 5.1rem;
  cursor: pointer;
`;

// list-button.tsx
export const ListButtonContainer = styled.div`
  width: 100%;
  padding: 1.6rem 2rem 4.2rem 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

// item-button.tsx
export const ItemButtonContainer = styled.div`
  width: 100%;
  height: 10.5rem;
  border-radius: 1rem;
  background: ${colors.G8};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
`;

export const ItemButtonInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ItemButtonImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const ItemButtonP = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${colors.G1};
`;

// list-section.tsx
export const ListSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  gap: 4.8rem;
`;

// item-section.tsx
export const ItemSectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const ItemSectionP = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${colors.G1};
`;

// list-menu.tsx
export const ListMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

// item-menu.tsx
export const ItemMenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const ItemMenuP = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.G3};
`;

export const RightArrowImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;
