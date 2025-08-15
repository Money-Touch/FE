import styled from 'styled-components';
import colors from '../common/colors';

export const Wrap = styled.div`
  position: relative;
  padding-top: 8.4rem;
  width: 100%;
  height: 100vh;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Body = styled.main`
  padding: 0 2.4rem 0 2.4rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 3.4rem;
  font-size: 2rem;
  font-weight: 500;
  color: ${colors.G1};
  border-bottom: 0.1rem solid ${colors.G5};

  &:focus {
    outline: none;
    border-color: ${colors.mainColor1};
  }
`;

export const CircleClose = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  right: 0;
  top: 0.5rem;
  cursor: pointer;
`;

export const CharCount = styled.p`
  width: 100%;
  text-align: right;
  color: ${colors.G3};
  font-size: 1.2rem;
  font-weight: 300;

  span {
    color: ${colors.G5};
  }
`;

export const SubmitBtnContainer = styled.div`
  width: 100%;
  padding: 0 2.4rem;
  margin-top: 52.2rem;
`;

export const SubmitBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 5rem;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${colors.white};
  border-radius: 1rem;
  background-color: ${({ disabled }) =>
    disabled ? colors.G6 : colors.mainColor1};
`;
