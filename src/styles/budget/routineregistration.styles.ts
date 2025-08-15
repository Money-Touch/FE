export const Wrap = 'w-full h-screen flex flex-col relative pt-[8.4rem]';

export const Body = 'px-[2.4rem] overflow-y-auto';

export const InputWrapper = 'w-full flex flex-col gap-[0.3rem] relative';

export const Input =
  'w-full h-[3.4rem] text-[2rem] font-medium text-[var(--color-G1)] ' +
  'border-0 border-b border-b-[var(--color-G5)] focus:outline-none focus:border-b-[var(--color-mainColor1)]';

export const CircleClose =
  'w-[2.4rem] h-[2.4rem] absolute right-0 top-[0.5rem] cursor-pointer';

export const CharCount =
  'w-full text-right text-[var(--color-G3)] text-[1.2rem] font-light';

export const CharCountSpan = 'text-[var(--color-G5)]';

export const Label =
  'mt-[2.4rem] mb-[0.6rem] text-[1.5rem] font-medium text-[var(--color-G1)]';

export const LabelStar = 'ml-[0.2rem] text-[var(--color-M1)]';

export const TagsInBox =
  'w-full mb-[0.6rem] flex items-center flex-wrap gap-[0.6rem]';

export const PlusBtn = 'w-[1.8rem] h-[1.8rem] cursor-pointer';

export const TagInput =
  'py-[0.4rem] px-[0.5rem] text-[1.2rem] font-medium ' +
  'text-[var(--color-G3)] rounded-[0.5rem] border-0 box-border ' +
  'bg-[var(--color-subColor5)] leading-[1.6rem] ' +
  'min-w-0 max-w-full transition-[width] duration-75 ease-linear ' +
  'placeholder:text-[var(--color-G4)] focus:outline-none ' +
  'focus:[box-shadow:inset_0_0_0_1px_var(--color-mainColor1)] focus:bg-[#effaf6]';

export const MeasureSpan =
  'absolute invisible whitespace-pre pointer-events-none ' +
  'py-[0.4rem] px-[0.5rem] text-[1.2rem] font-medium leading-[1.6rem] ' +
  'box-border border-0 font-inherit';

export const Save = (disabled?: boolean) =>
  [
    'mt-[44.5rem] w-full h-[5rem] rounded-[1rem] text-[1.8rem] font-medium text-white cursor-pointer',
    disabled
      ? 'bg-[var(--color-G6)] pointer-events-none'
      : 'bg-[var(--color-mainColor1)] pointer-events-auto',
  ].join(' ');
