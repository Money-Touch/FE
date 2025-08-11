import styled, { css } from 'styled-components';
import colors from '../common/colors';

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
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
  height: 2.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.G1};

  .CatP {
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
  width: 14rem;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const EditInput = styled.span`
  flex: 1;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.G1};
  border-bottom: 0.1rem solid ${colors.mainColor1};
  text-align: right;
`;

export const PlusBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const PlusBtn = styled.button`
  cursor: pointer;

  img {
    width: 5.8rem;
    height: 5.8rem;
  }
`;

export const ConfirmBtn = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 5rem;
  margin: 2.3rem 0 16.4rem 0;
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  color: ${colors.white};
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
`;

export const Dim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 999;
  background: rgba(17, 17, 17, 0.6);
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
