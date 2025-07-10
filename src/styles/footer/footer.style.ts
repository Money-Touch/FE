import styled from 'styled-components';
import colors from '../common/colors';

// footer.tsx
export const FooterContainer = styled.div`
  width: 100%;
  background: ${colors.white};
  height: 13rem;
  border-radius: 2rem 2rem 0 0;
  display: flex;
  justify-content: center;
  padding-top: 1.3rem;
`;

// list-footer.tsx
export const ListContainer = styled.div`
  display: flex;
  gap: 6rem;
`;

// item-footer.tsx
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
`;

export const ItemImage = styled.img`
  width: auto;
  height: 2.8rem;
`;

export const ItemP = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  color: ${colors.G5};

  &.active {
    color: ${colors.subColor1};
  }
`;
