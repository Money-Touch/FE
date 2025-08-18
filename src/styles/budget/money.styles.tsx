import React from 'react';

const cx = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(' ');

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'pt-[8.4rem] pb-[13rem] w-full h-screen bg-[var(--color-B1)] flex flex-col items-center',
      p.className,
    )}
  />
);

export const MainContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => <div {...p} className={cx('overflow-y-auto w-full', p.className)} />;

export const TopContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => <div {...p} className={cx('w-full px-[2.4rem]', p.className)} />;

export const GreetingCard: React.FC<React.HTMLAttributes<HTMLElement>> = (
  p,
) => (
  <section
    {...p}
    style={{
      ...(p.style || {}),
      background:
        'linear-gradient(135deg, var(--color-subColor3) 0%, #4be3a5 100%)',
    }}
    className={cx(
      'w-full h-[11rem] rounded-[1.5rem] flex gap-[2.2rem] items-center mb-[2.4rem]',
      p.className,
    )}
  />
);

export const GreetText: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (
  p,
) => (
  <>
    <style>{`
      .greet-text span { font-weight: 500; }
    `}</style>
    <p
      {...p}
      className={cx(
        'greet-text ml-[3.9rem] text-[var(--color-white)] text-[2rem] font-[700] leading-[2.8rem]',
        p.className,
      )}
    />
  </>
);

export const MiniCard: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  p,
) => <img {...p} className={cx('w-[8.4rem] h-[9.2rem]', p.className)} />;

export const MonthRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx('flex w-full items-center gap-[0.4rem]', p.className)}
  />
);

type ArrowBtnProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  disabled?: boolean;
};
export const ArrowBtn: React.FC<ArrowBtnProps> = ({ disabled, ...p }) => (
  <img
    {...p}
    className={cx(
      'w-[2.4rem] h-[2.4rem] cursor-pointer',
      disabled && 'opacity-30 pointer-events-none',
      p.className,
    )}
  />
);

export const MonthText: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (
  p,
) => (
  <span
    {...p}
    className={cx(
      'text-[1.6rem] font-[500] text-[var(--color-G1)]',
      p.className,
    )}
  />
);

export const TotalRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'my-[0.6rem] w-full flex items-center gap-[0.5rem]',
      p.className,
    )}
  />
);

export const TotalSpent: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = (p) => (
  <>
    <style>{`
      .total-spent span { font-weight: 500; font-size: 1.8rem; color: var(--color-G4); }
      .total-spent .slash { font-size: 1.6rem; }
    `}</style>
    <p
      {...p}
      className={cx(
        'total-spent text-[2.4rem] font-[700] text-[var(--color-G1)]',
        p.className,
      )}
    />
  </>
);

export const EditBtn: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  p,
) => (
  <img
    {...p}
    className={cx(
      'w-[1.8rem] h-[1.8rem] cursor-pointer mt-[0.2rem]',
      p.className,
    )}
  />
);

export const BudgetCardWrapper: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (p) => (
  <div
    {...p}
    className={cx(
      'w-full h-[10.1rem] my-[0.6rem] mb-[2.4rem] px-[1.5rem] bg-[var(--color-white)] rounded-[1.5rem] shadow-[0_0_1rem_0_#0000000d] flex items-center justify-center',
      p.className,
    )}
  />
);

export const Summary: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'flex flex-col w-full items-center gap-[0.8rem]',
      p.className,
    )}
  />
);

export const SummaryP: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (
  p,
) => (
  <>
    <style>{`
      .summary-p span { font-weight: 700; color: var(--color-subColor3); }
    `}</style>
    <p
      {...p}
      className={cx(
        'summary-p w-full text-[1.4rem] font-[500] text-[var(--color-G3)]',
        p.className,
      )}
    />
  </>
);

export const BarWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'w-full relative h-[3.9rem] flex justify-center items-center',
      p.className,
    )}
  />
);

