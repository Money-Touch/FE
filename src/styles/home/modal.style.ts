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
  padding: 24px;
  border-radius: 12px;
  width: 200px;
  max-height: 70vh;
  overflow-y: auto;
  top: 341.33px;
  border-radius: 13px;
`;

export const ModalTitle = styled.div`
  height: 26px;

  h1 {
    font-family: Pretendard;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -3%;
    color: ${colors.G1};
  }
`;

export const ModalList = styled.ul`
  width: 116px;
  margin-top: 20px;
  margin-left: 2px;
`;

export const ModalItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  padding: 6px 0;
  font-family: Pretendard;
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
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -3%;
`;

export const Percentage = styled.span`
  color: ${colors.G4};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -3%;
`;
