import styled from "styled-components";
import colors from "../../common/colors";

export const OnboardingTopContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin: 6rem 0 3.6rem 0;
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

export const ItemOnboardingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
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

export const MbtiP = styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.G1};
    margin: 7.8rem 0 3.3rem 0;
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