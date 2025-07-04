import styled from "styled-components"
import colors from "../../common/colors"

// login.tsx
export const LoginContainer = styled.div`
    background: ${colors.B1};
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: flex-end;
    margin-top: 12.3rem;
`

export const LogoImg = styled.img`
    width: 6rem;
    height: 6rem;
`

export const LogoP = styled.p`
    font-size: 2.4rem;
    font-family: 'Hakgyoansim-B', sans-serif;
    color: ${colors.mainColor1};
`

// loginForm.tsx
export const LoginFormContainer = styled.div`
    width: 38rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-top: 5rem;
`

export const LoginButton = styled.button`
    width: 100%;
    height: 4.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    background: ${colors.G1};
    color: ${colors.white};
    font-size: 1.5rem;
    font-weight: 500;
`

// loginInput.tsx
export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const InputBox = styled.input`
    width: 100%;
    height: 4.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${colors.G7};
    padding: 0 1.5rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${colors.G5};

    &::placeholder {
        color: ${colors.G5};
    }
`;

export const IconImg = styled.img`
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
`;

// list-menu.tsx
export const ListMenuContainer = styled.div`
    display: flex;
    gap: 2.4rem;
    margin: 1.6rem 0 3rem 0;
`

// item-menu.tsx
export const ItemP = styled.p<{ clickable: boolean }>`
    font-size: 1.1rem;
    font-weight: 300;
    color: ${colors.G4};
    cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

// kakao.tsx
export const KakaoButton = styled.button`
    width: 38rem;
    height: 4.5rem;
    cursor: pointer;
    background: ${colors.yellow};
    padding: 0 1.2rem;
    border-radius: 0.5rem;
`

export const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
`

export const KakaoIconImg = styled.img`
    width: 2.4rem;
    height: 2.4rem;
`