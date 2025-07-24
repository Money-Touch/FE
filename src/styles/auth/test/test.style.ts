// onboarding.tsx
export const OnboardingTopContainer =
  'flex flex-col gap-[0.4rem] mb-[3.6rem] mt-[8.4rem] w-full';

export const OnboardingP = 'text-[1.6rem] font-medium text-[var(--color-G4)]';

export const ListOnboardingContainer = 'w-full flex flex-col gap-[3.2rem]';

export const ItemOnboardingContainer = 'w-full flex flex-col gap-[0.6rem]';

export const ItemOnboardingP =
  '	text-[1.5rem] font-medium text-[var(--color-G1)]';

export const ListSelectContainer = 'flex gap-[0.7rem] mb-[1.1rem] flex-wrap';

export const ItemSelectContainer = (selected: boolean) =>
  `px-[1.6rem] py-[0.7rem] rounded-[2rem] border-[0.1rem] text-[1.6rem] font-medium text-[var(--color-G2)] transition-all cursor-pointer ${
    selected
      ? 'border-[var(--color-mainColor1)] bg-[var(--color-subColor6)]'
      : 'border-[var(--color-G7)] bg-[var(--color-white)]'
  }`;

// mbti.tsx
export const MbtiP =
  'text-[2rem] font-bold text-[var(--color-G1)] mt-[13.6rem] mb-[4.4rem]';

export const MbtiImgDiv = 'w-[20.2rem] h-[20.2rem] bg-[var(--color-G7)]';

export const MbtiSkipP =
  'text-[1.1rem] font-light text-[var(--color-G1)] mt-[0.6rem] cursor-pointer';

// qna.tsx
export const NavbarContainer =
  'flex justify-center absolute top-[5.1rem] gap-[0.5rem]';

export const NavbarDot = (active: boolean) =>
  `${active ? 'w-[1.1rem] rounded-[0.3rem]' : 'w-[0.6rem] rounded-full'} h-[0.6rem] ${
    active ? 'bg-[var(--color-mainColor1)]' : 'bg-[var(--color-G7)]'
  }`;

// item-answer.tsx
export const AnswerButton = (selected: boolean) =>
  `w-[37.7rem] h-[4.5rem] rounded-[0.5rem] border-[0.1rem] text-[1.4rem] font-medium text-[var(--color-G2)] cursor-pointer ${
    selected
      ? 'border-[var(--color-mainColor1)] bg-[var(--color-subColor6)]'
      : 'border-[var(--color-G7)] bg-[var(--color-white)]'
  }`;

// spinner.tsx
export const SpinnerWrapper = 'w-full flex justify-center mt-[22.3rem]';

// resultForm.tsx
export const ResultFormContainer = 'flex flex-col items-center mt-[3.3rem]';

export const ResultImg =
  'w-[31.2rem] h-[32rem] bg-[var(--color-G7)] mt-[3.1rem] mb-[2.2rem]';
