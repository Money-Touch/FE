import styled from 'styled-components';
import colors from '../common/colors';

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.main`
  margin: 2.6rem 2.4rem 0 2.4rem;
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

export const Label = styled.p`
  margin: 2.4rem 0 0.6rem 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.G1};

  span {
    margin-left: 0.2rem;
    color: ${colors.M1};
  }
`;

export const TagsInBox = styled.div`
  width: 100%;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

export const PlusBtn = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

export const TagInput = styled.input`
  padding: 0.4rem 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${colors.G3};
  border: none;
  border-radius: 0.5rem;
  background: ${colors.subColor5};
`;

export const Save = styled.button<{ disabled?: boolean }>`
  margin: 44.5rem 0 16.4rem 0;
  width: 100%;
  height: 5rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.white};
  cursor: pointer;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