export const Bar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'w-[98%] h-[0.6rem] bg-[var(--color-G8)] rounded-[1rem] overflow-hidden',
      p.className,
    )}
  />
);

export const Fill: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'h-full bg-[var(--color-mainColor1)] rounded-[1rem] transition-[width] duration-200 ease-linear',
      p.className,
    )}
  />
);

type BelowProps = React.HTMLAttributes<HTMLDivElement> & {
  $fillPercent: number;
};
export const Below: React.FC<BelowProps> = ({ $fillPercent, ...p }) => {
  const safe = Math.min(Math.max($fillPercent, 0), 100);
  return (
    <>
      <style>{`
        .below .used-amount{
          position:absolute; bottom:-0.6rem; display:flex; flex-direction:column; align-items:center;
          left: var(--fill-left); transform: translateX(-50%);
        }
        .below .used-amount img{ width:1.6rem; height:1.5rem; margin-bottom:1.4rem; }
        .below .used-amount span{ visibility: var(--used-vis); }
      `}</style>
      <div
        {...p}
        className={cx(
          'below absolute left-[1%] w-[98%] bottom-0 text-[1.1rem] font-light text-[var(--color-G5)] pointer-events-none',
          p.className,
        )}
        style={{
          ...(p.style || {}),
          // @ts-expect-error CSS var
          '--fill-left': `${safe}%`,
          '--used-vis': safe === 0 ? 'hidden' : 'visible',
        }}
      />
    </>
  );
};

/* ---------------- Tabs ---------------- */

export const TabMenu: React.FC<React.HTMLAttributes<HTMLElement>> = (p) => (
  <nav
    {...p}
    className={cx(
      'w-full h-[4.3rem] flex justify-center rounded-t-[1.5rem] border-b border-[var(--color-G7)] shadow-[0_0_1rem_0_#0000000d]',
      p.className,
    )}
  />
);

export const TabItemMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx('flex gap-[5.6rem] justify-between pt-[1rem]', p.className)}
  />
);

type TabItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $active: boolean;
};
export const TabItem: React.FC<TabItemProps> = ({
  $active,
  children,
  ...p
}) => (
  <button
    {...p}
    className={cx(
      'text-[1.5rem] font-[500] relative pb-[0.6rem] cursor-pointer',
      p.className,
    )}
  >
    {children}
    {$active && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4.4rem] h-[0.4rem] bg-[var(--color-mainColor1)] rounded-[1rem]" />
    )}
  </button>
);

/* ---------------- Content ---------------- */

export const ContentArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'bg-[var(--color-white)] h-full w-full relative pt-[2.71rem]',
      p.className,
    )}
  />
);

export const ButtonContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'w-full flex justify-end pr-[2.4rem] gap-[1.6rem]',
      p.className,
    )}
  />
);

export const PlusBtn: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  p,
) => (
  <img
    {...p}
    className={cx('w-[2.4rem] h-[2.4rem] cursor-pointer', p.className)}
  />
);

type DeleteToggleBtnProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  $active?: boolean;
};
export const DeleteToggleBtn: React.FC<DeleteToggleBtnProps> = ({
  $active,
  className,
  ...rest
}) => (
  <img
    {...rest}
    className={cx(
      'w-[2.4rem] h-[2.4rem] cursor-pointer',
      $active && 'opacity-100',
      !$active && 'opacity-40',
      className,
    )}
  />
);

export const Section: React.FC<React.HTMLAttributes<HTMLElement>> = (p) => (
  <section
    {...p}
    className={cx(
      'py-[2rem] pr-[2.4rem] pl-[2.4rem] pb-[2.4rem] border-b border-[var(--color-G7)] last:border-b-0',
      p.className,
    )}
  />
);

export const Section2: React.FC<React.HTMLAttributes<HTMLElement>> = (p) => (
  <section
    {...p}
    className={cx(
      'py-[2rem] px-[2.4rem] flex flex-col gap-[1.8rem] border-b border-[var(--color-G7)] last:border-b-0',
      p.className,
    )}
  />
);

