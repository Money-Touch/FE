export const Wrap = 'w-full h-screen flex flex-col relative pt-[8.4rem]';

export const Body = 'w-full overflow-y-auto';

export const Section = 'mx-[2.4rem]';

export const Label2 = 'text-[1.8rem] font-medium text-[var(--color-G1)]';

export const Row = 'flex items-center gap-[0.6rem]';

export const AmountBtn =
  'flex items-center gap-[0.6rem] border-0 text-[2.6rem] font-bold text-[var(--color-G1)] cursor-pointer';

export const Divider =
  'w-full h-[0.7rem] bg-[var(--color-G8)] mt-[2.4rem] mb-[1.8rem]';

export const Label = 'text-[1.5rem] font-medium mb-[0.6rem]';

export const CatBox = 'w-full flex flex-wrap gap-[1rem] mb-[2.4rem]';

export const CatBtn = (on: boolean) =>
  [
    'py-[0.7rem] px-[1.4rem]',
    'border rounded-[2rem] text-[1.4rem] cursor-pointer',
    'border-[var(--color-G7)]',
    on
      ? 'bg-[var(--color-mainColor1)] text-white'
      : 'bg-white text-[var(--color-G2)]',
  ].join(' ');

export const Input =
  'w-full h-[4.5rem] px-[1.5rem] box-border border rounded-[0.5rem] text-[1.4rem] font-light text-[var(--color-G1)] mb-[2.4rem] placeholder:text-[var(--color-G5)] border-[var(--color-G7)]';

export const DeleteIcon =
  'w-[1.65rem] h-[1.65rem] cursor-pointer absolute right-[1.5rem] top-[1.3rem]';

export const Textarea =
  'w-full h-[18rem] p-[1.5rem] border rounded-[1rem] text-[1.4rem] font-light text-[var(--color-G1)] resize-none outline-none placeholder:text-[var(--color-G5)] border-[var(--color-G7)]';

export const Save = (disabled?: boolean) =>
  [
    'mt-[16.4rem] mb-[8.4rem] w-full h-[5rem] rounded-[1rem]',
    'text-[1.8rem] font-medium text-white cursor-pointer',
    disabled
      ? 'bg-[var(--color-G6)] pointer-events-none'
      : 'bg-[var(--color-mainColor1)] pointer-events-auto',
  ].join(' ');

export const Dim =
  'absolute inset-0 z-[999] bg-[rgba(17,17,17,0.6)] flex items-end';

export const Modal =
  'w-full bg-white rounded-t-[1.5rem] flex flex-col animate-[slide-up_0.25s_ease]';

export const ModalHead = 'w-full px-[2.4rem] flex flex-col items-end';

export const Close = 'w-[2.4rem] h-[2.4rem] my-[2rem] mb-[3rem] cursor-pointer';

export const InputRow = 'w-full px-[2rem] relative';

export const Money = (hasValue: boolean) =>
  [
    'mb-[3rem] w-full h-[3.8rem] pr-[5.5rem] box-border text-[2.6rem] font-bold',
    'border-b',
    hasValue
      ? 'border-b-[var(--color-mainColor1)]'
      : 'border-b-[var(--color-G1)]',
  ].join(' ');

export const InputIcon =
  'absolute right-[2rem] top-[1rem] w-[2rem] h-[2rem] cursor-pointer';

export const Pad =
  'bg-[#f9f9f9] py-[1.8rem] px-[6.4rem] border-t border-t-[var(--color-G8)] grid grid-cols-3';

export const Key =
  'w-full text-[3rem] font-medium text-[var(--color-G1)] mb-[2.2rem]';

export const ApplyContainer =
  'w-full h-full px-[2.4rem] pb-[6.8rem] bg-[#f9f9f9]';

export const Apply = (disabled?: boolean) =>
  [
    'w-full h-[5rem] rounded-[1rem] text-[1.8rem] font-medium text-white',
    disabled
      ? 'bg-[var(--color-G6)] pointer-events-none'
      : 'bg-[var(--color-mainColor1)] pointer-events-auto',
  ].join(' ');
