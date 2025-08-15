// onboarding.tsx
export const OnboardingTopContainer =
  'flex flex-col gap-[0.4rem] mb-[3.6rem] mt-[8.4rem] w-full';

export const OnboardingP =
  'w-full text-[1.6rem] font-medium text-[var(--color-G4)]';

export const ListOnboardingContainer =
  'w-full flex flex-col gap-[3.2rem] px-[2.4rem]';

export const ItemOnboardingContainer = 'w-full flex flex-col gap-[0.6rem]';

export const ItemOnboardingP =
  'w-full	text-[1.5rem] font-medium text-[var(--color-G1)]';

export const ListSelectContainer = 'flex gap-[0.7rem] mb-[1.1rem] flex-wrap';

export const ItemSelectContainer = (selected: boolean) =>
  `px-[1.6rem] py-[0.7rem] rounded-[2rem] border-[0.1rem] text-[1.6rem] font-medium text-[var(--color-G2)] transition-all cursor-pointer ${
    selected
      ? 'border-[var(--color-mainColor1)] bg-[var(--color-subColor6)]'
      : 'border-[var(--color-G7)] bg-[var(--color-white)]'
  }`;

// mbti.tsx
export const MbtiP =
  'text-[2rem] font-bold text-[var(--color-G1)] mt-[9.3rem] mb-[6.2rem] px-[2.4rem]';

export const MbtiImg = 'w-[34.658rem] h-[19.1rem]';

export const MbtiSkipP =
  'text-[1.1rem] font-light text-[var(--color-G1)] mt-[0.6rem] cursor-pointer';

// qna.tsx
export const NavbarContainer =
  'w-full flex justify-center absolute top-[5.1rem] gap-[0.5rem]';

export const NavbarDot = (active: boolean) =>
  `${active ? 'w-[1.1rem] rounded-[0.3rem]' : 'w-[0.6rem] rounded-full'} h-[0.6rem] ${
    active ? 'bg-[var(--color-mainColor1)]' : 'bg-[var(--color-G7)]'
  }`;

// item-answer.tsx
export const AnswerButton = (selected: boolean) =>
  `w-full h-[4.5rem] rounded-[0.5rem] border-[0.1rem] text-[1.4rem] font-medium text-[var(--color-G2)] cursor-pointer ${
    selected
      ? 'border-[var(--color-mainColor1)] bg-[var(--color-subColor6)]'
      : 'border-[var(--color-G7)] bg-[var(--color-white)]'
  }`;

// spinner.tsx
export const SpinnerWrapper = 'w-full flex justify-center mt-[23.2rem]';

export const SpinnerImg = 'w-[30.1rem] h-[30rem]';

// resultForm.tsx
export const ResultFormContainer =
  'w-[35.7rem] h-[48.9rem] rounded-[1rem] flex flex-col bg-[rgba(255,255,255,0.23)] backdrop-blur-md items-center py-[4.2rem] mt-[4.7rem]';

export const ResultImg = 'w-[20rem] h-[20.6rem] mt-[3.4rem] mb-[4.8rem]';
