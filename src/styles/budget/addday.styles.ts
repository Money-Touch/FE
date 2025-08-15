import styled, { createGlobalStyle } from 'styled-components';

export const AddDayTWGlobals = createGlobalStyle`
  @keyframes slide-up { from { transform: translateY(100%);} to { transform: translateY(0);} }
  .animate-slide-up { animation: slide-up 0.25s ease both; }
`;

export const Wrap = styled.div.attrs({
  className: 'relative w-full min-h-[100vh] flex flex-col',
})``;

export const Body = styled.main.attrs({
  className: 'w-full',
})``;

export const Section = styled.section.attrs({
  className: 'mt-[2.6rem] mb-[2.4rem] px-[2.4rem]',
})``;

export const Label2 = styled.p.attrs({
  className:
    'text-[1.8rem] font-[500] text-[var(--color-G1)] ' +
    '[&>span]:ml-[0.2rem] [&>span]:text-[var(--color-M1)]',
})``;

export const Row = styled.div.attrs({
  className: 'w-full',
})``;

export const Label = styled(Label2).attrs({
  className:
    'mb-[0.6rem] text-[1.5rem] font-[500] text-[var(--color-G1)] ' +
    '[&>span]:ml-[0.2rem] [&>span]:text-[var(--color-M1)]',
})``;

export const AmountBtn = styled.button.attrs({
  className:
    'flex items-center gap-[0.6rem] text-[2.6rem] font-[700] text-[var(--color-G1)] ' +
    '[&>img]:w-[2.4rem] [&>img]:h-[2.4rem] [&>img]:cursor-pointer',
})``;

export const Divider = styled.div.attrs({
  className: 'w-full h-[0.7rem] bg-[var(--color-G8)]',
})``;

export const CatBox = styled.div.attrs({
  className: 'w-full flex flex-wrap gap-[1rem] mb-[2.4rem]',
})``;

export const CatBtn = styled.button.attrs<{ $on: boolean }>((p) => ({
  className:
    'px-[1.4rem] py-[0.7rem] rounded-[2rem] text-[1.4rem] ' +
    (p.$on
      ? 'bg-[var(--color-mainColor1)] text-white border border-transparent'
      : 'bg-white text-[var(--color-G2)] border border-[var(--color-G7)]'),
}))<{
  $on: boolean;
}>``;

export const Input = styled.input.attrs({
  className:
    'w-full h-[4.5rem] px-[1.5rem] box-border ' +
    'border border-[var(--color-G7)] rounded-[0.5rem] ' +
    'text-[1.4rem] font-[300] mb-[2.4rem] ' +
    'placeholder:text-[var(--color-G5)]',
})``;

export const DeleteIcon = styled.img.attrs({
  className:
    'w-[2rem] h-[2rem] cursor-pointer absolute right-[1.5rem] top-[1.3rem]',
})``;

export const DateBtn = styled.button.attrs<{ $placeholder?: boolean }>((p) => ({
  className:
    'w-full h-[4.5rem] px-[1.5rem] text-left ' +
    'border border-[var(--color-G7)] rounded-[0.5rem] ' +
    'text-[1.4rem] font-[300] mb-[2.4rem] ' +
    (p.$placeholder ? 'text-[var(--color-G5)]' : 'text-[var(--color-G1)]'),
}))<{ $placeholder?: boolean }>``;

export const Textarea = styled.textarea.attrs({
  className:
    'w-full h-[18rem] p-[1.5rem] ' +
    'border border-[var(--color-G7)] rounded-[1rem] ' +
    'text-[1.4rem] font-[300] resize-none outline-none ' +
    'placeholder:text-[var(--color-G5)]',
})``;

export const Save = styled.button.attrs<{ disabled?: boolean }>((p) => ({
  className:
    'w-full mt-[6.6rem] h-[5rem] rounded-[1rem] ' +
    'text-[1.8rem] font-[500] text-white ' +
    (p.disabled
      ? 'bg-[var(--color-G6)] pointer-events-none'
      : 'bg-[var(--color-mainColor1)]'),
}))<{ disabled?: boolean }>``;

