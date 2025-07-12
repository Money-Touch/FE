import colors from '../../styles/common/colors';
import styled from 'styled-components';

// home.tsx
export const Container = styled.div`
  position: relative;
  padding-top: 2.4rem;
  padding-bottom: 4rem;
  background-color: ${colors.B2};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
`;

export const LogoImg = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  margin-left: 1.7rem;
`;

export const AlarmWrapper = styled.div`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 2.4rem;
`;

export const AlarmImg = styled.img`
  width: 1.833rem;
  height: 1.98rem;
  margin-top: 0.2rem;
  margin-left: 0.3rem;
  cursor: pointer;
`;

export const New = styled.img`
  position: absolute;
  top: 0.1rem;
  left: 1.4rem;
  width: 0.6rem;
  height: 0.6rem;
`;

export const Section = styled.div`
  margin-left: 2.4rem;
  margin-right: 2.4rem;
`;

// consumptionWelcome.tsx
export const WelcomeContainer = styled.div`
  position: relative;
  height: 18.9rem;
  padding: 0rem;
  background: linear-gradient(180deg, #00dabd 0%, #94fff1 100%);
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0 #0000000d;
  overflow: hidden;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    width: 17.6rem;
    height: 12.6rem;
    top: -2.5rem;
    left: 21.9rem;
    background: linear-gradient(
      234.4deg,
      rgba(249, 234, 67, 0.3) 8.28%,
      ${colors.white} 91.72%
    );
    filter: blur(2rem);
    border-radius: 50%;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 17.6rem;
    height: 12.6rem;
    top: 3.6rem;
    left: 19.7rem;
    background: linear-gradient(
      234.4deg,
      ${colors.white} 8.28%,
      rgba(0, 209, 181, 0.3) 91.72%
    );
    filter: blur(2rem);
    border-radius: 50%;
    z-index: 1;
  }
`;

export const WhiteBackground = styled.div`
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  right: 0.1rem;
  bottom: 0.1rem;
  background-color: ${colors.white};
  border-radius: 1.4rem;
  z-index: 0;
`;

export const WelcomeTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 3;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

export const WelcomeTitle = styled.div`
  flex: 1;
  height: 5.2rem;
  margin-top: 3.9rem;
  position: relative;
  z-index: 3;

  p {
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.6rem;
    white-space: nowrap;
  }
`;

export const Username = styled.span`
  color: ${colors.subColor2};
`;

export const RecordButton = styled.button`
  width: calc(100% - 3rem);
  height: 5rem;
  margin: 0.9rem 1.5rem 0 1.5rem;
  border-radius: 1rem;
  background-color: ${colors.mainColor1};
  position: relative;
  z-index: 3;

  p {
    height: 2.3rem;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.3rem;
    letter-spacing: -3%;
    color: ${colors.white};
  }
`;

export const IllustrationBox = styled.img`
  width: 9.3rem;
  height: 8.5rem;
  flex-shrink: 0;
  margin-top: 2.2rem;
  position: relative;
  z-index: 3;
`;

// Title
export const SectionTitle = styled.div`
  height: 2.6rem;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.6rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

export const MoreIcon = styled.img`
  height: 1.4rem;
  cursor: pointer;
`;

// consumptionStatistics.tsx
export const StatisticsContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 27.7rem;
  gap: 0.8rem;
`;

export const StatisticsSection = styled.div`
  height: 24.3rem;
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0 #0000000d;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 0.8rem;
`;

export const ChartAndLegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3rem;
`;

export const DonutChartWrapper = styled.div`
  width: 13.5rem;
  height: 13.5rem;
  flex-shrink: 0;
  margin-right: 2.5rem;
`;

export const LegendList = styled.div`
  width: 10.8rem;
  height: 11.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-left: 2.5rem;
`;

export const LegendItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10.8rem;
  height: 1.6rem;
`;

export const LegendItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 9rem;
`;

export const LegendColorDot = styled.div<{ color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.1rem;
  background-color: ${({ color }) => color};
`;

export const LegendText = styled.span<{ active: boolean }>`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${colors.G1};
`;

export const LegendPercentage = styled.span<{ active: boolean }>`
  width: 3.5rem;
  height: 1.6rem;
  display: inline-block;
  text-align: right;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: -3%;
  color: ${colors.G4};
`;

export const BottomBorderBox = styled.div`
  height: 2.4rem;
  margin-top: 3.4rem;
`;

export const BottomText = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${colors.G3};
  text-align: center;
`;

export const HighlightedText = styled.span`
  color: ${colors.G1};
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

export const DescriptionText = styled.span`
  color: ${colors.G1};
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

// consumptionRanking.tsx
export const RankingContainer = styled.div`
  margin-top: 2rem;
  height: 19.8rem;
  gap: 0.8rem;
`;

export const RankingSection = styled.div`
  height: 16.4rem;
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0 #0000000d;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const RankingList = styled.div`
  display: flex;
  height: 2.6rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 2.2rem;
  justify-content: space-between;
  align-items: center;
`;

export const Medal = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1.6rem;
`;

export const ProfileAndName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const Profile = styled.img`
  width: 2.6rem;
  height: 2.6rem;
  object-fit: cover;
`;

export const UserName = styled.div`
  width: 3rem;
  height: 2.2rem;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${colors.G1};
`;

export const WiseCount = styled.div`
  width: 3.5rem;
  height: 1.6rem;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: right;
  color: ${colors.G1};
`;

export const RankChangeIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

// consumptionRoutine.tsx
export const RoutineContainer = styled.div`
  margin-top: 2rem;
  height: 31.8rem;
  gap: 0.8rem;
`;

export const RoutineSection = styled.div`
  height: 28.4rem;
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0 #0000000d;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const RoutineCard = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  margin-top: 1.4rem;
  margin-left: 1.6rem;
  margin-right: 1.6rem;
  gap: 0.8rem;
`;

export const RoutineIcon = styled.img`
  width: 3.2rem;
  height: 3.2rem;
`;

export const RoutineText = styled.div`
  height: 2.2rem;
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${colors.G1};
`;

export const NewBadge = styled.span`
  margin-left: 0.8rem;
  font-weight: 300;
  font-size: 1.1rem;
  color: ${colors.M1};
`;

export const RoutineArrow = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;
