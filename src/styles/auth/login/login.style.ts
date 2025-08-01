// login.tsx
export const LoginContainer = 'bg-[var(--color-B1)] flex flex-col items-center';

export const LogoContainer = 'flex items-end mt-[12.3rem]';

export const LogoImg = 'w-[6rem] h-[6rem]';

export const LogoP = 'text-[3rem] font-hakgyoB text-[var(--color-mainColor1)]';

// loginForm.tsx
export const LoginFormContainer = 'w-[37.7rem] flex flex-col gap-[1.6rem]';

export const InputContainer = 'flex flex-col gap-[0.6rem] mt-[5rem]';

export const LoginButton =
  'w-full h-[4.5rem] rounded-[0.5rem] cursor-pointer bg-[var(--color-G1)] text-[var(--color-white)] text-[1.5rem] font-medium';

// loginInput.tsx
export const InputWrapper = 'relative w-full';

export const InputBox =
  'w-full h-[4.5rem] rounded-[0.5rem] border-[0.1rem] border-[var(--color-G7)] px-[1.5rem] text-[1.4rem] font-medium text-[var(--color-G5)] placeholder:text-[var(--color-G5)]';

export const IconImg =
  'absolute right-[1.5rem] top-1/2 translate-y-[-50%] w-[1.8rem] h-[1.8rem] cursor-pointer';

// list-menu.tsx
export const ListMenuContainer = 'flex gap-[2.4rem] mt-[1.6rem] mb-[3rem]';

// item-menu.tsx
export const ItemP = (clickable: boolean) =>
  `text-[1.1rem] font-light text-[var(--color-G4)] ${clickable ? 'cursor-pointer' : 'cursor-default'}`;

// kakao.tsx
export const KakaoButton =
  'w-[37.7rem] h-[4.5rem] cursor-pointer bg-[var(--color-yellow)] px-[1rem] rounded-[0.5rem]';

export const InnerContainer =
  'flex items-center justify-center gap-[0.8rem] text-[1.5rem] font-medium text-[rgba(0,0,0,0.85)]';

export const KakaoIconImg = 'w-[2.4rem] h-[2.4rem]';
