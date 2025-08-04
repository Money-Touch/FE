// home.tsx
export const Container = 'relative pt-[2.4rem] pb-[4rem] bg-[var(--color-B2)]';
export const Header = 'flex items-center justify-between h-[6rem]';
export const LogoImg = 'w-[3.6rem] h-[3.6rem] ml-[1.7rem]';
export const AlarmWrapper = 'relative w-[2.4rem] h-[2.4rem] mr-[2.4rem]';
export const AlarmImg =
  'w-[1.833rem] h-[1.98rem] mt-[0.2rem] ml-[0.3rem] cursor-pointer';
export const New = 'absolute top-[0.1rem] left-[1.4rem] w-[0.6rem] h-[0.6rem]';
export const Section = 'mx-[2.4rem]';

// SectionTitle, Header
export const SectionTitle =
  'h-[2.6rem] font-medium text-[1.8rem] leading-[2.6rem]';
export const SectionHeader = 'flex justify-between items-center mb-[0.8rem]';
export const MoreIcon = 'h-[1.4rem] cursor-pointer';

// consumptionWelcome.tsx
export const WelcomeContainer =
  "relative h-[18.9rem] p-0 rounded-[1.5rem] shadow-[0_0_1rem_0_#0000000d] overflow-hidden will-change-transform bg-gradient-to-b from-[#00dabd] to-[#94fff1] before:content-[''] before:absolute before:w-[17.6rem] before:h-[12.6rem] before:top-[-2.5rem] before:left-[21.9rem] before:bg-[linear-gradient(234.4deg,rgba(249,234,67,0.3)_8.28%,var(--color-white)_91.72%)] before:blur-[2rem] before:rounded-full before:z-[1] after:content-[''] after:absolute after:w-[17.6rem] after:h-[12.6rem] after:top-[3.6rem] after:left-[19.7rem] after:bg-[linear-gradient(234.4deg,var(--color-white)_8.28%,rgba(0,209,181,0.3)_91.72%)] after:blur-[2rem] after:rounded-full after:z-[1]";
export const WhiteBackground =
  'absolute top-[0.1rem] left-[0.1rem] right-[0.1rem] bottom-[0.1rem] bg-[var(--color-white)] rounded-[1.4rem] z-0';
export const WelcomeTopRow =
  'flex justify-between items-start relative z-[3] px-[1.5rem]';
export const WelcomeTitle =
  'flex-1 h-[5.2rem] mt-[3.9rem] relative z-[3] whitespace-nowrap font-extrabold text-[1.8rem] leading-[2.6rem]';
export const Username = 'text-[var(--color-subColor2)]';
export const RecordButton =
  'w-[calc(100%-3rem)] h-[5rem] mt-[0.9rem] mx-[1.5rem] rounded-[1rem] bg-[var(--color-mainColor1)] relative z-[3] text-[var(--color-white)] font-medium text-[1.5rem] leading-[2.3rem] tracking-[-0.03em]';
export const RecordButtonText =
  'h-[2.3rem] font-medium text-[1.5rem] leading-[2.3rem] tracking-[-0.03em] text-[var(--color-white)]';
export const IllustrationBox =
  'w-[9.3rem] h-[8.5rem] flex-shrink-0 mt-[2.2rem] relative z-[3]';

// consumptionStatistics.tsx
export const StatisticsContainer = 'mt-[4rem] w-full h-[27.7rem] gap-[0.8rem]';
export const StatisticsSection =
  'h-[24.3rem] rounded-[1.5rem] shadow-[0_0_1rem_0_#0000000d] flex items-center justify-start flex-col mt-[0.8rem]';
export const ChartAndLegendWrapper = 'flex flex-row items-center mt-[3rem]';
export const DonutChartWrapper =
  'relative w-[13.5rem] h-[13.5rem] flex-shrink-0 mr-[2rem]';
export const LegendList = 'w-[10.8rem] flex flex-col gap-[0.8rem] ml-[1.5rem] ';
export const LegendItemWrapper =
  'flex items-center justify-between w-[10.8rem] h-[1.6rem]';
export const LegendItemLeft = 'flex items-center gap-[0.5rem] w-[9rem]';
export const LegendColorDot = () => `w-[0.5rem] h-[0.5rem] rounded-[0.1rem]`;
export const LegendText =
  'font-medium text-[1.2rem] leading-[1.6rem] text-[var(--color-G1)]';
export const LegendPercentage =
  'w-[3.5rem] h-[1.6rem] inline-block text-right font-medium text-[1.2rem] leading-[1.6rem] tracking-[-0.03em] text-[var(--color-G4)]';
export const BottomBorderBox = 'h-[2.4rem] mt-[2.5rem]';
export const BottomText =
  'font-medium text-[1.6rem] leading-[2.4rem] text-center text-[var(--color-G3)]';
export const HighlightedText =
  'text-[var(--color-G1)] font-bold text-[1.6rem] leading-[2.4rem]';
export const DescriptionText =
  'text-[var(--color-G1)] font-bold text-[1.6rem] leading-[2.4rem]';
export const cursorPointer = 'cursor-pointer';
export const cursorDefault = 'cursor-default';
export const activeTextColor = 'text-[var(--color-G1)]';
export const inactiveTextColor = 'text-[var(--color-G1)]';
export const activePercentageColor = 'text-[var(--color-G4)]';
export const inactivePercentageColor = 'text-[var(--color-G4)]';

// consumptionRanking.tsx
export const RankingContainer = 'mt-[2rem] h-[19.8rem] gap-[0.8rem]';
export const RankingSection =
  'h-[16.4rem] rounded-[1.5rem] shadow-[0_0_1rem_0_#0000000d] flex justify-start flex-col';
export const RankingList =
  'flex h-[2.6rem] mx-[1rem] mt-[2.2rem] justify-between items-center';
export const Medal = 'w-[2rem] h-[2rem] mr-[1.6rem]';
export const ProfileAndName = 'flex items-center gap-[1rem] flex-1';
export const Profile = 'w-[2.6rem] h-[2.6rem] object-cover';
export const UserName =
  'w-[3rem] h-[2.2rem] font-medium text-[1.4rem] leading-[2.2rem] text-[var(--color-G1)]';
export const WiseCount =
  'w-[3.5rem] h-[1.6rem] font-medium text-[1.2rem] leading-[1.6rem] text-right text-[var(--color-G1)]';
export const RankChangeIcon = 'w-[1.2rem] h-[1.2rem]';

// consumptionRoutine.tsx
export const RoutineContainer = 'mt-[2rem] h-[31.8rem] gap-[0.8rem]';
export const RoutineSection =
  'h-[28.4rem] rounded-[1.5rem] shadow-[0_0_1rem_0_#0000000d] flex justify-start flex-col';
export const RoutineCard =
  'flex items-center h-[4rem] mt-[1.4rem] mx-[1.6rem] gap-[0.8rem] cursor-pointer';
export const RoutineIcon = 'w-[3.2rem] h-[3.2rem]';
export const RoutineText =
  'h-[2.2rem] flex-1 flex items-center font-medium text-[1.4rem] leading-[2.2rem] text-[var(--color-G1)]';
export const NewBadge =
  'ml-[0.8rem] font-light text-[1.1rem] text-[var(--color-M1)]';
export const RoutineArrow = 'w-[1.8rem] h-[1.8rem] cursor-pointer';
