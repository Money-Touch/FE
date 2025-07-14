import styled from 'styled-components';
import colors from '../../common/colors';
import type { InputButtonProps } from '../../../types/auth/signup/setting';

// signup.tsx
export const SignupContainer = styled.div`
  display: flex;
`;

// agree.tsx
export const AgreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 2.4rem;
`;

export const AgreeP = styled.p`
  width: 100%;
  font-size: 2.4rem;
  font-weight: 700;
  color: ${colors.G1};
  line-height: 3.4rem;
  margin-top: 2.8rem;
`;

export const BottomContainer = styled.div`
  width: 100%;
  margin-top: 18.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const NextButton = styled.button<{ active: boolean }>`
  width: 100%;
  height: 5rem;
  border-radius: 1rem;
  background: ${({ active }) => (active ? colors.mainColor1 : colors.G6)};
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.white};
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
`;

export const BottomP = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  color: ${colors.G6};
  line-height: 1.4rem;
  text-align: center;
`;

// agreeForm.tsx
export const AgreeFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  margin-top: 6rem;
`;

export const AgreeItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

export const CheckImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const ItemP = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.G1};
`;

export const AgreeBar = styled.div`
  width: 100%;
  height: 0.1rem;
  background: ${colors.G7};
`;

// list-agree.tsx
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

// settingForm.tsx
export const Container = styled.form`
  width: 100%;
  margin-top: 2.6rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
`;

// settingInput.tsx
export const Label = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.G2};
  position: relative;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  position: relative;
`;

export const Input = styled.input<InputButtonProps>`
  width: 100%;
  height: 4.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid
    ${({ hasError }) => (hasError ? `${colors.M1}` : `${colors.G7}`)};
  padding: ${({ hasButton }) =>
    hasButton ? '0 4rem 0 1.5rem' : '0 6.5rem 0 1.5rem'};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${colors.G5};

  &::placeholder {
    color: ${colors.G5};
  }
`;

export const Button = styled.button<InputButtonProps>`
  width: 8.3rem;
  height: 4.5rem;
  border-radius: 0.5rem;
  background: ${({ hasError }) => (hasError ? colors.G7 : colors.mainColor1)};
  color: ${({ hasError }) => (hasError ? colors.G5 : colors.white)};
  cursor: ${({ hasError }) => (hasError ? 'not-allowed' : 'pointer')};
  font-size: 1.4rem;
  font-weight: 500;
`;

export const Error = styled.p`
  font-weight: 300;
  font-size: 1.1rem;
  color: ${colors.M1};
  position: absolute;
  bottom: -1.7rem;
`;

// settingInputIcon.tsx
export const BaseIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  cursor: pointer;
`;

export const DeleteIcon = styled(BaseIcon)<{ hasButton: boolean }>`
  right: ${({ hasButton }) => (hasButton ? '8.5rem' : '1.5rem')};
`;

export const ToggleIcon = styled(BaseIcon)<{ hasDelete: boolean }>`
  right: ${({ hasDelete }) => (hasDelete ? '4rem' : '1.5rem')};
`;

// profileForm.tsx
export const ProfileFormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  margin-top: 6rem;
`;

// profileImage.tsx
export const Img = styled.img`
  width: 10.5rem;
  height: 10.5rem;
  border-radius: 3.7rem;
  border: 0.1rem solid ${colors.G7};
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  display: none;
`;

// profileInput.tsx
export const ProfileInputContainer = styled.div`
  width: 20.8rem;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
`;

export const ProfileInputBox = styled.input<{
  hasError?: boolean;
  isValid?: boolean;
}>`
  height: 2.2rem;
  padding-right: 2.5rem;
  border: none;
  border-bottom: 0.1rem solid
    ${({ hasError, isValid }) =>
      hasError ? colors.M1 : isValid ? colors.mainColor1 : colors.G5};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${colors.G1};
`;

export const CountP = styled.p<{ isMax: boolean }>`
  position: absolute;
  right: 0;
  bottom: -1.7rem;
  font-size: 1.1rem;
  color: ${({ isMax }) => (isMax ? colors.M1 : colors.G5)};
`;

// success.tsx
export const SuccessMainP = styled.p`
  width: 100%;
  font-size: 2.4rem;
  font-weight: 700;
  color: ${colors.G1};
  line-height: 3.4rem;
  text-align: center;
  margin: 13.8rem 0 15.5rem 0;
`;

export const SuccessImg = styled.img`
  width: 17.598rem;
  height: 15.1rem;
`;
