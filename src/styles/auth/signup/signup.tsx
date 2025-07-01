import styled from "styled-components";
import colors from "../../common/colors";
import type { InputButtonProps } from "../../../types/auth/signup/setting";

// agree.tsx
export const AgreeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 31.2rem;
`

export const AgreeP = styled.p`
    width: 100%;
    font-size: 2.4rem;
    font-weight: 700;
    color: ${colors.G1};
    line-height: 3.4rem;
`

export const BottomContainer = styled.div`
    width: 100%;
    margin-top: 18.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`

export const NextButton = styled.button<{ active: boolean }>`
    width: 100%;
    height: 5rem;
    border-radius: 1rem;
    background: ${({ active }) => (active ? colors.mainColor1 : colors.G6)};
    font-size: 1.8rem;
    font-weight: 500;
    color: ${colors.white};
    cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
`

export const BottomP = styled.p`
    font-size: 1.1rem;
    font-weight: 300;
    color: ${colors.G6};
    line-height: 1.4rem;
    text-align: center;
`

// agreeForm.tsx
export const AgreeFormContainer = styled.div`
    padding-top: 6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
`

export const AgreeItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
`

export const CheckImg = styled.img`
    width: 2rem;
    height: 2rem;
`

export const ItemP = styled.p`
    font-size: 1.8rem;
    font-weight: 500;
    color: ${colors.G1};
`

export const AgreeBar = styled.div`
    width: 100%;
    height: 0.1rem;
    background: ${colors.G7};
`

// list-agree.tsx
export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
`

// settingForm.tsx
export const Container = styled.form`
    width: 100%;
    padding-top: 2.6rem;
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
`;

export const InputWrapper = styled.div`
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
    width: ${({ hasButton }) => (hasButton ? "78%" : "100%")};
    height: 4.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${({ hasError }) => (hasError ? `${colors.M1}` : `${colors.G7}`)};
    padding: 0 3rem 0 1.5rem;
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
    cursor: ${({ hasError }) => (hasError ? "not-allowed" : "pointer")};
    font-size: 1.4rem;
    font-weight: 500;
`;

export const Error = styled.p`
    font-size: 1.1rem;
    color: ${colors.M1};
    opacity: 0.8;
    position: absolute;
    bottom: -1.4rem;
`;

// settingInputIcon.tsx
const BaseIcon = styled.img`
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    cursor: pointer;
`;

export const DeleteIcon = styled(BaseIcon)<{ hasButton: boolean }>`
    right: ${({ hasButton }) => (hasButton ? "9.5rem" : "1.5rem")};
`;

export const ToggleIcon = styled(BaseIcon)<{ hasDelete: boolean }>`
    right: ${({ hasDelete }) => (hasDelete ? "4rem" : "1.5rem")};
`;