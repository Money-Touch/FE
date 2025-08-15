export const Wrap =
  'w-full h-screen flex flex-col relative pt-[8.4rem] overflow-y-auto';

export const Body = '';

export const Section = 'mx-[2.4rem]';

export const Row = 'flex items-center gap-[0.6rem]';

export const Label = 'text-[1.8rem] font-medium text-[var(--color-G1)]';

export const Month = 'text-[2.6rem] font-bold text-[var(--color-G1)]';

export const IconBtn =
  'w-[2.4rem] h-[2.4rem] flex justify-center items-center cursor-pointer';

export const Divider =
  'w-full h-[0.7rem] bg-[var(--color-G8)] mt-[2.4rem] mb-[1.8rem]';

export const CatUl = 'flex flex-col gap-[1.4rem] mt-[1.4rem] mb-[4.7rem]';

export const CatLi = (editable: boolean) =>
  [
    'w-full h-[2.6rem] flex justify-between items-center',
    'text-[1.8rem] font-medium text-[var(--color-G1)]',
    editable ? 'cursor-pointer' : '',
  ].join(' ');

export const CatPrimary = 'text-[1.5rem] text-[var(--color-G5)]';

export const EditWrapper = 'w-[14rem] h-full flex items-center';

export const EditInput =
  'flex-1 text-[1.8rem] font-medium text-[var(--color-G1)] border-b border-b-[var(--color-mainColor1)] text-right';

export const PlusBtnContainer = 'w-full flex justify-end';

export const PlusBtn = 'cursor-pointer';

export const ConfirmBtn = (disabled?: boolean) =>
  [
    'w-full h-[5rem] mt-[2.3rem] mb-[16.4rem] rounded-[1rem]',
    'text-[1.8rem] font-medium text-white cursor-pointer',
    disabled
      ? 'bg-[var(--color-G6)] pointer-events-none'
      : 'bg-[var(--color-mainColor1)] pointer-events-auto',
  ].join(' ');

// 모달 오버레이/박스
export const Dim =
  'w-full max-w-[425px] absolute inset-0 z-[999] bg-[rgba(17,17,17,0.6)] flex items-end overflow-y-auto';

export const Modal =
  'fixed w-full max-w-[425px] bg-white rounded-t-[1.5rem] flex flex-col animate-[slide-up_0.25s_ease]';

export const ModalHead = 'w-full px-[2.4rem] flex flex-col items-end';

export const ModalTitle =
  'w-full text-[2rem] font-medium text-[var(--color-G1)] mb-[2rem]';

export const Close = 'w-[2.4rem] h-[2.4rem] my-[2rem] mb-[3rem] cursor-pointer';

export const InputRow = 'w-full px-[2rem] relative';

export const Unit = 'absolute right-[4.5rem] text-[2.6rem] font-bold';

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
