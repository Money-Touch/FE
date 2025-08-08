import styled from 'styled-components';
import colors from '../common/colors';

export const Wrap = styled.div`
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
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
  align-items: center;
  justify-content: center;
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

export const Label2 = styled.h2`
  font-size: 16px;
  font-weight: 600;
`;

export const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;

  span {
    margin-left: 2px;
    color: ${colors.M1};
  }
`;

export const AmountBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  font-size: 28px;
  font-weight: 700;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const Divider = styled.hr`
  height: 8px;
  margin: -10px -16px 24px;
  border: none;
  background: ${colors.G8};
`;

export const CatBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const CatBtn = styled.button<{ $on: boolean }>`
  padding: 8px 14px;
  border: 1px solid ${colors.G7};
  border-radius: 20px;
  font-size: 14px;
  background: ${({ $on }) => ($on ? colors.mainColor1 : colors.B1)};
  color: ${({ $on }) => ($on ? '#fff' : colors.G3)};
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid ${colors.G7};
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 24px;

  &::placeholder {
    color: ${colors.G6};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 140px;
  padding: 14px;
  border: 1px solid ${colors.G7};
  border-radius: 10px;
  font-size: 14px;
  resize: none;

  &::placeholder {
    color: ${colors.G6};
  }
`;

export const Save = styled.button<{ disabled?: boolean }>`
  margin: 24px 0 160px;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
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
  max-width: 430px;
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