export const Dim = styled.div.attrs({
  className:
    'absolute inset-0 z-[999] bg-[rgba(17,17,17,0.6)] ' + 'flex items-end',
})``;

export const Modal = styled.div.attrs({
  className:
    'w-full bg-white rounded-t-[1.5rem] flex flex-col animate-slide-up',
})``;

export const ModalHead = styled.div.attrs({
  className:
    'w-full px-[2.4rem] flex flex-col items-end ' +
    '[&>span]:w-full [&>span]:text-[2rem] [&>span]:font-[500] ' +
    '[&>span]:text-[var(--color-G1)] [&>span]:mb-[2rem]',
})``;

export const Close = styled.img.attrs({
  className: 'w-[2.4rem] h-[2.4rem] mt-[2rem] mb-[3rem] cursor-pointer',
})``;

export const InputRow = styled.div.attrs({
  className:
    'w-full px-[2rem] relative ' +
    '[&>span]:absolute [&>span]:right-[4.5rem] ' +
    '[&>span]:text-[2.6rem] [&>span]:font-[700]',
})``;

export const Money = styled.input.attrs<{ hasValue: boolean }>((p) => ({
  className:
    'mb-[3rem] w-full h-[3.8rem] pr-[5.5rem] box-border ' +
    'text-[2.6rem] font-[700] border-b ' +
    (p.hasValue
      ? 'border-[var(--color-mainColor1)]'
      : 'border-[var(--color-G1)]'),
}))<{ hasValue: boolean }>``;

export const InputIcon = styled.img.attrs({
  className:
    'absolute right-[2rem] top-[1rem] w-[2rem] h-[2rem] cursor-pointer',
})``;

export const Pad = styled.div.attrs({
  className:
    'bg-[#f9f9f9] px-[6.4rem] pt-[1.8rem] ' +
    'border-t border-[var(--color-G8)] grid grid-cols-3',
})``;

export const Key = styled.button.attrs({
  className: 'w-full text-[3rem] font-[500] text-[var(--color-G1)] mb-[2.2rem]',
})``;

export const ApplyContainer = styled.div.attrs({
  className: 'w-full h-full px-[2.4rem] pb-[6.8rem] bg-[#f9f9f9]',
})``;

export const Apply = styled.button.attrs<{ disabled?: boolean }>((p) => ({
  className:
    'w-full h-[5rem] rounded-[1rem] text-[1.8rem] font-[500] text-white ' +
    (p.disabled ? 'bg-[var(--color-G6)]' : 'bg-[var(--color-mainColor1)]'),
}))<{ disabled?: boolean }>``;

export const DateModal = styled.div.attrs({
  className:
    'w-full bg-white rounded-t-[1.5rem] flex flex-col animate-slide-up ' +
    'px-[2.4rem] pb-[8.4rem]',
})``;

export const WheelWrap = styled.div.attrs({
  className:
    'relative grid ' +
    '[grid-template-columns:1.7fr_1fr_1fr_1fr] ' +
    'gap-[0.8rem] h-[14.6rem] mb-[4.7rem]',
})``;

export const WheelCol = styled.div.attrs({
  className:
    'relative h-full overflow-y-auto snap-y snap-mandatory ' +
    '[-ms-overflow-style:none] [scrollbar-width:none] ' +
    '[&::-webkit-scrollbar]:hidden',
})``;

export const WheelSpacer = styled.div.attrs({
  className: 'h-[5.3rem]',
})``;

export const WheelItem = styled.div.attrs<{ $active?: boolean }>((p) => ({
  className:
    'w-full h-[5.3rem] flex items-center justify-center ' +
    'text-[2rem] font-[500] snap-center ' +
    (p.$active ? 'text-[var(--color-G1)]' : 'text-[var(--color-G6)]'),
}))<{ $active?: boolean }>``;

export const WheelCenter = styled.div.attrs({
  className:
    'pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 ' +
    'h-[5.3rem] flex items-center justify-center ' +
    'rounded-[0.8rem] bg-[rgba(0,209,181,0.08)] ' +
    'outline outline-1 outline-[var(--color-mainColor1)]',
})``;
