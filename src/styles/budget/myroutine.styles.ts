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

export const IconBtnLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

export const H1 = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export const Body = styled.main`
  flex: 1;
  padding: 24px 16px 0;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const Month = styled.p`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.G1};
`;

export const Divider = styled.hr`
  height: 8px;
  margin: -10px -16px 24px;
  border: none;
  background: ${colors.G8};
`;

export const CatUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CatLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;
