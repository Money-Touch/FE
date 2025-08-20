export const Container =
  'pt-[8.4rem] pb-[13rem] w-full h-screen bg-[var(--color-B1)] flex flex-col items-center';

export const MainContainer = 'overflow-y-auto w-full';

export const TopContainer = 'w-full px-[2.4rem]';

export const GreetingCard =
  'relative w-full h-[11rem] rounded-[1.5rem] flex gap-[2.2rem] items-center mb-[2.4rem]';

export const GreetText =
  'ml-[3.9rem] text-[var(--color-white)] text-[2rem] font-[700] leading-[2.8rem]';

export const MiniCard =
  'w-[8.4rem] h-[9.2rem] ml-[-2rem] shrink-0 -translate-y-[0.3rem]';

export const MonthRow = 'flex w-full items-center gap-[0.4rem]';

export const ArrowBtn = 'w-[2.4rem] h-[2.4rem] cursor-pointer';

export const ArrowBtnDisabled = 'opacity-30 pointer-events-none';

export const MonthText = 'text-[1.6rem] font-[500] text-[var(--color-G1)]';

export const TotalRow = 'my-[0.6rem] w-full flex items-center gap-[0.5rem]';

export const TotalSpent = 'text-[2.4rem] font-[700] text-[var(--color-G1)]';

export const TotalSlash = 'text-[1.6rem]';

export const TotalSub = 'font-[500] text-[1.8rem] text-[var(--color-G4)]';

export const EditBtn = 'w-[1.8rem] h-[1.8rem] cursor-pointer mt-[0.2rem]';

export const BudgetCardWrapper =
  'w-full h-[10.1rem] my-[0.6rem] mb-[2.4rem] px-[1.5rem] bg-[var(--color-white)] rounded-[1.5rem] shadow-[0_0_1rem_0_#0000000d] flex items-center justify-center';

export const Summary = 'flex flex-col w-full items-center gap-[0.8rem]';

export const SummaryP =
  'w-full text-[1.4rem] font-[500] text-[var(--color-G3)]';

export const SummaryStrong = 'font-[700] text-[var(--color-subColor3)]';

export const BarWrapper =
  'w-full relative h-[3.9rem] flex justify-center items-center';

export const Bar =
  'w-[98%] h-[0.6rem] bg-[var(--color-G8)] rounded-[1rem] overflow-hidden';

export const Fill =
  'h-full bg-[var(--color-mainColor1)] rounded-[1rem] transition-[width]';

export const Below =
  'absolute left-[1%] w-[98%] bottom-0 text-[1.1rem] font-light text-[var(--color-G5)] pointer-events-none';

export const UsedAmountWrap =
  'absolute -translate-x-1/2 bottom-[-0.6rem] flex flex-col items-center';

export const UsedAmountStar = 'w-[1.6rem] h-[1.5rem] mb-[1.4rem]';

export const TabMenu =
  'w-full h-[4.3rem] flex justify-center rounded-t-[1.5rem] border-b border-[var(--color-G7)] shadow-[0_0_1rem_0_#0000000d]';

export const TabItemMenu = 'flex gap-[5.6rem] justify-between pt-[1rem]';

export const TabItem =
  'text-[1.5rem] font-[500] relative pb-[0.6rem] cursor-pointer';

export const TabUnderline =
  'absolute bottom-0 left-1/2 -translate-x-1/2 w-[4.4rem] h-[0.4rem] bg-[var(--color-mainColor1)] rounded-[1rem]';

export const ContentArea =
  'bg-[var(--color-white)] h-full w-full relative pt-[2.71rem]';

export const ButtonContainer =
  'w-full flex justify-end pr-[2.4rem] gap-[1.6rem]';

export const PlusBtn = 'w-[2.4rem] h-[2.4rem] cursor-pointer';

export const DeleteToggleBtn = (active: boolean) =>
  `w-[2.4rem] h-[2.4rem] cursor-pointer ${
    active ? 'text-[var(--color-mainColor1)]' : 'text-[var(--color-G3)]'
  }`;

export const Section =
  'py-[2rem] pr-[2.4rem] pl-[2.4rem] pb-[2.4rem] border-b border-[var(--color-G7)] last:border-b-0';

export const Section2 =
  'py-[2rem] px-[2.4rem] flex flex-col gap-[1.8rem] border-b border-[var(--color-G7)] last:border-b-0';

export const DateRow = 'w-full mb-[1.9rem]';

export const DateText = 'text-[1.4rem] font-[500] text-[var(--color-G1)]';

