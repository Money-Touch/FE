import colors from '../../styles/common/colors';
import styled from 'styled-components';

// ranking.tsx
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #e0fadd 0%, ${colors.M2} 56.31%);
  padding: 0 2.4rem;
`;

// rank box
export const MyRankBox = styled.div`
  width: 100%;
  max-width: 37.7rem;
  height: 5rem;
  min-height: 5rem;
  margin: 2.6rem auto 0;
  background: #ffffffcc;
  border: 1px solid #cee5f1;
  border-radius: 1rem;
  backdrop-filter: blur(2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2.4rem;
`;

export const RankBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileDes = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  color: ${colors.G1};
  line-height: 2.2rem;
`;

// top3
export const Top3Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2.2rem;
  margin-top: 4.2rem;
`;

export const TopUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5.2rem;
  height: 7.6rem;
  margin-bottom: 0.4rem;
`;

export const Medal = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  position: absolute;
`;

export const Profile = styled.img`
  width: 5.2rem;
  height: 5.2rem;
  margin-top: 2.4rem;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 5.2rem;
  height: 5.2rem;
`;

export const UserName = styled.div`
  width: 5.2rem;
  height: 2.4rem;
  font-weight: 500;
  font-size: 1.6rem;
  text-align: center;
  color: ${colors.G1};
`;

export const Count = styled.div`
  width: 5.2rem;
  height: 2.6rem;
  gap: 1rem;
  border-radius: 10rem;
  border-width: 0.1rem;
  padding: 0.5rem;
  background: #ffffff99;
  border: 0.1rem solid #cee5f1;
  backdrop-filter: blur(2rem);
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  color: ${colors.G3};
`;

export const Podium = styled.img`
  width: 7rem;
  height: auto;
  margin-top: 0.3rem;
  z-index: 0;
`;

// other
export const OtherListWrapper = styled.div`
  width: 100%;
  max-width: 42.5rem;
  height: 41.8rem;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background-color: ${colors.B1};
  box-shadow: 0 0 1rem 0 #0000000d;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 2.4rem;
`;

export const OtherListBox = styled.div`
  width: 100%;
  max-width: 37.7rem;
  height: 31.4rem;
  margin-top: 2.8rem;
  gap: 2.2rem;
  box-sizing: border-box;
`;

export const OtherUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.6rem;
  line-height: 2.2rem;
  margin-bottom: 2.2rem;
  color: ${colors.G1};
`;

export const RankNumber = styled.div`
  width: 0.9rem;
  font-weight: 500;
  font-size: 1.4rem;
`;

export const RowProfile = styled.img`
  width: 2.6rem;
  height: 2.6rem;
  object-fit: cover;
  margin-left: 1.6rem;
`;

export const RowName = styled.div`
  flex: 1;
  margin-left: 1rem;
  width: 2.4rem;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.2rem;
`;

export const RowRight = styled.div`
  display: flex;
  align-items: center;
  line-height: 2.2rem;
  gap: 0.1rem;
  width: 4rem;
  height: 1.6rem;
`;

export const RowCount = styled.div`
  width: 2.8rem;
  height: 1.2rem;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: right;
`;

export const RankChangeIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.5rem;
`;
