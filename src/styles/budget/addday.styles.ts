import styled from 'styled-components';
import colors from '../common/colors';

const ROW_H = 53;

export const Wrap = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.main`
  width: 100%;
`;

export const Section = styled.section`
  margin: 2.6rem 0 2.4rem 0;
  padding: 0 2.4rem;
`;

export const Label2 = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.G1};

  span {
    margin-left: 0.2rem;
    color: ${colors.M1};
  }
`;

export const Row = styled.div`
  width: 100%;
`;

export const Label = styled(Label2)`
  margin-bottom: 0.6rem;
  font-size: 1.5rem;
`;

export const AmountBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 2.6rem;
  font-weight: 700;
  color: ${colors.G1};

  img {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.7rem;
  background: ${colors.G8};
`;

export const CatBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.4rem;
`;

export const CatBtn = styled.button<{ $on: boolean }>`
  padding: 0.7rem 1.4rem;
  border: 0.1rem solid ${({ $on }) => ($on ? 'transparent' : colors.G7)};
  border-radius: 2rem;
  font-size: 1.4rem;
  background: ${({ $on }) => ($on ? colors.mainColor1 : colors.white)};
  color: ${({ $on }) => ($on ? colors.white : colors.G2)};
`;

export const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  padding: 0 1.5rem;
  box-sizing: border-box;
  border: 0.1rem solid ${colors.G7};
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 300;
  margin-bottom: 2.4rem;

  &::placeholder {
    color: ${colors.G5};
  }
`;

export const DeleteIcon = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  position: absolute;
  right: 1.5rem;
  top: 1.3rem;
`;

export const DateBtn = styled.button<{ $placeholder?: boolean }>`
  width: 100%;
  height: 4.5rem;
  padding: 0 1.5rem;
  border: 0.1rem solid ${colors.G7};
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 300;
  text-align: left;
  margin-bottom: 2.4rem;
  color: ${({ $placeholder }) => ($placeholder ? colors.G5 : colors.G1)};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 18rem;
  padding: 1.5rem;
  border: 0.1rem solid ${colors.G7};
  border-radius: 1rem;
  font-size: 1.4rem;
  font-weight: 300;
  resize: none;
  outline: none;

  &::placeholder {
    color: ${colors.G5};
  }
`;

export const Save = styled.button<{ disabled?: boolean }>`
  width: 100%;
  margin-top: 6.6rem;
  height: 5rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.white};
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

// 모달
export const Dim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 999;
  background: rgba(17, 17, 17, 0.6);
  // backdrop-filter: blur(0.2rem);
  display: flex;
  align-items: flex-end;
`;

export const Modal = styled.div`
  width: 100%;
  background: ${colors.white};
  border-radius: 1.5rem 1.5rem 0 0;
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
  width: 100%;
  padding: 0 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    width: 100%;
    font-size: 2rem;
    font-weight: 500;
    color: ${colors.G1};
    margin-bottom: 2rem;
  }
`;

export const Close = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  margin: 2rem 0 3rem 0;
  cursor: pointer;
`;

export const InputRow = styled.div`
  width: 100%;
  padding: 0 2rem;
  position: relative;

  span {
    position: absolute;
    font-size: 2.6rem;
    font-weight: 700;
    right: 4.5rem;
  }
`;

export const Money = styled.input<{ hasValue: boolean }>`
  margin-bottom: 3rem;
  width: 100%;
  height: 3.8rem;
  padding-right: 5.5rem;
  box-sizing: border-box;
  border-bottom: 0.1rem solid
    ${({ hasValue }) => (hasValue ? colors.mainColor1 : colors.G1)};
  font-size: 2.6rem;
  font-weight: 700;
`;

export const InputIcon = styled.img`
  position: absolute;
  right: 2rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

export const Pad = styled.div`
  background: #f9f9f9;
  padding: 1.8rem 6.4rem;
  border-top: 0.1rem solid ${colors.G8};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Key = styled.button`
  width: 100%;
  font-size: 3rem;
  font-weight: 500;
  color: ${colors.G1};
  margin-bottom: 2.2rem;
`;

export const ApplyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2.4rem 6.8rem 2.4rem;
  background: #f9f9f9;
`;

export const Apply = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 5rem;
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.white};
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
`;

// 날짜 모달
// -> 화면 너비에 따라 모달 날짜, 시간 등의 위치 이상함
// -> 추후 수정 필요
// -> 425px 일때만 그나마 정상으로 보임
// -> 도저히 안 고쳐짐ㅠ
export const DateModal = styled(Modal)`
  width: 100%;
  padding: 0 2.4rem 8.4rem 2.4rem;
`;

export const WheelWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr 1fr;
  gap: 0.8rem;
  height: 14.6rem;
  margin-bottom: 4.7rem;
`;

export const WheelCol = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const WheelSpacer = styled.div`
  height: calc(${ROW_H}rem / 10);
`;

export const WheelItem = styled.div<{ $active?: boolean }>`
  width: 100%;
  height: calc(${ROW_H}rem / 10);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? colors.G1 : colors.G6)};
  scroll-snap-align: center;
`;

export const WheelCenter = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: calc(${ROW_H}rem / 10);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  background: rgba(0, 209, 181, 0.08);
  outline: 0.1rem solid ${colors.mainColor1};
`;
