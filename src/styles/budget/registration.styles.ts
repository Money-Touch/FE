import styled, { css } from 'styled-components';
import colors from '../common/colors';

const MOBILE_MAX = '430px';

export const Wrap = styled.div`
  position: relative;
  max-width: ${MOBILE_MAX};
  margin: 0 auto;
  min-height: 100vh;
  background: ${colors.B1};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.G8};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;

  img,
  svg {
    width: 20px;
    height: 20px;
    display: block;
    object-fit: contain;
  }
`;

export const IconBtnLeft = styled(IconBase)`
  left: 16px;
`;

export const H1 = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export const Body = styled.main`
  flex: 1;
  padding: 24px 16px 0;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

export const IconBtn = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;

  img {
    width: 20px;
    height: 20px;

    ${({ $active }) =>
      $active &&
      css`
        filter: hue-rotate(140deg);
      `}
  }
`;

export const DeleteToggleBtn = styled.button<{ $active: boolean }>`
  margin-left: auto;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 28px;
  line-height: 20px;
  color: ${({ $active }) => ($active ? colors.mainColor1 : colors.G3)};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-2px);
`;

export const Month = styled.p`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.G1};
`;

export const Divider = styled.hr`
  height: 8px;
  margin: -10px -16px 24px;
  border: none;
  background: ${colors.G8};
`;

export const CatUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CatLi = styled.li<{ $editable: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;

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

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DeleteBtn = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  color: ${colors.G3};
  line-height: 1;
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
  max-width: ${MOBILE_MAX};
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