export const DateRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <>
    <style>{`.date-row .date{ font-size:1.4rem; font-weight:500; color: var(--color-G1); }`}</style>
    <div {...p} className={cx('date-row w-full mb-[1.9rem]', p.className)} />
  </>
);

export const ItemRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'w-full h-[4rem] flex items-center justify-between mb-[1.8rem] text-[1.5rem] font-[500] text-[var(--color-G1)] last:mb-0',
      p.className,
    )}
  />
);

export const ItemRowLeft: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div {...p} className={cx('flex items-center gap-[1.2rem]', p.className)} />
);

export const ItemRowRight: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div {...p} className={cx('flex items-center gap-[2.8rem]', p.className)} />
);

export const DeleteBtn: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  p,
) => (
  <img
    {...p}
    className={cx('cursor-pointer w-[2.4rem] h-[2.4rem]', p.className)}
  />
);

type DotProps = React.HTMLAttributes<HTMLSpanElement> & { $hide?: boolean };
export const Dot: React.FC<DotProps> = ({ $hide, ...p }) => (
  <span
    {...p}
    className={cx(
      'w-[4rem] h-[4rem] rounded-full',
      !$hide && 'flex',
      $hide && 'hidden',
      p.className,
    )}
  >
    {p.children}
  </span>
);

export const EmptyBox: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'my-[12.3rem] mb-[25.9rem] flex flex-col items-center justify-center text-center gap-[2rem]',
      p.className,
    )}
  />
);

export const EmptyCircle: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement>
> = (p) => (
  <img
    {...p}
    className={cx('w-[13.822rem] h-[13rem] mr-[1rem]', p.className)}
  />
);

export const EmptyText: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (
  p,
) => (
  <p
    {...p}
    className={cx(
      'text-[1.6rem] text-[var(--color-G1)] font-[500]',
      p.className,
    )}
  />
);

export const RoutineCardList: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'my-[1.8rem] mx-[2.4rem] flex flex-col gap-[1rem]',
      p.className,
    )}
  />
);

export const RoutineWideCard: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (p) => (
  <button
    {...p}
    className={cx(
      'w-full flex h-[10.6rem] px-[1.5rem] gap-[1.1rem] rounded-[1.5rem] bg-[var(--color-white)] shadow-[0_0_1rem_0_#0000000d] cursor-pointer justify-start items-center',
      p.className,
    )}
  />
);

export const PreviewBox: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'w-[8.4rem] h-[8.4rem] flex-none rounded-[1rem] bg-[var(--color-G8)] opacity-80 shadow-[0_0_1rem_0_#0000000d]',
      p.className,
    )}
  />
);

export const RoutineContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => <div {...p} className={cx('flex flex-col w-full', p.className)} />;

export const DateLine: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'text-[0.8rem] font-light text-[var(--color-G3)] text-left',
      p.className,
    )}
  />
);

export const TitleRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <>
    <style>{`.title-row .title{ font-size:1.5rem; font-weight:500; color:var(--color-G1); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }`}</style>
    <div
      {...p}
      className={cx('title-row flex items-center justify-between', p.className)}
    />
  </>
);

export const ArrowIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  p,
) => <img {...p} className={cx('w-[0.8rem] h-auto', p.className)} />;

export const TagsRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <>
    <style>{`.tags-row .tag{ font-size:1.1rem; font-weight:300; color:var(--color-G4); }`}</style>
    <div {...p} className={cx('tags-row flex gap-[0.6rem]', p.className)} />
  </>
);

export const UserRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <>
    <style>{`.user-row .nick{ font-size:1.1rem; font-weight:500; color:var(--color-G1); }`}</style>
    <div
      {...p}
      className={cx(
        'user-row flex items-center mt-[2.1rem] gap-[0.6rem]',
        p.className,
      )}
    />
  </>
);

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'w-[1.4rem] h-[1.4rem] rounded-full bg-[var(--color-G7)]',
      p.className,
    )}
  />
);

