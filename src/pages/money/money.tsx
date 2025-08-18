import { useEffect, useState, useRef } from 'react';
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

const Money = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<(typeof TAB_LIST)[number]>('일일');
  const [deleteMode, setDeleteMode] = useState(false);
  const [fixedDel, setFixedDel] = useState(false);

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

  const fixedItems =
    fixedListData?.pages.flatMap((p) => p.result.fixedConsumptions) ?? [];

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
    if (tab && TAB_LIST.includes(tab as (typeof TAB_LIST)[number])) {
      setActiveTab(tab as (typeof TAB_LIST)[number]);
    }
  }, [location.state]);

  const deleteEntry = async (id: number) => {
    try {
      const res = await callDailyDeleteMutation(id);
      if (res.isSuccess) {
        alert('삭제 되었습니다.');
        window.location.reload();
      }
    } catch (err) {
      console.error('삭제 실패', err);
    }
  };

  const { mutate: deleteFixedCostMutate, isPending: isDeletingFixed } =
    useFixedCostDeleteMutation();

  const deleteFixed = (id: number) => {
    if (!window.confirm('해당 고정비를 삭제할까요?')) return;

    deleteFixedCostMutate(id, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          alert('삭제되었습니다.');
        } else {
          alert(res.message || '삭제에 실패했습니다.');
        }
      },
      onError: () => {
        alert('삭제에 실패했습니다.');
      },
    });
  };

  const totalBudgetAmt = data?.result?.totalBudget ?? 0;

  const variableUsedAmt = totalData?.result?.totalConsumptionAmount ?? 0;

  const fixedUsedAmt =
    fixedListData?.pages?.reduce((sum, page) => {
      const list = page?.result?.fixedConsumptions ?? [];
      const pageSum = list.reduce((s, it) => s + (it?.amount ?? 0), 0);
      return sum + pageSum;
    }, 0) ?? 0;

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
    <A.Container>
      <Header title="가계부" bgColor="bg-[var(--color-B1)]" />

      <A.MainContainer>
        <A.TopContainer>
          <A.GreetingCard>
            <A.GreetText>
              {nickname}
              <span>
                님!
                <br />
                소비 내역을 작성해 주세요.
              </span>
            </A.GreetText>

            <A.MiniCard src={basicImage} alt="일러스트" />
          </A.GreetingCard>

          <A.MonthRow>
            <A.ArrowBtn
              src={LeftArrowActive}
              alt="left"
              onClick={prevMonth}
              disabled={false}
            />
            <A.MonthText>{`${calMonth + 1}월`}</A.MonthText>
            <A.ArrowBtn
              style={{ transform: 'rotate(180deg)' }}
              src={LeftArrowActive}
              alt="right"
              onClick={nextMonth}
              disabled={isCurrentMonth}
            />
          </A.MonthRow>

          <A.TotalRow>
            <A.TotalSpent>
              {comma(usedAmt)}원
              <span>
                <span className="slash"> / </span>
                {comma(totalBudgetAmt)}원
              </span>
            </A.TotalSpent>
            <A.EditBtn
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
          </A.TotalRow>

          <A.BudgetCardWrapper>
            <A.Summary>
              {usedAmt > 0 ? (
                <A.SummaryP>
                  한 달 예산 {comma(totalBudgetAmt)}원 중{' '}
                  <span>{comma(usedAmt)}원 </span>
                  사용했어요!
                </A.SummaryP>
              ) : (
                <A.SummaryP>한 달 예산을 등록해주세요!</A.SummaryP>
              )}

              <A.BarWrapper>
                <A.Bar>
                  <A.Fill
                    style={{
                      width: `${fillPercent}%`,
                      transition: 'width .4s ease',
                    }}
                  />
                </A.Bar>

                <A.Below $fillPercent={fillPercent}>
                  <span className="used-amount">
                    <img src={starIcon} alt="star" />
                    <span>{comma(usedAmt)}원</span>
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
                </A.Below>
              </A.BarWrapper>
            </A.Summary>
          </A.BudgetCardWrapper>
        </A.TopContainer>

        <A.TabMenu>
          <A.TabItemMenu>
            {TAB_LIST.map((t) => (
              <A.TabItem
                key={t}
                $active={activeTab === t}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </A.TabItem>
            ))}
          </A.TabItemMenu>
        </A.TabMenu>

        <A.ContentArea>
          {activeTab === '일일' && (
            <>
              <A.ButtonContainer>
                <A.PlusBtn
                  onClick={() => navigate('/add-day')}
                  src={plusIcon}
                  alt="plus"
                />

                {(monthlyData?.pages?.[0]?.result?.monthlyHistory?.length ??
                  0) > 0 && (
                  <A.DeleteToggleBtn
                    src={minusIcon}
                    alt="minus"
                    $active={deleteMode}
                    onClick={() => setDeleteMode((v) => !v)}
                  />
                )}
              </A.ButtonContainer>

              {(monthlyData?.pages?.[0]?.result?.monthlyHistory?.length ?? 0) >
              0 ? (
                monthlyData?.pages?.map((page) =>
                  page.result.monthlyHistory.map((day) => {
                    const dateObj = new Date(day.date);
                    const dayNum = dateObj.getDate();
                    const wd = WEEKDAY[dateObj.getDay()];

                    return (
                      <A.Section key={day.date}>
                        <A.DateRow>
                          <span className="date">{`${dayNum} ${wd}`}</span>
                        </A.DateRow>

                        {day.items.map((item) => (
                          <A.ItemRow key={item.consumptionRecordId}>
                            <A.ItemRowLeft>
                              <A.Dot $hide={deleteMode}>
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
                              </A.Dot>
                              <span className="memo">{item.content}</span>
                            </A.ItemRowLeft>

                            <A.ItemRowRight>
                              <span className="amount">
                                {comma(item.amount)}원
                              </span>

                              {deleteMode && (
                                <A.DeleteBtn
                                  src={closeIcon}
                                  alt="delete"
                                  onClick={() =>
                                    deleteEntry(item.consumptionRecordId)
                                  }
                                />
                              )}
                            </A.ItemRowRight>
                          </A.ItemRow>
                        ))}
                      </A.Section>
                    );
                  }),
                )
              ) : (
                <A.EmptyBox>
                  <A.EmptyCircle src={emptyImage} alt="비어 있음" />
                  <A.EmptyText>등록된 소비 내역이 없어요.</A.EmptyText>
                </A.EmptyBox>
              )}

              {hasNextPage && <div ref={loadMoreRef} style={{ height: 40 }} />}
            </>
          )}

          {activeTab === '달력' && (
            <>
              <A.CalendarWrap>
                <A.WeekRow>
                  {WEEKDAY.map((w) => (
                    <A.WeekCell key={w}>{w}</A.WeekCell>
                  ))}
                </A.WeekRow>

                <A.DayGrid>
                  {calendarCells.map((d, i) => {
                    if (!d) return <A.DayCell key={`empty-${i}`} />;

                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(
                      2,
                      '0',
                    )}-${String(d).padStart(2, '0')}`;

                    const daySpent = calendarData?.result?.data?.[dateStr] ?? 0;
                    const isSelected = selectedDate === dateStr;

                    return (
                      <A.DayCell key={dateStr}>
                        <A.DayNumButton
                          $selected={isSelected}
                          onClick={() => toggleDate(dateStr)}
                        >
                          {d}
                        </A.DayNumButton>

                        {daySpent !== 0 && (
                          <A.SpendPill $minus={true}>
                            -{comma(Math.abs(daySpent))}
                          </A.SpendPill>
                        )}

                        {(i + 1) % 7 === 0 &&
                          i + 1 !== calendarCells.length && <A.WeekDivider />}
                      </A.DayCell>
                    );
                  })}
                </A.DayGrid>
              </A.CalendarWrap>

              {selectedDate && (
                <A.CalListSection
                  style={{
                    transform: `translateY(${dragOffset}px)`,
                    transition: anim ? 'transform 0.25s ease' : 'none',
                  }}
                  onPointerDown={onDragStart}
                  onPointerMove={onDragMove}
                  onPointerUp={onDragEnd}
                >
                  <A.SheetHandle />

                  <A.CalDateTitle>
                    {new Date(selectedDate).getDate()}{' '}
                    {WEEKDAY[new Date(selectedDate).getDay()]}
                  </A.CalDateTitle>

                  {selectedList.length ? (
                    selectedList.map((item) => (
                      <A.CalItemRow key={item.consumptionRecordId}>
                        <A.CalDot>
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
                        </A.CalDot>
                        <span className="memo">{item.content}</span>
                        <span className="amount">{comma(item.amount)}원</span>
                      </A.CalItemRow>
                    ))
                  ) : (
                    <A.EmptyBoxSmall>
                      해당 날짜에 기록이 없어요.
                    </A.EmptyBoxSmall>
                  )}

                  <A.FloatingPlus onClick={() => navigate('/record')}>
                    <img src={plusCircle} alt="add" />
                  </A.FloatingPlus>
                </A.CalListSection>
              )}
            </>
          )}

          {activeTab === '고정비' && (
            <>
              <A.ButtonContainer>
                <A.PlusBtn
                  onClick={() => navigate('/fixed-cost')}
                  src={plusIcon}
                  alt="plus"
                />

                {fixedItems.length > 0 && (
                  <A.DeleteToggleBtn
                    src={minusIcon}
                    alt="minus"
                    $active={fixedDel}
                    onClick={() => setFixedDel((v) => !v)}
                  />
                )}
              </A.ButtonContainer>

              {fixedItems.length ? (
                <A.Section2>
                  {fixedItems.map((e) => (
                    <A.ItemRow key={e.fixedConsumptionId}>
                      <A.ItemRowLeft>
                        <A.Dot>
                          <img src={fixedCostImage} alt="fixed cost" />
                        </A.Dot>
                        <span className="memo">
                          {e.memo || e.categoryName || ''}
                        </span>
                      </A.ItemRowLeft>

                      <A.ItemRowRight>
                        <span className="amount">{comma(e.amount)}원</span>

                        {fixedDel && (
                          <A.DeleteBtn
                            src={closeIcon}
                            alt="close"
                            onClick={() => deleteFixed(e.fixedConsumptionId)}
                            style={{
                              opacity: isDeletingFixed ? 0.6 : 1,
                              pointerEvents: isDeletingFixed ? 'none' : 'auto',
                            }}
                          />
                        )}
                      </A.ItemRowRight>
                    </A.ItemRow>
                  ))}

                  {hasNextFixed && (
                    <div ref={fixedLoadMoreRef} style={{ height: 40 }} />
                  )}
                </A.Section2>
              ) : (
                <A.EmptyBox>
                  <A.EmptyCircle src={emptyImage} alt="비어 있음" />
                  <A.EmptyText>등록된 고정비가 없어요.</A.EmptyText>
                </A.EmptyBox>
              )}
            </>
          )}

          {activeTab === '소비 루틴' && (
            <>
              <A.ButtonContainer>
                <A.PlusBtn
                  onClick={() =>
                    navigate('/money-routine', {
                      state: { budgetId: totalData?.result?.budgetId ?? 0 },
                    })
                  }
                  src={plusIcon}
                  alt="plus"
                />
              </A.ButtonContainer>

              {routines.length ? (
                <A.RoutineCardList>
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
                      <A.RoutineWideCard
                        key={r.routineId}
                        onClick={() =>
                          navigate(`/myroutine/${r.routineId}`, {
                            state: { from: 'money' },
                          })
                        }
                        style={{ overflow: 'visible' }}
                      >
                        <A.PreviewBox
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

                        <A.RoutineContent style={{ overflow: 'visible' }}>
                          <A.DateLine>{dateStr}</A.DateLine>

                          <A.TitleRow
                            style={{
                              overflow: 'visible',
                              alignItems: 'flex-start',
                            }}
                          >
                            <h3
                              className="title"
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
                            <A.ArrowIcon src={arrowIconImg} alt="arrow" />
                          </A.TitleRow>

                          <A.TagsRow>
                            {(r.hashtags ?? []).map((t) => {
                              const tag = t.startsWith('#') ? t : `#${t}`;
                              return (
                                <span className="tag" key={tag}>
                                  {tag}
                                </span>
                              );
                            })}
                          </A.TagsRow>

                          <A.UserRow>
                            <A.Avatar />
                            <span className="nick">{r.nickname || '라인'}</span>
                          </A.UserRow>
                        </A.RoutineContent>
                      </A.RoutineWideCard>
                    );
                  })}

                  {hasNextRoutines && (
                    <div ref={routineLoadMoreRef} style={{ height: 40 }} />
                  )}
                </A.RoutineCardList>
              ) : (
                <A.EmptyBox>
                  <A.EmptyCircle src={emptyImage} alt="비어 있음" />
                  <A.EmptyText>등록된 소비 루틴이 없어요.</A.EmptyText>
                </A.EmptyBox>
              )}
            </>
          )}
        </A.ContentArea>
      </A.MainContainer>
    </A.Container>
  );
};

export default Money;
