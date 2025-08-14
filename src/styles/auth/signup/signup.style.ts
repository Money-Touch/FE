import type { InputButtonProps } from '../../../types/auth/signup/setting';

// signup.tsx
export const SignupContainer = 'flex w-full';

// agree.tsx
export const AgreeContainer = 'flex flex-col items-center w-full h-full ';

export const AgreeP =
  'w-full text-[2.4rem] font-bold text-[var(--color-G1)] leading-[3.4rem] mt-[2.8rem]  px-[2.4rem]';

export const BottomContainer =
  'w-full mt-[18.4rem] flex flex-col items-center gap-[1rem]  px-[2.4rem]';

export const NextButton = (active: boolean) =>
  `w-full h-[5rem] rounded-[1rem] text-[1.8rem] font-medium text-[var(--color-white)] ${
    active
      ? 'bg-[var(--color-mainColor1)] cursor-pointer'
      : 'bg-[var(--color-G6)] cursor-not-allowed'
  }`;

export const BottomP =
  'text-[1.1rem] font-light text-[var(--color-G6)] leading-[1.4rem] text-center';

// agreeForm.tsx
export const AgreeFormContainer =
  'w-full  px-[2.4rem] flex flex-col gap-[2.2rem] mt-[6rem]';

export const AgreeItemContainer = 'flex items-center gap-[1rem] cursor-pointer';

export const CheckImg = 'w-[2rem] h-[2rem]';

export const ItemP = 'text-[1.8rem] font-medium text-[var(--color-G1)]';

export const AgreeBar = 'w-full h-[0.1rem] bg-[var(--color-G7)]';

// list-agree.tsx
export const ListContainer = 'flex flex-col gap-[1.8rem]';

// settingForm.tsx
export const Container =
  'w-full px-[2.4rem] mt-[2.6rem] flex flex-col gap-[3.2rem]';

export const InputWrapper = 'w-full flex flex-col gap-[0.6rem] relative';

// settingInput.tsx
export const Label =
  'text-[1.5rem] font-medium text-[var(--color-G2)] relative';

export const Wrapper = 'w-full flex items-center gap-[0.6rem] relative';

export const Input = ({ hasError, hasButton }: InputButtonProps): string =>
  `w-full h-[4.5rem] rounded-[0.5rem] border px-[1.5rem] text-[1.4rem] font-medium text-[var(--color-G1)] placeholder:text-[var(--color-G5)] ${
    hasError ? 'border-[var(--color-M1)]' : 'border-[var(--color-G7)]'
  } ${hasButton ? 'pr-[4rem]' : 'pr-[6.5rem]'}
  disabled:cursor-not-allowed  disabled:bg-[var(--color-G8)]
                      disabled:text-[var(--color-G5)]
  `;

export const Button = ({ hasError }: InputButtonProps): string => `
  w-[8.3rem] h-[4.5rem] rounded-[0.5rem] text-[1.4rem] font-medium whitespace-pre-line ${
    hasError
      ? 'bg-[var(--color-G7)] text-[var(--color-G5)] cursor-not-allowed'
      : 'bg-[var(--color-mainColor1)] text-[var(--color-white)] cursor-pointer'
  }
    disabled:bg-[var(--color-G7)] disabled:text-[var(--color-G5)]
  disabled:cursor-not-allowed`;

export const Error =
  'absolute bottom-[-1.7rem] text-[1.1rem] font-light text-[var(--color-M1)]';

// settingInputIcon.tsx
export const BaseIcon = 'w-[1.8rem] h-[1.8rem] absolute cursor-pointer';

export const DeleteIcon = ({ hasButton }: InputButtonProps): string =>
  `w-[1.8rem] h-[1.8rem] absolute cursor-pointer ${
    hasButton ? 'right-[8.5rem]' : 'right-[1.5rem]'
  }`;

export const ToggleIcon = ({ hasDelete }: InputButtonProps): string =>
  `w-[1.8rem] h-[1.8rem] absolute cursor-pointer ${
    hasDelete ? 'right-[4rem]' : 'right-[1.5rem]'
  }`;

// profileForm.tsx
export const ProfileFormContainer =
  'w-full px-[2.4rem] flex flex-col items-center gap-[2.5rem] mt-[6rem]';

// profileImage.tsx
export const Img =
  'w-[10.5rem] h-[10.5rem] rounded-[3.7rem] border border-[var(--color-G7)] cursor-pointer object-cover';

export const HiddenInput = 'hidden';

// success.tsx
export const SuccessMainP =
  'w-full text-[2.4rem] font-bold text-[var(--color-G1)] leading-[3.4rem] text-center mt-[13.8rem] mb-[15.5rem]';

export const SuccessImg = 'w-[17.5rem] h-[15.2rem]';

export const SuccessSubP =
  'w-full text-[1.2rem] font-medium text-[var(--color-G5)] mt-[2.3rem] text-center';
