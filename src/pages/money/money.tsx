import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import LeftArrowActive from '../../assets/images/budget/leftArrowActive.png';
import pencilIcon from '../../assets/images/budget/pencil.png';
import plusIcon from '../../assets/images/budget/Plus.png';
import minusIcon from '../../assets/images/budget/minus.png';
import arrowIconImg from '../../assets/images/budget/arrow.png';
import plusCircle from '../../assets/images/budget/Plus-2.png';
import basicImage from '../../assets/images/budget/basic2.png';
import emptyImage from '../../assets/images/budget/basic..png';
import starIcon from '../../assets/images/budget/star.png';
import cafeImage from '../../assets/images/budget/cafe.png';
import transportImage from '../../assets/images/budget/budget.png';
import eatImage from '../../assets/images/budget/eat.png';
import playImage from '../../assets/images/budget/play.png';
import fixedCostImage from '../../assets/images/budget/fixedcost.png';
import closeIcon from '../../assets/images/budget/Close.png';

import { useTotalQuery } from '../../hooks/money/money/useTotalQuery';
import { useMonthlyQuery } from '../../hooks/money/money/useMonthlyQuery';
import { useBudgetDetailQuery } from '../../hooks/money/registration/useBudgetDetailQuery';
import { useDailyDeleteMutation as callDailyDeleteMutation } from '../../hooks/money/money/useDailyDeleteMutation';
import { useMonthlyCalendarQuery } from '../../hooks/money/money/useMonthlyCalendarQuery';
import { useDailyCalendarQuery } from '../../hooks/money/money/useDailyCalendarQuery';
import { useFixedCostQuery } from '../../hooks/money/money/useFixedCostQuery';
import { useMypageQuery } from '../../hooks/auth/mypage/useMypageQuery';
import { useFixedCostDeleteMutation } from '../../hooks/money/fixedcost/useFixedCostDeleteMutation';
import {
  useMyRoutinesQuery,
  type RoutineItem as RoutineListItem,
} from '../../hooks/money/routine/useMyRoutinesQuery';

import * as A from '../../styles/budget/money.styles';

const TAB_LIST = ['일일', '달력', '고정비', '소비 루틴'] as const;
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'] as const;

const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const categoryImages: Record<string, string> = {
  카페: cafeImage,
  교통: transportImage,
  '배달/외식': eatImage,
  기타: playImage,
  '패션/쇼핑': playImage,
  고정비: fixedCostImage,
};

type RoutineItemWithLegacyImage = RoutineListItem & {
  routineImageUrl?: string;
};
function resolveRoutineImageUrl(item: RoutineListItem): string {
  const r = item as RoutineItemWithLegacyImage;
  return r.routineImgUrl ?? r.routineImageUrl ?? '';
}

type ApiResponse<T = unknown> = {
  isSuccess: boolean;
  message?: string;
  result?: T;
};

function errorMessage(err: unknown, fallback = '삭제에 실패했습니다.'): string {
  if (err instanceof Error) return err.message || fallback;
  if (typeof err === 'string') return err || fallback;
  return fallback;
}

