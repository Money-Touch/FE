import colors from "../../styles/common/colors";
import styled from "styled-components";

// home.tsx
export const Container = styled.div`
  position: relative;
  padding-top: 24px;
  padding-bottom: 110px;
  background: linear-gradient(180deg, #a5ffde -13.63%, ${colors.white} 11.57%);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

export const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  margin-left: 17px;
`;

export const AlarmImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

export const Section = styled.div`
  margin-top: 16px;
  margin-left: 24px;
  margin-right: 24px;
`;

// consumptionWelcome.tsx
export const WelcomeContainer = styled.div`
  position: relative;
  height: 127px;
  gap: 25px;
`;

export const WelcomeTitle = styled.div`
  height: 52px;
  margin-bottom: 25px;

  p {
    font-family: Pretendard;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -3%;
  }
`;

export const Username = styled.span`
  color: ${colors.subColor2};
`;

export const RecordButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${colors.mainColor1};

  p {
    font-family: Pretendard;
    height: 23px;
    font-weight: 500;
    font-size: 15px;
    line-height: 23px;
    letter-spacing: -3%;
    color: ${colors.white};
  }
`;

export const IllustrationBox = styled.img`
  position: absolute;
  top: -17px;
  right: 0px;
  width: 93.09px;
  height: 85.67px;
  z-index: 5;
`;

// Title
export const SectionTitle = styled.div`
  height: 26px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -3%;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MoreIcon = styled.img`
  height: 14px;
  cursor: pointer;
`;

// consumptionStatistics.tsx
export const StatisticsContainer = styled.div`
  margin-top: 40px;
  height: 277px;
  gap: 8px;
`;

export const StatisticsSection = styled.div`
  height: 243px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px #0000000d;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

export const ChartAndLegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`;

export const DonutChartWrapper = styled.div`
  width: 135px;
  height: 135px;
  flex-shrink: 0;
  margin-right: 25px;
`;

export const LegendList = styled.div`
  width: 108px;
  height: 112px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 25px;
`;

export const LegendItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 108px;
  height: 16px;
`;

export const LegendItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 90px;
`;

export const LegendColorDot = styled.div<{ color: string }>`
  width: 5px;
  height: 5px;
  border-radius: 1px;
  background-color: ${({ color }) => color};
`;

export const LegendText = styled.span<{ active: boolean }>`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -3%;
  color: ${colors.G1};
`;

export const LegendPercentage = styled.span<{ active: boolean }>`
  width: 35px;
  height: 16px;
  display: inline-block;
  text-align: right;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -3%;
  text-align: right;
  color: ${colors.G4};
`;

export const BottomBorderBox = styled.div`
  height: 24px;
  margin-top: 34px;
`;

export const BottomText = styled.p`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -2%;
  color: ${colors.G3};
  text-align: center;
`;

export const HighlightedText = styled.span`
  color: ${colors.G1};
  font-weight: 600;
`;

// consumptionRanking.tsx
export const RankingContainer = styled.div`
  margin-top: 20px;
  height: 198px;
  gap: 8px;
`;

export const RankingSection = styled.div`
  height: 164px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px #0000000d;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const RankingList = styled.div`
  display: flex;
  height: 26px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 22px;
  justify-content: space-between;
  align-items: center;
`;

export const Medal = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 16px;
`;

export const ProfileAndName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const Profile = styled.img`
  width: 26px;
  height: 26px;
  object-fit: cover;
`;

export const UserName = styled.div`
  width: 30px;
  height: 22px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -3%;
  color: ${colors.G1};
`;

export const WiseCount = styled.div`
  width: 35px;
  height: 16px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -3%;
  text-align: right;
  color: ${colors.G1};
`;

export const RankChangeIcon = styled.img`
  width: 12px;
  height: 12px;
`;

// consumptionRoutine.tsx
export const RoutineContainer = styled.div`
  margin-top: 20px;
  height: 318px;
  gap: 8px;
`;

export const RoutineSection = styled.div`
  height: 284px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px #0000000d;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const RoutineCard = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-top: 14px;
  margin-left: 16px;
  margin-right: 16px;
  gap: 8px;
`;

export const RoutineIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const RoutineText = styled.div`
  height: 22px;
  flex: 1;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -3%;
  color: ${colors.G1};
`;

export const RoutineArrow = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