export const CalendarWrap: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => <div {...p} className={cx('px-[2.4rem]', p.className)} />;

export const WeekRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'w-full grid grid-cols-7 text-center text-[1.4rem] font-[500] text-[var(--color-G1)]',
      p.className,
    )}
  />
);

export const WeekCell: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div {...p} className={cx('mb-[2rem]', p.className)} />
);

export const DayGrid: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx('w-full grid grid-cols-7 gap-y-[1.6rem]', p.className)}
  />
);

export const WeekDivider: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => <div {...p} className={cx('', p.className)} />;

export const DayCell: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => (
  <div
    {...p}
    className={cx(
      'flex flex-col items-center h-[7.6rem] relative',
      p.className,
    )}
  />
);

type DayNumProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $selected: boolean;
};
export const DayNumButton: React.FC<DayNumProps> = ({ $selected, ...p }) => (
  <button
    {...p}
    className={cx(
      'w-[2.7rem] h-[2.7rem] rounded-full text-[1.4rem] font-[500] grid place-items-center p-0',
      $selected
        ? 'border-[0.05rem] border-[var(--color-mainColor1)] bg-[var(--color-subColor5)] text-[var(--color-mainColor1)]'
        : 'border-none bg-transparent text-[var(--color-G1)]',
      p.className,
    )}
  />
);

type SpendPillProps = React.HTMLAttributes<HTMLSpanElement> & {
  $minus: boolean;
};
export const SpendPill: React.FC<SpendPillProps> = ({ $minus, ...p }) => (
  <span
    {...p}
    className={cx(
      'mt-[0.5rem] px-[6px] h-[1.6rem] rounded-[0.5rem] text-[1rem] leading-none inline-flex items-center whitespace-nowrap text-[var(--color-subColor1)]',
      $minus ? 'bg-[var(--color-subColor5)]' : 'bg-transparent',
      p.className,
    )}
  />
);

export const CalListSection: React.FC<React.HTMLAttributes<HTMLElement>> = (
  p,
) => (
  <section
    {...p}
    className={cx(
      'p-[16px] bg-[#f0fff9] rounded-t-[16px] mt-[-300px] pb-[190px]',
      p.className,
    )}
  />
);

export const CalDateTitle: React.FC<
  React.HTMLAttributes<HTMLHeadingElement>
> = (p) => (
  <h3 {...p} className={cx('text-[16px] font-[700] mb-[12px]', p.className)} />
);

export const CalItemRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <>
    <style>{`.cal-item .memo{flex:1; font-size:14px;} .cal-item .amount{font-size:14px; font-weight:600;}`}</style>
    <div
      {...p}
      className={cx(
        'cal-item flex items-center gap-[12px] py-[12px] border-b border-[var(--color-G8)]',
        p.className,
      )}
    />
  </>
);

export const CalDot: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (p) => (
  <span
    {...p}
    className={cx(
      'flex-none w-[32px] h-[32px] rounded-full bg-[#f6f6f6] overflow-hidden flex items-center justify-center',
      p.className,
    )}
  />
);

export const EmptyBoxSmall: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'pt-[12px] pb-[24px] text-center text-[var(--color-G4)] text-[13px]',
      p.className,
    )}
  />
);

export const SheetHandle: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  p,
) => (
  <div
    {...p}
    className={cx(
      'w-[36px] h-[4px] rounded-[2px] bg-[var(--color-G4)] mx-auto mb-[12px]',
      p.className,
    )}
  />
);

export const FloatingPlus: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (p) => (
  <button
    {...p}
    className={cx(
      'absolute right-[18px] bottom-[24px] w-[52px] h-[52px] rounded-full bg-transparent border-0 p-0 cursor-pointer',
      p.className,
    )}
  />
);
