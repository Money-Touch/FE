import styled from 'styled-components';
import colors from '../common/colors';

// home
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

// routine
export const ModalContent = styled.div`
  width: 29.3rem;
  height: 14.6rem;
  top: 38.5prem;
  left: 6.6rem;
  border-radius: 1.5rem;
  background-color: ${colors.white};
`;

export const ModalText = styled.p`
  height: 9rem;
  padding: 0 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.8rem;
  text-align: center;
  color: ${colors.G1};
`;

export const ModalDivider = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: ${colors.G7};
`;

export const ModalButtons = styled.div`
  display: flex;
  height: 5.5rem;
`;

export const ModalDividerVertical = styled.div`
  width: 0.1rem;
  height: 100%;
  background-color: ${colors.G7};
`;

export const ModalButtonYes = styled.button`
  flex: 1;
  font-weight: 500;
  font-size: 1.8rem;
  text-align: center;
  color: ${colors.mainColor1};
`;

export const ModalButtonNo = styled.button`
  flex: 1;
  flex: 1;
  font-weight: 500;
  font-size: 1.8rem;
  text-align: center;
  color: ${colors.G6};
`;