export const ItemRow =
  'w-full h-[4rem] flex items-center justify-between mb-[1.8rem] text-[1.5rem] font-[500] text-[var(--color-G1)] last:mb-0';

export const ItemRowLeft = 'flex items-center gap-[1.2rem]';

export const ItemRowRight = 'flex items-center gap-[2.8rem]';

export const DeleteBtn = 'cursor-pointer w-[2.4rem] h-[2.4rem]';

export const DotBase = 'w-[4rem] h-[4rem] rounded-full';

export const EmptyBox =
  'my-[12.3rem] mb-[25.9rem] flex flex-col items-center justify-center text-center gap-[2rem]';

export const EmptyCircle = 'w-[13.822rem] h-[13rem] mr-[1rem]';

export const EmptyText = 'text-[1.6rem] text-[var(--color-G1)] font-[500]';

export const RoutineCardList =
  'my-[1.8rem] mx-[2.4rem] flex flex-col gap-[1rem]';

export const RoutineWideCard =
  'w-full flex h-[10.6rem] px-[1.5rem] gap-[1.1rem] rounded-[1.5rem] bg-[var(--color-white)] shadow-[0_0_1rem_0_#0000000d] cursor-pointer justify-start items-center';

export const PreviewBox =
  'w-[8.4rem] h-[8.4rem] flex-none rounded-[1rem] bg-[var(--color-G8)] opacity-80 shadow-[0_0_1rem_0_#0000000d]';

export const RoutineContent = 'flex flex-col w-full';

export const DateLine =
  'text-[0.8rem] font-light text-[var(--color-G3)] text-left';

export const TitleRow = 'flex items-center justify-between';

export const TitleH3 =
  'text-[1.5rem] font-[500] text-[var(--color-G1)] overflow-hidden text-ellipsis whitespace-nowrap';

export const ArrowIcon = 'w-[0.8rem] h-auto';

export const TagsRow = 'flex gap-[0.6rem]';

export const Tag = 'text-[1.1rem] font-[300] text-[var(--color-G4)]';

export const UserRow = 'flex items-center mt-[2.1rem] gap-[0.6rem]';

export const Avatar = 'w-[1.4rem] h-[1.4rem] rounded-full bg-[var(--color-G7)]';

export const Nick = 'text-[1.1rem] font-[500] text-[var(--color-G1)]';

export const CalendarWrap = 'px-[2.4rem]';

export const WeekRow =
  'w-full grid grid-cols-7 text-center text-[1.4rem] font-[500] text-[var(--color-G1)]';

export const WeekCell = 'mb-[2rem]';

export const DayGrid = 'w-full grid grid-cols-7 gap-y-[1.6rem]';

export const WeekDivider = '';

export const DayCell = 'flex flex-col items-center h-[7.6rem] relative';

export const DayNumButton = (selected: boolean) =>
  [
    'w-[2.7rem] h-[2.7rem] rounded-full text-[1.4rem] font-[500] grid place-items-center p-0',
    selected
      ? 'border-[0.05rem] border-[var(--color-mainColor1)] bg-[var(--color-subColor5)] text-[var(--color-mainColor1)]'
      : 'border-none bg-transparent text-[var(--color-G1)]',
  ].join(' ');

export const SpendPill = (minus: boolean) =>
  [
    'mt-[0.5rem] px-[6px] h-[1.6rem] rounded-[0.5rem] text-[1rem] leading-none inline-flex items-center whitespace-nowrap text-[var(--color-subColor1)]',
    minus ? 'bg-[var(--color-subColor5)]' : 'bg-transparent',
  ].join(' ');

export const CalListSection =
  'p-[16px] bg-[#f0fff9] rounded-t-[16px] mt-[-300px] pb-[190px]';

export const CalDateTitle = 'text-[16px] font-[700] mb-[12px]';

export const CalItemRow =
  'flex items-center gap-[12px] py-[12px] border-b border-[var(--color-G8)]';

export const CalMemo = 'flex-1 text-[14px]';

export const CalAmount = 'text-[14px] font-[600]';

export const CalDot =
  'flex-none w-[32px] h-[32px] rounded-full bg-[#f6f6f6] overflow-hidden flex items-center justify-center';

export const EmptyBoxSmall =
  'pt-[12px] pb-[24px] text-center text-[var(--color-G4)] text-[13px]';

export const SheetHandle =
  'w-[36px] h-[4px] rounded-[2px] bg-[var(--color-G4)] mx-auto mb-[12px]';

export const FloatingPlus =
  'absolute right-[18px] bottom-[24px] w-[52px] h-[52px] rounded-full bg-transparent border-0 p-0 cursor-pointer';
