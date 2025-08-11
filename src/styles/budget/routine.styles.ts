import styled, { css } from 'styled-components';
import colors from '../common/colors';

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.main`
  margin-top: 2.6rem;
`;

export const Section = styled.section`
  margin: 0 2.4rem;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const Label = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.G1};
`;

export const Month = styled.p`
  font-size: 2.6rem;
  font-weight: 700;
  color: ${colors.G1};
`;

export const IconBtn = styled.button<{ $active?: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;

    ${({ $active }) =>
      $active &&
      css`
        filter: hue-rotate(140deg);
      `}
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.7rem;
  background: ${colors.G8};
  margin: 2.4rem 0 1.8rem 0;
`;

export const CatUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin: 1.4rem 0 4.7rem 0;
`;

export const CatLi = styled.li<{ $editable: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.G1};

  span:first-child {
    color: ${colors.G5};
    font-size: 1.5rem;
  }

  ${({ $editable }) =>
    $editable &&
    css`
      cursor: pointer;
    `}
`;

export const EditWrapper = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
`;

export const EditInput = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.black};
  border-bottom: 1.5px solid ${colors.mainColor1};
  padding-bottom: 2px;
  text-align: right;
`;

export const PlusBtn = styled.button`
  position: absolute;
  right: 16px;
  bottom: 240px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 56px;
    height: 56px;
  }
`;

export const ConfirmBtn = styled.button<{ disabled?: boolean }>`
  width: calc(100% - 32px);
  margin: 0 16px 160px;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
`;

export const Dim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Modal = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 28px 28px 0 0;
  display: flex;
  flex-direction: column;
  animation: slide-up 0.25s ease;

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px 18px;
  font-size: 18px;
  font-weight: 700;
`;

export const Close = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 2px solid ${colors.mainColor1};
  padding: 0 20px 6px;
`;

export const Money = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 28px;
  font-weight: 600;
  text-align: right;
`;

export const Won = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.G4};
  margin-left: 6px;
`;

export const Pad = styled.div`
  background: #e6faf5;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Key = styled.button`
  font-size: 28px;
  font-weight: 600;
  color: ${colors.G1};
  padding: 20px 0;
  background: none;
  border: none;

  &:active {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const Apply = styled.button<{ disabled?: boolean }>`
  margin: 20px;
  padding: 14px 0;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
`;
