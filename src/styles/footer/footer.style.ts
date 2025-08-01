// footer.tsx
export const FooterContainer =
  'w-full bg-white h-[13rem] rounded-t-[2rem] flex justify-center pt-[1.3rem] shadow-[0_0_0.2rem_0_rgba(0,0,0,0.16)]';

// list-footer.tsx
export const ListContainer = 'flex gap-[6rem]';

// item-footer.tsx
export const ItemContainer =
  'flex flex-col gap-[0.3rem] items-center cursor-pointer';

export const ItemImage = 'w-auto h-[2.8rem]';

export const ItemP = (active: boolean) =>
  `font-medium text-[1.2rem] text-[var(--color-G5)] ${active ? 'text-[var(--subColor1)]' : ''}`;
