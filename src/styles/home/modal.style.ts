import styled from "styled-components";
import colors from "../common/colors";

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
  background: white;
  padding: 16px;
  border-radius: 15px;
  width: 148px;
  min-height: 138px;
  overflow-y: auto;
  top: 474px;
  left: 208px;
`;

export const ModalList = styled.ul`
  width: 116px;
  height: 100px;
`;

export const ModalItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const ColorDot = styled.div<{ color: string }>`
  width: 5px;
  height: 5px;
  border-radius: 1px;
  background-color: ${({ color }) => color};
`;

export const CategoryName = styled.span`
  color: ${colors.G1};
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -3%;
`;

export const Percentage = styled.span`
  color: ${colors.G4};
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -3%;
`;
