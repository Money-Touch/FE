// notify.tsx
export const Container = 'flex px-[2.4rem]';
export const NoNewNotice =
  'self-start h-[2.2rem]font-medium text-[1.4rem] leading-[2.2rem] text-[var(--color-G2)]';

// notificationList.tsx
export const List = (isRead: boolean) =>
  `w-[calc(100%+4.8rem)] flex px-[2.4rem] py-[1.5rem] ${
    isRead ? 'bg-[var(--color-white)]' : 'bg-[var(--color-subColor5)]'
  } items-start box-border gap-[8.3rem] cursor-pointer`;

export const Item = 'w-full h-[7.3rem] flex items-start justify-between';
export const Icon = 'w-[2.6rem] h-[2.6rem] flex-shrink-0';
export const Content = 'flex-1 min-w-0';
export const LeftSection = 'flex-1 min-w-0 flex flex-col';
export const IconTitleGroup = 'flex items-start gap-[0.8rem]';
export const TitleContentGroup = 'flex flex-col h-[7.3rem] flex-1';
export const MessageGroup = 'flex flex-col justify-between flex-1 min-h-0';
export const Title =
  'font-medium text-[1.5rem] h-[2.6rem] leading-[2.6rem] text-[var(--color-G1)]';
export const Message =
  'text-[1.1rem] font-light text-[var(--color-G2)] whitespace-pre-line';
export const DateText = 'font-light text-[1.1rem] text-[var(--color-G5)]';
export const Thumbnail =
  'w-[5.3rem] h-[5.3rem] rounded-[0.5rem] object-cover flex-shrink-0';
export const RightSection = 'flex items-center flex-shrink-0';

// highlightedMessage.tsx
export const SenderName = 'font-medium';
