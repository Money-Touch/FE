import colors from "../../styles/common/colors";
import styled from "styled-components";

// ranking.tsx
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #e0fadd 0%, #cde3f3 56.31%);
`;

// header
export const HeaderWrapper = styled.div`
  padding-top: 24px;
`;

export const Header = styled.div`
  width: 425px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const BackIcon = styled.img`
  position: absolute;
  left: 17px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-style: Bold;
  font-size: 18px;
  color: ${colors.G1};
`;

// rank box
export const MyRankBox = styled.div`
  width: 377px;
  height: 50px;
  margin-top: 26px;
  margin-left: 24px;
  margin-right: 24px;
  background-color: ${colors.white};
  border-radius: 10px;
  border-width: 1px;
  border: 1px solid #cee5f1;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RankBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileDes = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${colors.G1};
  line-height: 22px;
`;

// top3
export const Top3Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 22px;
  margin-top: 42px;
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
  width: 52px;
  height: 76px;
  margin-bottom: 4px;
`;

export const Medal = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
`;

export const Profile = styled.img`
  width: 52px;
  height: 52px;
  margin-top: 24px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
`;

export const UserName = styled.div`
  width: 52px;
  height: 24px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: ${colors.G1};
`;

export const Count = styled.div`
  width: 52px;
  height: 26px;
  gap: 10px;
  border-radius: 100px;
  border-width: 1px;
  padding: 5px;
  background: #ffffff99;
  border: 1px solid #cee5f1;
  backdrop-filter: blur(20px);
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: ${colors.G3};
`;

export const Podium = styled.img`
  width: 70px;
  height: auto;
  margin-top: 3px;
  z-index: 0;
`;

// other
export const OtherListWrapper = styled.div`
  width: 425px;
  height: 418px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${colors.B1};
  box-shadow: 0px 0px 10px 0px #0000000d;
  border: 1px solid ${colors.white};
`;

export const OtherListBox = styled.div`
  width: 377px;
  height: 314px;
  margin-top: 28px;
  margin-left: 24px;
  margin-right: 24px;
  gap: 22px;
`;

export const OtherUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26px;

  line-height: 22px;
  margin-bottom: 22px;
  color: ${colors.G1};
`;

export const RankNumber = styled.div`
  width: 9px;
  font-weight: 500;
  font-size: 14px;
`;

export const RowProfile = styled.img`
  width: 26px;
  height: 26px;
  object-fit: cover;
  margin-left: 16px;
`;

export const RowName = styled.div`
  flex: 1;
  margin-left: 10px;
  width: 24px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
`;

export const RowRight = styled.div`
  display: flex;
  align-items: center;
  line-height: 22px;
  gap: 1px;
  width: 40px;
  height: 16px;
`;

export const RowCount = styled.div`
  width: 28px;
  height: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
`;

export const RankChangeIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-top: 5px;
`;
