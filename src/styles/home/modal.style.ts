import styled from 'styled-components';
import colors from '../common/colors';

export const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #11111199;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  position: absolute;
  background: ${colors.white};
  padding: 1.6rem;
  border-radius: 1.5rem;
  width: 14.8rem;
  min-height: 13.8rem;
  overflow-y: auto;
  top: 53rem;
  left: 20.9rem;
`;

export const ModalList = styled.ul`
  width: 11.6rem;
  height: 10rem;
`;

export const ModalItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

export const ColorDot = styled.div<{ color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.1rem;
  background-color: ${({ color }) => color};
`;

export const CategoryName = styled.span`
  color: ${colors.G1};
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
`;

export const Percentage = styled.span`
  color: ${colors.G4};
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
`;
