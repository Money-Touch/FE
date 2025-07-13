import styled from 'styled-components';
import colors from '../../common/colors';
import type { ItemGrid2PProps } from '../../../types/auth/mypage/myfeed';

// list-grid.tsx
export const ListGridContainer = styled.div`
  width: 100%;
  margin: 1rem 0 1.2rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// item-grid.tsx
export const ItemGridImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

// list-grid4.tsx
export const ListGrid4Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
`;

// item-grid4.tsx
export const ItemGrid4Div = styled.div`
  width: 100%;
  height: 11.8rem;
  border-radius: 0.5rem;
  background: ${colors.G1};
  cursor: pointer;
`;

// list-grid2.tsx
export const ListGrid2Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// item-grid2.tsx
export const ItemGrid2Contaienr = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  cursor: pointer;
`;

export const ItemGrid2P = styled.p<ItemGrid2PProps>`
  font-size: ${({ fontSize }) => fontSize || '0.8rem'};
  font-weight: ${({ fontWeight }) => fontWeight || 300};
  color: ${({ color }) => color || colors.G3};
`;

export const ItemGrid2Img = styled.div`
  width: 100%;
  height: 36.5rem;
  border-radius: 1rem;
  background: ${colors.G1};
`;

export const ItemGrid2PDiv = styled.div`
  width: 100%;
  margin-top: 0.6rem;
`;
