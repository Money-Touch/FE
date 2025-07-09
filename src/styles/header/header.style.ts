import styled from 'styled-components';
import colors from '../common/colors';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  margin-top: 2.4rem;
  position: relative;
`;

export const LeftArrowImg = styled.img`
  width: 0.98rem;
  height: 1.78rem;
  cursor: pointer;
`;

export const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  font-size: 1.8rem;
  color: ${colors.G1};
`;
