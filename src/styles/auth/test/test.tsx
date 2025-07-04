import styled from "styled-components";
import colors from "../../common/colors";
import type { AnswerButtonProps } from "../../../types/auth/test/answerButton";

// onboarding.tsx
export const OnboardingTopContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin: 8.4rem 0 3.6rem 0;
    width: 100%;
`

export const OnboardingP = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.G4};
`

export const ListOnboardingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`

export const ItemOnboardingContainer = styled(ListOnboardingContainer)`
    gap: 0.6rem;
`

export const ItemOnboardingP = styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${colors.G1};
`

export const ListSelectContainer = styled.ul`
    display: flex;
    gap: 0.7rem;
    margin-bottom: 0.9rem;
    flex-wrap: wrap;
`;

export const ItemSelectContainer = styled.li<{ selected: boolean }>`
    padding: 0.7rem 1.6rem;
    border-radius: 2rem;
    border: ${({ selected }) => `0.1rem solid ${selected ? colors.mainColor1 : colors.G7}`};
    background: ${({ selected }) => (selected ? colors.subColor6 : colors.white)};
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 500;    
    color: ${({ selected }) => (selected ? colors.G1 : colors.G1)};
    transition: all 0.2s;
`;

// mbti.tsx
export const MbtiP = styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.G1};
    margin: 13.6rem 0 4.4rem 0;
`

export const MbtiImgDiv = styled.div`
    width: 20.2rem;
    height: 20.2rem;
    background: ${colors.G7};
`

export const MbtiSkipP = styled.p`
    font-size: 1.1rem;
    font-weight: 300;
    color: ${colors.G1};
    margin-top: 0.7rem;
    cursor: pointer;
`

// qna.tsx
export const NavbarContainer = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: 5.1rem;
    gap: 0.5rem;
`
export const NavbarDot = styled.div<{ active: boolean }>`
    width: ${({ active }) => (active ? "1.1rem" : "0.6rem")};
    height: 0.6rem;
    border-radius: ${({ active }) => (active ? "0.3rem" : "50%")};
    background-color: ${({ active }) => (active ? colors.mainColor1 : colors.G7)};
`;

// item-answer.tsx
export const AnswerButton = styled.button<AnswerButtonProps>`
    width: 100%;
    height: 4.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${({ selected }) => (selected ? colors.mainColor1 : colors.G7)};
    cursor: pointer;
    font-weight: 500;
    font-size: 1.4rem;
    color: ${colors.G2};
    background: ${({ selected }) => (selected ? colors.subColor6 : colors.white)};
`;

// spinner.tsx
export const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 22.3rem 0 3.9rem 0;
`;

// resultForm.tsx
export const ResultImg = styled.div`
    width: 31.2rem;
    height: 31.2rem;
    background: ${colors.G7};
    margin: 3.1rem 0 2.2rem 0;
`