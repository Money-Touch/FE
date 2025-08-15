export const Wrap = `relative pt-[8.4rem] w-full h-[100vh] bg-[var(—color-white)] flex flex-col overflow-y-auto`;

export const Body = `px-[2.4rem]`;

export const InputWrapper = `w-full flex flex-col gap-[0.3rem] relative`;

export const Input = `w-full h-[3.4rem] text-[2rem] font-medium text-[var(—color-G1)] border-b-[0.1rem] border-[var(--color-G5)] focus:outline-none focus:border-[var(--color-mainColor1)]`;

export const CircleClose = `w-[2.4rem] h-[2.4rem] absolute r-0 top-[0.5rem] cursor-pointer`;

export const CharCount = `w-full text-right text-[var(--color-G3)] text-[1.2rem] font-light [&>span]:text-[var(--color-G5)]`;

export const SubmitBtnContainer = `w-full px-[2.4rem] mt-[52.2rem]`;

export const SubmitBtn = (disabled: boolean) => `
w-full h-[5rem] font-medium text-[1.8rem] text-[var(—color-white)] rounded-[1rem] ${
  disabled ? 'bg-[var(--color-G6)]' : 'bg-[var(--color-mainColor1)]'
}`;
