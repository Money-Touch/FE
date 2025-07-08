import colors from '../../styles/common/colors';
import styled, { keyframes } from 'styled-components';

export const fadeUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

export const SplashContainer = styled.div`
  background: linear-gradient(
    191.43deg,
    ${colors.mainColor1} 0.01%,
    ${colors.subColor4} 99.99%
  );
  padding-top: 26.7rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeUp} 2s ease-out;
`;

export const SplashImg = styled.img`
  width: 14.4rem;
  height: 14.4rem;
`;

export const SplashP = styled.p`
  font-family: 'Hakgyoansim-B', sans-serif;
  color: ${colors.white};
  font-size: 2.6rem;
`;
