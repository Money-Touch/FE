import styled from "styled-components";
import colors from "../../common/colors";

// agree.tsx
export const AgreeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const AgreeP = styled.p`
    width: 100%;
    font-size: 2.4rem;
    font-weight: 700;
    color: ${colors.G1};
    line-height: 3.4rem;
    padding: 2.8rem 2.4rem 0 2.4rem; 
`

export const BottomContainer = styled.div`
    width: 100%;
    padding: 0 2.4rem;
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
    padding: 6rem 2.4rem 0 2.4rem;
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