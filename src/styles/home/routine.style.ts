// routine.tsx
export const Container = 'flex px-[2.4rem] pb-[1.5rem]';
export const SearchWrapper =
  'w-full h-[4.5rem] border border-[var(--color-G7)] rounded-[0.5rem] flex justify-between items-center px-[1.5rem] py-[1.2rem] bg-white';
export const SearchInput =
  'flex-1 h-[2.2rem] border-none outline-none text-[1.4rem] text-[var(--color-G1)] bg-transparent font-[Pretendard] font-light placeholder-[var(--color-G5)]';
export const SearchIcon = 'w-[2rem] h-[2rem] object-contain';
export const List = 'flex flex-col w-full gap-[1rem] mt-[1.5rem]';
export const Card =
  'flex items-start h-[10.6rem] rounded-[1.5rem] bg-white shadow-[0px_0px_10px_0px_#0000000d] cursor-pointer';
export const Left = 'ml-[1.1rem] mt-[1.1rem]';
export const Thumbnail =
  'w-[8.4rem] h-[8.4rem] rounded-[1rem] object-cover shadow-[0px_0px_10px_0px_#0000000d]';
export const Content = (isNew?: boolean) =>
  `flex-1 w-[25.6rem] h-[8.6rem] ml-[1.1rem] mr-[1.5rem] ${isNew ? 'mt-[0.9rem]' : 'mt-[1.1rem]'} gap-[1.8rem]`;
export const TopWrapper = 'flex flex-col h-[4.9rem]';
export const DateRow = (isNew?: boolean) =>
  `flex items-center ${isNew ? 'h-[1.4rem]' : 'h-[1rem]'}`;
export const Date =
  'text-[var(--color-G3)] font-light text-[0.8rem] text-center inline-block h-[1rem]';
export const DateDot =
  'w-[0.2rem] h-[0.2rem] mx-[0.3rem] object-contain align-middle inline-block';
export const NewBadge =
  'w-[3.2rem] h-full flex justify-center items-center rounded-[2rem] bg-[#ff828226] border border-[#ffadadcc] font-medium text-[0.8rem] text-[var(--color-M1)]';
export const Title =
  'flex justify-between items-center w-full h-[2.3rem] leading-[2.3rem] font-medium text-[1.5rem] text-[var(--color-G1)] cursor-default';
export const RightArrowImg = 'w-[2rem] h-[2rem] cursor-pointer';
export const HashtagList = 'flex h-[1.4rem] mt-[0.3rem] flex-wrap gap-[0.3rem]';
export const Hashtag = 'font-light text-[1.1rem] text-[var(--color-G4)]';
export const Author = 'flex items-center h-[1.4rem] gap-[0.6rem] mt-[1.8rem]';
export const ProfileImg = 'w-[1.4rem] h-[1.4rem] rounded-full object-cover';
export const AuthorName =
  'h-full flex items-center text-[var(--color-G1)] font-medium text-[1.1rem]';
export const NoResultWrapper =
  'w-full flex justify-center items-center mt-[7.3rem]';
export const NoResultImg = 'w-[14.8rem] h-[15.8rem]';

// routineDetail.tsx
export const Budget = 'w-full h-[6.1rem] flex flex-col items-start';
export const BudgetTitle =
  'h-[2.6rem] font-medium text-[1.8rem] text-[var(--color-G1)]';
export const BudgetAmount =
  'h-[3.5rem] font-bold text-[2.6rem] text-[var(--color-G1)]';
export const Line =
  'flex-none w-[calc(100%+4.8rem)] h-[0.7rem] mt-[2.4rem] bg-[var(--color-G8)]';
export const BudgetListWrapper =
  'h-[22.6rem] mt-[3rem] gap-[1.4rem] w-full flex flex-col';
export const BudgetItem = 'flex justify-between items-center h-[2.6rem]';
export const BudgetLabel = 'font-medium text-[1.5rem] text-[var(--color-G5)]';
export const BudgetAmountPerItem =
  'font-medium text-[1.8rem] text-[var(--color-G1)]';
export const BudgetButton = (disabled: boolean) =>
  `flex-none w-full h-[5rem] mt-[24.3rem] rounded-[1rem] ${
    disabled
      ? 'bg-[var(--color-G6)] cursor-default'
      : 'bg-[var(--color-mainColor1)] cursor-pointer'
  } text-white font-medium text-[1.8rem]`;
export const ErrorMessage =
  'w-full mt-[0.6rem] text-[1.1rem] text-[var(--color-M1)] text-center font-light';