const Money = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<(typeof TAB_LIST)[number]>('일일');
  const [deleteMode, setDeleteMode] = useState(false);
  const [fixedDel, setFixedDel] = useState(false);

  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [removedFixedIds, setRemovedFixedIds] = useState<Set<number>>(
    new Set(),
  );
  const [deletingFixedId, setDeletingFixedId] = useState<number | null>(null);

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState('');
  const [dragOffset, setDragOffset] = useState(0);
  const [anim, setAnim] = useState(false);
  const startYRef = useRef(0);
  const sheetOpen = !!selectedDate;

  const { data: mypageData } = useMypageQuery();
  const nickname: string =
    (mypageData?.isSuccess && mypageData?.result?.nickname) || '라인';

  const targetYear = calYear;
  const targetMonth = calMonth + 1;

  const { data: totalData } = useTotalQuery(targetYear, targetMonth);
  const totalAmount = totalData?.result?.budgetId;
  const { data } = useBudgetDetailQuery(totalAmount || 0);

  const isDaily = activeTab === '일일';
  const {
    data: monthlyData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMonthlyQuery(targetYear, targetMonth, isDaily);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 0.5 },
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: calendarData } = useMonthlyCalendarQuery(
    targetYear,
    targetMonth,
  );

  const selectedYear = selectedDate
    ? new Date(selectedDate).getFullYear()
    : undefined;
  const selectedMonth = selectedDate
    ? new Date(selectedDate).getMonth() + 1
    : undefined;
  const selectedDay = selectedDate
    ? new Date(selectedDate).getDate()
    : undefined;

  const { data: dailyData } = useDailyCalendarQuery(
    selectedYear ?? 0,
    selectedMonth ?? 0,
    selectedDay ?? 0,
    Boolean(selectedDate),
  );

  const {
    data: fixedListData,
    fetchNextPage: fetchNextFixed,
    hasNextPage: hasNextFixed,
    isFetchingNextPage: isFetchingNextFixed,
  } = useFixedCostQuery();

  const fixedItems = useMemo(
    () => fixedListData?.pages.flatMap((p) => p.result.fixedConsumptions) ?? [],
    [fixedListData],
  );

  const fixedLoadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (activeTab !== '고정비') return;
    if (!hasNextFixed || isFetchingNextFixed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextFixed();
      },
      { threshold: 0.5 },
    );

    const target = fixedLoadMoreRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [activeTab, hasNextFixed, isFetchingNextFixed, fetchNextFixed]);

  const isCurrentMonth =
    calYear === today.getFullYear() && calMonth === today.getMonth();

  const prevMonth = () => {
    const m = calMonth - 1;
    if (m < 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else {
      setCalMonth(m);
    }
    setSelectedDate('');
  };

  const nextMonth = () => {
    if (isCurrentMonth) return;
    const m = calMonth + 1;
    if (m > 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else {
      setCalMonth(m);
    }
    setSelectedDate('');
  };

  const firstDay = new Date(calYear, calMonth, 1);
  const firstWeekday = firstDay.getDay();
  const lastDate = new Date(calYear, calMonth + 1, 0).getDate();
  const calendarCells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ] as (number | null)[];

  const toggleDate = (d: string) =>
    setSelectedDate((prev) => (prev === d ? '' : d));

  useEffect(() => {
    const tab = (location.state as { tab?: string } | null)?.tab;
    if (tab && (TAB_LIST as readonly string[]).includes(tab)) {
      setActiveTab(tab as (typeof TAB_LIST)[number]);
    }
  }, [location.state]);

  const deleteEntry = async (id: number) => {
    try {
      setDeletingId(id);
      const res = (await callDailyDeleteMutation(id)) as ApiResponse<unknown>;
      if (res?.isSuccess) {
        setRemovedIds((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
        return;
      }
      alert(res?.message || '삭제에 실패했습니다.');
    } catch (err: unknown) {
      console.error('삭제 실패', err);
      alert(errorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const { mutate: deleteFixedCostMutate } = useFixedCostDeleteMutation();

  const deleteFixed = async (id: number) => {
    try {
      setDeletingFixedId(id);
      await new Promise<void>((resolve, reject) => {
        deleteFixedCostMutate(id, {
          onSuccess: (res: ApiResponse<unknown>) => {
            if (res?.isSuccess) resolve();
            else reject(new Error(res?.message || '삭제 실패'));
          },
          onError: (e: unknown) => reject(e),
        });
      });
      setRemovedFixedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    } catch (e: unknown) {
      console.error(e);
      alert(errorMessage(e));
    } finally {
      setDeletingFixedId(null);
    }
  };

  const totalBudgetAmt = data?.result?.totalBudget ?? 0;

  // 서버가 알려준 변동/고정 합계
  const serverVariableUsedAmt = totalData?.result?.totalConsumptionAmount ?? 0;
  const serverFixedUsedAmt =
    fixedListData?.pages?.reduce((sum, page) => {
      const list = page?.result?.fixedConsumptions ?? [];
      const pageSum = list.reduce(
        (s: number, it: { amount?: number }) => s + (it?.amount ?? 0),
        0,
      );
      return sum + pageSum;
    }, 0) ?? 0;

  // 방금 삭제한 일일 항목들의 금액 합계
  const removedDailySum = useMemo(() => {
    if (!monthlyData?.pages?.length) return 0;
    let sum = 0;
    for (const p of monthlyData.pages) {
      for (const day of p.result.monthlyHistory) {
        for (const item of day.items) {
          if (removedIds.has(item.consumptionRecordId)) {
            sum += item.amount ?? 0;
          }
        }
      }
    }
    return sum;
  }, [monthlyData, removedIds]);

  const removedFixedSum = useMemo(() => {
    if (!fixedItems.length) return 0;
    return fixedItems.reduce((acc, it) => {
      return (
        acc +
        (removedFixedIds.has(it.fixedConsumptionId) ? (it.amount ?? 0) : 0)
      );
    }, 0);
  }, [fixedItems, removedFixedIds]);

  const variableUsedAmt = Math.max(0, serverVariableUsedAmt - removedDailySum);
  const fixedUsedAmt = Math.max(0, serverFixedUsedAmt - removedFixedSum);
  const usedAmt = variableUsedAmt + fixedUsedAmt;

  const fillPercent = totalBudgetAmt
    ? Math.min((usedAmt / totalBudgetAmt) * 100, 100)
    : 0;

  const selectedList = selectedDate
    ? (dailyData?.pages.flatMap((page) => page.result.items) ?? [])
    : [];

  const onDragStart = (e: React.PointerEvent) => {
    if (!sheetOpen) return;
    setAnim(false);
    startYRef.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!sheetOpen || startYRef.current === 0) return;
    const dy = e.clientY - startYRef.current;
    if (dy > 0) setDragOffset(dy);
  };

  const onDragEnd = (e: React.PointerEvent) => {
    if (!sheetOpen) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setAnim(true);
    if (dragOffset > 80) setSelectedDate('');
    setDragOffset(0);
    startYRef.current = 0;
  };

  const {
    data: routinesPages,
    fetchNextPage: fetchNextRoutines,
    hasNextPage: hasNextRoutines,
    isFetchingNextPage: isFetchingNextRoutines,
  } = useMyRoutinesQuery();

  const routines: RoutineListItem[] =
    routinesPages?.pages.flatMap((p) => p.result.routineList) ?? [];

  const routineLoadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (activeTab !== '소비 루틴') return;
    if (!hasNextRoutines || isFetchingNextRoutines) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextRoutines();
      },
      { threshold: 0.5 },
    );

    const target = routineLoadMoreRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [activeTab, hasNextRoutines, isFetchingNextRoutines, fetchNextRoutines]);

  return (
    <div className={A.Container}>
      <Header title="가계부" bgColor="bg-[var(--color-B1)]" />

      <main className={A.MainContainer}>
        <div className={A.TopContainer}>
          <section
            className={A.GreetingCard}
            style={{
              background:
                'linear-gradient(135deg, var(--color-subColor3) 0%, #4be3a5 100%)',
            }}
          >
            <p className={A.GreetText}>
              {nickname}
              <span className="font-medium">
                님!
                <br />
                소비 내역을 작성해 주세요.
              </span>
            </p>

            <img className={A.MiniCard} src={basicImage} alt="일러스트" />
          </section>

          <div className={A.MonthRow}>
            <img
              className={`${A.ArrowBtn}`}
              src={LeftArrowActive}
              alt="left"
              onClick={prevMonth}
            />
            <span className={A.MonthText}>{`${calMonth + 1}월`}</span>
            <img
              className={`${A.ArrowBtn} ${
                isCurrentMonth ? A.ArrowBtnDisabled : ''
              }`}
              style={{ transform: 'rotate(180deg)' }}
              src={LeftArrowActive}
              alt="right"
              onClick={nextMonth}
            />
          </div>

          <div className={A.TotalRow}>
            <p className={A.TotalSpent}>
              {comma(usedAmt)}원{' '}
              <span className={A.TotalSub}>
                <span className={A.TotalSlash}> / </span>
                {comma(totalBudgetAmt)}원
              </span>
            </p>
            <img
              className={A.EditBtn}
              src={pencilIcon}
              alt="edit"
              onClick={() =>
                navigate('/budget-register', {
                  state: {
                    year: targetYear,
                    month: targetMonth,
                    budgetId: totalData?.result?.budgetId,
                  },
                })
              }
            />
          </div>

          <div className={A.BudgetCardWrapper}>
            <div className={A.Summary}>
              {usedAmt > 0 ? (
                <p className={A.SummaryP}>
                  한 달 예산 {comma(totalBudgetAmt)}원 중{' '}
                  <span className={A.SummaryStrong}>{comma(usedAmt)}원 </span>
                  사용했어요!
                </p>
              ) : (
                <p className={A.SummaryP}>한 달 예산을 등록해주세요!</p>
              )}

              <div className={A.BarWrapper}>
                <div className={A.Bar}>
                  <div
                    className={A.Fill}
                    style={{
                      width: `${fillPercent}%`,
                      transition: 'width .4s ease',
                    }}
                  />
                </div>

                <div className={A.Below}>
                  <span
                    className={A.UsedAmountWrap}
                    style={{
                      left: `${Math.min(Math.max(fillPercent, 0), 100)}%`,
                    }}
                  >
                    <img
                      className={A.UsedAmountStar}
                      src={starIcon}
                      alt="star"
                    />
                    <span
                      style={{
                        visibility: fillPercent === 0 ? 'hidden' : 'visible',
                      }}
                    >
                      {comma(usedAmt)}원
                    </span>
                  </span>

                  <span
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: '-0.6rem',
                    }}
                  >
                    {comma(totalBudgetAmt)}원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        -{' '}
        <nav className={A.TabMenu}>
          <div className={A.TabItemMenu}>
            {TAB_LIST.map((t) => {
              const isActive = activeTab === t;
              return (
                <button
                  key={t}
                  className={A.TabItem}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                  {isActive && <span className={A.TabUnderline} />}
                </button>
              );
            })}
          </div>
        </nav>
        <div className={A.ContentArea}>
          {activeTab === '일일' && (
            <>
              <div className={A.ButtonContainer}>
                <img
                  onClick={() => navigate('/add-day')}
                  className={A.PlusBtn}
                  src={plusIcon}
                  alt="plus"
                />

                {(monthlyData?.pages?.[0]?.result?.monthlyHistory?.length ??
                  0) > 0 && (
                  <img
                    className={A.DeleteToggleBtn(deleteMode)}
                    src={minusIcon}
                    alt="minus"
                    onClick={() => setDeleteMode((v) => !v)}
                  />
                )}
              </div>

              {(monthlyData?.pages?.[0]?.result?.monthlyHistory?.length ?? 0) >
              0 ? (
                monthlyData?.pages?.map((page) =>
                  page.result.monthlyHistory.map((day) => {
                    const dateObj = new Date(day.date);
                    const dayNum = dateObj.getDate();
                    const wd = WEEKDAY[dateObj.getDay()];

                    const visibleItems = day.items.filter(
                      (item) => !removedIds.has(item.consumptionRecordId),
                    );

                    if (visibleItems.length === 0) return null;

                    return (
                      <section key={day.date} className={A.Section}>
                        <div className={A.DateRow}>
                          <span
                            className={A.DateText}
                          >{`${dayNum} ${wd}`}</span>
                        </div>

                        {visibleItems.map((item) => (
                          <div
                            key={item.consumptionRecordId}
                            className={A.ItemRow}
                          >
                            <div className={A.ItemRowLeft}>
                              <span
                                className={`${A.DotBase} ${
                                  deleteMode ? 'hidden' : 'flex'
                                }`}
                              >
                                {item.categoryName === '[고정비]' ||
                                item.categoryName === '고정비' ? (
                                  <img src={fixedCostImage} alt="고정비" />
                                ) : categoryImages[item.categoryName] ? (
                                  <img
                                    src={categoryImages[item.categoryName]}
                                    alt={item.categoryName}
                                  />
                                ) : (
                                  item.categoryName
                                )}
                              </span>
                              <span className="memo">{item.content}</span>
                            </div>

                            <div className={A.ItemRowRight}>
                              <span className="amount">
                                {comma(item.amount)}원
                              </span>

                              {deleteMode && (
                                <img
                                  className={A.DeleteBtn}
                                  src={closeIcon}
                                  alt="delete"
                                  onClick={() =>
                                    deleteEntry(item.consumptionRecordId)
                                  }
                                  style={{
                                    opacity:
                                      deletingId === item.consumptionRecordId
                                        ? 0.4
                                        : 1,
                                    pointerEvents:
                                      deletingId === item.consumptionRecordId
                                        ? 'none'
                                        : 'auto',
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </section>
                    );
                  }),
                )
              ) : (
                <div className={A.EmptyBox}>
                  <img
                    className={A.EmptyCircle}
                    src={emptyImage}
                    alt="비어 있음"
                  />
                  <p className={A.EmptyText}>등록된 소비 내역이 없어요.</p>
                </div>
              )}

              {hasNextPage && <div ref={loadMoreRef} style={{ height: 40 }} />}
            </>
          )}

          {activeTab === '달력' && (
            <>
              <div className={A.CalendarWrap}>
                <div className={A.WeekRow}>
                  {WEEKDAY.map((w) => (
                    <div className={A.WeekCell} key={w}>
                      {w}
                    </div>
                  ))}
                </div>

                <div className={A.DayGrid}>
                  {calendarCells.map((d, i) => {
                    if (!d)
                      return <div className={A.DayCell} key={`empty-${i}`} />;

                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(
                      2,
                      '0',
                    )}-${String(d).padStart(2, '0')}`;

                    const daySpent = calendarData?.result?.data?.[dateStr] ?? 0;
                    const isSelected = selectedDate === dateStr;

                    return (
                      <div className={A.DayCell} key={dateStr}>
                        <button
                          className={A.DayNumButton(isSelected)}
                          onClick={() => toggleDate(dateStr)}
                        >
                          {d}
                        </button>

                        {daySpent !== 0 && (
                          <span className={A.SpendPill(true)}>
                            -{comma(Math.abs(daySpent))}
                          </span>
                        )}

                        {(i + 1) % 7 === 0 &&
                          i + 1 !== calendarCells.length && (
                            <div className={A.WeekDivider} />
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <section
                  className={A.CalListSection}
                  style={{
                    transform: `translateY(${dragOffset}px)`,
                    transition: anim ? 'transform 0.25s ease' : 'none',
                  }}
                  onPointerDown={onDragStart}
                  onPointerMove={onDragMove}
                  onPointerUp={onDragEnd}
                >
                  <div className={A.SheetHandle} />

                  <h3 className={A.CalDateTitle}>
                    {new Date(selectedDate).getDate()}{' '}
                    {WEEKDAY[new Date(selectedDate).getDay()]}
                  </h3>

                  {selectedList.length ? (
                    selectedList
                      .filter(
                        (item) => !removedIds.has(item.consumptionRecordId),
                      )
                      .map((item) => (
                        <div
                          className={A.CalItemRow}
                          key={item.consumptionRecordId}
                        >
                          <span className={A.CalDot}>
                            {item.categoryName === '[고정비]' ||
                            item.categoryName === '고정비' ? (
                              <img src={fixedCostImage} alt="고정비" />
                            ) : categoryImages[item.categoryName] ? (
                              <img
                                src={categoryImages[item.categoryName]}
                                alt={item.categoryName}
                              />
                            ) : (
                              item.categoryName
                            )}
                          </span>
                          <span className={A.CalMemo}>{item.content}</span>
                          <span className={A.CalAmount}>
                            {comma(item.amount)}원
                          </span>
                        </div>
                      ))
                  ) : (
                    <div className={A.EmptyBoxSmall}>
                      해당 날짜에 기록이 없어요.
                    </div>
                  )}

                  <button
                    className={A.FloatingPlus}
                    onClick={() => navigate('/record')}
                  >
                    <img src={plusCircle} alt="add" />
                  </button>
                </section>
              )}
            </>
          )}

          {activeTab === '고정비' && (
            <>
              <div className={A.ButtonContainer}>
                <img
                  onClick={() => navigate('/fixed-cost')}
                  className={A.PlusBtn}
                  src={plusIcon}
                  alt="plus"
                />

                {fixedItems.length > 0 && (
                  <img
                    className={A.DeleteToggleBtn(fixedDel)}
                    src={minusIcon}
                    alt="minus"
                    onClick={() => setFixedDel((v) => !v)}
                  />
                )}
              </div>

              {fixedItems.length ? (
                <section className={A.Section2}>
                  {fixedItems
                    .filter((e) => !removedFixedIds.has(e.fixedConsumptionId))
                    .map((e) => (
                      <div key={e.fixedConsumptionId} className={A.ItemRow}>
                        <div className={A.ItemRowLeft}>
                          <span className={`${A.DotBase} flex`}>
                            <img src={fixedCostImage} alt="fixed cost" />
                          </span>
                          <span className="memo">
                            {e.memo || e.categoryName || ''}
                          </span>
                        </div>

                        <div className={A.ItemRowRight}>
                          <span className="amount">{comma(e.amount)}원</span>

                          {fixedDel && (
                            <img
                              className={A.DeleteBtn}
                              src={closeIcon}
                              alt="close"
                              onClick={() => deleteFixed(e.fixedConsumptionId)}
                              style={{
                                opacity:
                                  deletingFixedId === e.fixedConsumptionId
                                    ? 0.4
                                    : 1,
                                pointerEvents:
                                  deletingFixedId === e.fixedConsumptionId
                                    ? 'none'
                                    : 'auto',
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}

                  {hasNextFixed && (
                    <div ref={fixedLoadMoreRef} style={{ height: 40 }} />
                  )}
                </section>
              ) : (
                <div className={A.EmptyBox}>
                  <img
                    className={A.EmptyCircle}
                    src={emptyImage}
                    alt="비어 있음"
                  />
                  <p className={A.EmptyText}>등록된 고정비가 없어요.</p>
                </div>
              )}
            </>
          )}

          {activeTab === '소비 루틴' && (
            <>
              <div className={A.ButtonContainer}>
                <img
                  onClick={() =>
                    navigate('/money-routine', {
                      state: { budgetId: totalData?.result?.budgetId ?? 0 },
                    })
                  }
                  className={A.PlusBtn}
                  src={plusIcon}
                  alt="plus"
                />
              </div>

              {routines.length ? (
                <div className={A.RoutineCardList}>
                  {routines.map((r) => {
                    const date = new Date(r.createDate);
                    const dateStr = `${date.getFullYear()} • ${String(
                      date.getMonth() + 1,
                    ).padStart(2, '0')} • ${String(date.getDate()).padStart(
                      2,
                      '0',
                    )}`;

                    const imgUrl = resolveRoutineImageUrl(r);

                    return (
                      <button
                        key={r.routineId}
                        className={A.RoutineWideCard}
                        onClick={() =>
                          navigate(`/myroutine/${r.routineId}`, {
                            state: { from: 'money' },
                          })
                        }
                        style={{ overflow: 'visible' }}
                      >
                        <div
                          className={A.PreviewBox}
                          style={
                            imgUrl
                              ? {
                                  backgroundImage: `url(${imgUrl})`,
                                  backgroundSize: 'contain',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'left center',
                                  backgroundColor: '#fff',
                                }
                              : undefined
                          }
                        />

                        <div
                          className={A.RoutineContent}
                          style={{ overflow: 'visible' }}
                        >
                          <div className={A.DateLine}>{dateStr}</div>

                          <div
                            className={A.TitleRow}
                            style={{
                              overflow: 'visible',
                              alignItems: 'flex-start',
                            }}
                          >
                            <h3
                              className={A.TitleH3}
                              style={{
                                margin: 0,
                                lineHeight: 1.35,
                                paddingBottom: 2,
                                overflow: 'visible',
                                display: 'inline-block',
                              }}
                            >
                              {r.routineName}
                            </h3>
                            <img
                              className={A.ArrowIcon}
                              src={arrowIconImg}
                              alt="arrow"
                            />
                          </div>

                          <div className={A.TagsRow}>
                            {(r.hashtags ?? []).map((t) => {
                              const tag = t.startsWith('#') ? t : `#${t}`;
                              return (
                                <span className={A.Tag} key={tag}>
                                  {tag}
                                </span>
                              );
                            })}
                          </div>

                          <div className={A.UserRow}>
                            <div className={A.Avatar} />
                            <span className={A.Nick}>
                              {r.nickname || '라인'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {hasNextRoutines && (
                    <div ref={routineLoadMoreRef} style={{ height: 40 }} />
                  )}
                </div>
              ) : (
                <div className={A.EmptyBox}>
                  <img
                    className={A.EmptyCircle}
                    src={emptyImage}
                    alt="비어 있음"
                  />
                  <p className={A.EmptyText}>등록된 소비 루틴이 없어요.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Money;
