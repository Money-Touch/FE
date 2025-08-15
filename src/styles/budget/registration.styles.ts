export const Wrap = `relative w-full h-screen bg-[var(--color-B1)] flex flex-col items-center pt-[8.4rem] overflow-y-auto`;

export const Body = `w-full`;

export const Section = `flex flex-col w-full px-[2.4rem]`;

export const Label = `text-[1.8rem] font-medium text-[var(--color-G1)]`;

export const RowContainer = `w-full flex justify-between`;

export const Row = `flex items-center gap-[0.6rem]`;

export const Month = `text-[2.6rem] font-bold text-[var(--color-G1)]`;

export const IconBtn = `w-[2.4rem] h-[2.4rem] cursor-pointer`;

export const DeleteToggleBtn = (active: boolean) =>
  `w-[2.4rem] h-[2.4rem] cursor-pointer ${
    active ? 'text-[var(--color-mainColor1)]' : 'text-[var(--color-G3)]'
  }`;

export const Divider = `w-full h-[0.7rem] bg-[var(--color-G8)] my-[2.4rem]`;

export const CatUl = `mt-[1.4rem] flex flex-col gap-[1.4rem]`;

export const CatLi = (
  editable: boolean,
) => `flex justify-between items-center text-[1.5rem] font-medium text-[var(--color-G5)] 
              [&>span]:text-[1.8rem] [&>span]:text-[var(--color-G1)]
              ${editable ? 'cursor-pointer' : ''}`;

export const EditWrapper = `w-[14rem] flex items-center`;

export const EditInput = `w-full text-[1.8rem] font-medium text-[var(--color-G1)] border-b-[0.1rem]  border-[var(--color-mainColor1)] text-right`;

export const RightBox = `flex items-center gap-[2.8rem]`;

export const DeleteBtn = `w-[2.4rem] h-[2.4rem] cursor-pointer`;

export const PlusBtnContainer = `w-full flex justify-end px-[2.4rem] mt-[16.7rem] mb-[2.3rem]`;

export const PlusBtn = `cursor-pointer w-[5.8rem] h-[5.8rem]`;

export const ConfirmBtnContainer = `w-full px-[2.4rem]`;

export const ConfirmBtn = (disabled: boolean) =>
  `w-full h-[5rem] mb-[4.9rem] rounded-[1rem] text-[1.8rem] font-medium text-[var(--color-white)] ${disabled ? 'bg-[var(--color-G6)]' : 'bg-[var(--color-mainColor1)]'}
`;

// 모달
export const Dim = `w-full max-w-[425px] absolute inset-0 z-[999] bg-[rgba(17,17,17,0.6)] flex items-end overflow-y-auto`;

export const Modal = `fixed w-full max-w-[425px] bg-[var(--color-white)] rounded-t-[1.5rem] flex flex-col animate-slide-up`;

export const ModalHead = `w-full px-[2rem] flex flex-col items-end
  [&>span]:w-full 
  [&>span]:text-[2rem] 
  [&>span]:font-medium 
  [&>span]:text-[var(--color-G1)] 
  [&>span]:mb-[2rem]
`;

export const Close = `w-[2.4rem] h-[2.4rem] mt-[2rem] mb-[3rem] cursor-pointer`;

export const InputRow = `w-full px-[2rem] relative
  [&>span]:absolute 
  [&>span]:text-[2.6rem] 
  [&>span]:font-bold 
  [&>span]:right-[4.5rem]
`;

export const Money = (hasValue: boolean) =>
  `mb-[3rem] w-full h-[3.8rem] pr-[5.5rem] box-border border-b-[0.1rem] text-[2.6rem] font-bold ${
    hasValue ? 'border-[var(--color-mainColor1)]' : 'border-[var(--color-G1)]'
  }`;

export const InputIcon = `absolute r-[2rem] t-[1rem] w-[2rem] h-[2rem] cursor-pointer`;

export const Pad = `bg-[#f9f9f9] py-[1.8rem] px-[6.4rem] border-t-[0.1rem] border-[var(--color-G8)] grid grid-cols-3`;

export const Key = `w-full text-[3rem] font-medium text-[var(--color-G1)] mb-[2.2rem]`;

export const ApplyContainer = `w-full h-full px-[2.4rem] pb-[6.8rem] bg-[#f9f9f9]`;

export const Apply = (disabled: boolean) =>
  `w-full h-[5rem] rounded-[1rem] text-[1.8rem] font-medium text-[var(--color-white)] ${
    disabled ? 'bg-[var(--color-G6)]' : 'bg-[var(--color-mainColor1)]'
  }`;
