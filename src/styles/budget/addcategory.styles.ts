import styled from 'styled-components';
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

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export const Body = styled.main`
  flex: 1;
  padding: 24px 24px 0;
`;

export const InputWrapper = styled.div`
  margin-bottom: 24px;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 12px;
  border: none;
  border-bottom: 2px solid ${colors.G6};
  background: transparent;

  &:focus {
    outline: none;
    border-color: ${colors.mainColor1};
  }
`;

export const CharCount = styled.div`
  text-align: right;
  color: ${colors.G5};
  font-size: 12px;
  margin-top: 4px;
`;

export const SubmitBtn = styled.button<{ disabled: boolean }>`
  width: calc(100% - 32px);
  margin: 0 16px 160px;
  padding: 14px 0;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) =>
    disabled ? colors.G6 : colors.mainColor1};
`;
