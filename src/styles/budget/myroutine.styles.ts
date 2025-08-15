import styled from 'styled-components';
import colors from '../common/colors';

export const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 8.4rem;
`;

export const Body = styled.main`
  overflow-y: auto;
`;

export const Section = styled.section`
  margin: 0 2.4rem;
`;

export const Label = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${colors.G1};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const Month = styled.p`
  font-size: 2.6rem;
  font-weight: 700;
  color: ${colors.G1};
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.7rem;
  background: ${colors.G8};
  margin: 2.47rem 0 3rem 0;
`;

export const CatUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const CatLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${colors.G5};

  .wonP {
    font-size: 1.8rem;
    color: ${colors.G1};
  }
`;
