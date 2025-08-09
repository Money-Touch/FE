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

export const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;

  span {
    margin-left: 2px;
    color: ${colors.M1};
  }
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

export const TagsInBox = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PlusBtn = styled.button`
  width: 20px;
  height: 20px;
  font-size: 20px;
  line-height: 1;
  color: ${colors.G5};
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const TagInput = styled.input`
  width: 70px;
  min-width: 20px;
  max-width: 100%;
  padding: 4px 6px;
  font-size: 12px;
  border: none;
  border-radius: 8px;
  background: #e5f8e7;
  color: ${colors.mainColor1};
  flex: 0 0 auto;

  &::placeholder {
    color: ${colors.mainColor1};
    opacity: 0.5;
  }

  &:focus {
    outline: 1px solid ${colors.mainColor1};
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
