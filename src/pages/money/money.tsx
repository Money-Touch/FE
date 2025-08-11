import { useEffect, useState, useRef, useCallback } from 'react';
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
import { useDailyDeleteMutation } from '../../hooks/money/money/useDailyDeleteMutation';
import { useMonthlyCalendarQuery } from '../../hooks/money/money/useMonthlyCalendarQuery';
import { useDailyCalendarQuery } from '../../hooks/money/money/useDailyCalendarQuery';
import { useFixedCostQuery } from '../../hooks/money/money/useFixedCostQuery';

import {
  Container,
  TopContainer,
  GreetingCard,
  GreetText,
  MiniCard,
  MonthRow,
  ArrowBtn,
  MonthText,
  TotalRow,
  TotalSpent,
  EditBtn,
  BudgetCardWrapper,
  Summary,
  SummaryP,
  BarWrapper,
  Bar,
  Fill,
  Below,
  TabMenu,
  TabItemMenu,
  TabItem,
  ContentArea,
  ButtonContainer,
  PlusBtn,
  DeleteToggleBtn,
  Section,
  Section2,
  DateRow,
  ItemRow,
  ItemRowLeft,
  ItemRowRight,
  DeleteBtn,
  Dot,
  EmptyBox,
  EmptyCircle,
  EmptyText,
  RoutineCardList,
  RoutineWideCard,
  PreviewBox,
  RoutineContent,
  DateLine,
  TitleRow,
  ArrowIcon,
  TagsRow,
  UserRow,
  Avatar,
  CalendarWrap,
  WeekRow,
  WeekCell,
  DayGrid,
  WeekDivider,
  DayCell,
  DayNumButton,
  SpendPill,
  CalListSection,
  CalDateTitle,
  CalItemRow,
  CalDot,
  EmptyBoxSmall,
  SheetHandle,
  FloatingPlus,
} from '../../styles/budget/money.styles';

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

interface Entry {
  id: number;
  category: string;
  item: string;
  amount: number;
  date: string;
  memo: string;
}

interface Routine {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  createdAt?: string;
}

const Money = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<(typeof TAB_LIST)[number]>('일일');
  const [monthBudget, setMonthBudget] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [fixed, setFixed] = useState<Entry[]>([]);
  const [fixedDel, setFixedDel] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState('');
  const [dragOffset, setDragOffset] = useState(0);
  const [anim, setAnim] = useState(false);
  const startYRef = useRef(0);
  const sheetOpen = !!selectedDate;

  // 인서 추가
  const targetYear = calYear;
  const targetMonth = calMonth + 1;
  // console.log(targetYear, targetMonth);
  const { data: totalData } = useTotalQuery(targetYear, targetMonth);
  // console.log(totalData);
  const totalAmount = totalData?.result?.budgetId;
  // console.log(totalAmount);

  const { data } = useBudgetDetailQuery(totalAmount || 0);
  // console.log(data);

  const isDaily = activeTab === '일일';
  const {
    data: monthlyData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMonthlyQuery(targetYear, targetMonth, isDaily);

  // console.log(monthlyData);

  // 무한 스크롤
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 달력
  const { data: calendarData } = useMonthlyCalendarQuery(
    targetYear,
    targetMonth,
  );

  // 달력 세부
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

  // 고정비 목록 조회
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
        if (entries[0].isIntersecting) {
          fetchNextFixed();
        }
      },
      { threshold: 0.5 },
    );

    const target = fixedLoadMoreRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [activeTab, hasNextFixed, isFetchingNextFixed, fetchNextFixed]);
  //

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

  const loadEntries = () => {
    const raw = localStorage.getItem('dailyEntries');
    setEntries(raw ? JSON.parse(raw) : []);
  };
  const loadFixed = () => {
    const raw = localStorage.getItem('fixedEntries');
    setFixed(raw ? JSON.parse(raw) : []);
  };
  const loadRoutines = () => {
    try {
      const raw = localStorage.getItem('routineEntries');
      let list: Routine[] = raw ? JSON.parse(raw) : [];
      list = list.map((r) =>
        r.createdAt
          ? r
          : { ...r, createdAt: new Date(r.id || Date.now()).toISOString() },
      );
      setRoutines(list);
    } catch {
      setRoutines([]);
    }
  };

  const injectFixedToEntries = useCallback(() => {
    const now = new Date();
    const firstDayStr = `${now.getFullYear()}-${String(
      now.getMonth() + 1,
    ).padStart(2, '0')}-01`;

    const raw = localStorage.getItem('dailyEntries');
    const existing: Entry[] = raw ? JSON.parse(raw) : [];

    const alreadyInjected = existing.some(
      (e) => e.date === firstDayStr && e.memo === '[고정비]',
    );
    if (alreadyInjected) return;

    const injected = fixed.map((f) => ({
      id: Date.now() + Math.random(),
      date: firstDayStr,
      item: f.item,
      amount: f.amount,
      memo: f.memo,
      category: '고정비',
    }));

    const newList = [...existing, ...injected];
    localStorage.setItem('dailyEntries', JSON.stringify(newList));
    setEntries(newList);
  }, [fixed]);

  useEffect(() => {
    setMonthBudget(Number(localStorage.getItem('monthBudget') || 0));
    loadEntries();
    loadFixed();
    loadRoutines();
  }, []);

  useEffect(() => {
    injectFixedToEntries();
  }, [fixed]);

  useEffect(() => {
    const onFocus = () => {
      loadEntries();
      loadFixed();
      if (activeTab === '소비 루틴') loadRoutines();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === '소비 루틴') loadRoutines();
  }, [activeTab]);

  const deleteEntry = async (id: number) => {
    try {
      const res = await useDailyDeleteMutation(id);
      if (res.isSuccess) {
        alert('삭제 되었습니다.');
        window.location.reload();
        setEntries((prev) => {
          const next = prev.filter((e) => e.id !== id);
          if (!next.length) setDeleteMode(false);
          return next;
        });
      }
    } catch (err) {
      console.error('삭제 실패', err);
    }
  };

  const deleteFixed = (id: number) => {
    setFixed((prev) => {
      const next = prev.filter((e) => e.id !== id);
      localStorage.setItem('fixedEntries', JSON.stringify(next));
      if (!next.length) setFixedDel(false);
      return next;
    });
  };

  const totalSpent = [...entries, ...fixed].reduce((s, c) => s + c.amount, 0);
  const usedAbs = Math.abs(totalSpent);
  const fillPercent = monthBudget
    ? Math.min((usedAbs / monthBudget) * 100, 100)
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

  return (
    <Container>
      <Header title="가계부" />

      <TopContainer>
        <GreetingCard>
          <GreetText>
            라인
            <span>
              님!
              <br />
              소비 내역을 작성해 주세요.
            </span>
          </GreetText>

          <MiniCard src={basicImage} alt="일러스트" />
        </GreetingCard>

        <MonthRow>
          <ArrowBtn
            src={LeftArrowActive}
            alt="left"
            onClick={prevMonth}
            disabled={false}
          />

          <MonthText>{`${calMonth + 1}월`}</MonthText>

          <ArrowBtn
            style={{ transform: 'rotate(180deg)' }}
            src={LeftArrowActive}
            alt="right"
            onClick={nextMonth}
            disabled={isCurrentMonth}
          />
        </MonthRow>

        <TotalRow>
          <TotalSpent>
            {comma(totalData?.result?.totalConsumptionAmount ?? 0)}원
            <span>
              <span className="slash"> / </span>
              {comma(data?.result?.totalBudget ?? 0)}원
            </span>
          </TotalSpent>
          <EditBtn
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
        </TotalRow>

        <BudgetCardWrapper>
          <Summary>
            {(totalData?.result?.totalConsumptionAmount ?? 0) > 0 ? (
              <SummaryP>
                한 달 예산 {comma(data?.result?.totalBudget ?? 0)}원 중{' '}
                <span>
                  {comma(totalData?.result?.totalConsumptionAmount ?? 0)}원{' '}
                </span>
                사용했어요!
              </SummaryP>
            ) : (
              <SummaryP>한 달 예산을 등록해주세요!</SummaryP>
            )}

            <BarWrapper>
              <Bar>
                <Fill style={{ width: `${fillPercent}%` }} />
              </Bar>

              <Below $fillPercent={fillPercent}>
                <span className="used-amount">
                  <img src={starIcon} alt="star" />
                  <span>{comma(usedAbs)}원</span>
                </span>
                <span
                  style={{ position: 'absolute', right: 0, bottom: '-0.6rem' }}
                >
                  {comma(totalData?.result?.totalConsumptionAmount ?? 0)}원
                </span>
              </Below>
            </BarWrapper>
          </Summary>
        </BudgetCardWrapper>
      </TopContainer>

      <TabMenu>
        <TabItemMenu>
          {TAB_LIST.map((t) => (
            <TabItem
              key={t}
              $active={activeTab === t}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </TabItem>
          ))}
        </TabItemMenu>
      </TabMenu>

      <ContentArea>
        {activeTab === '일일' && (
          <>
            <ButtonContainer>
              <PlusBtn
                onClick={() => navigate('/add-day')}
                src={plusIcon}
                alt="plus"
              />

              {(monthlyData?.pages?.[0]?.result?.monthlyHistory?.length ?? 0) >
                0 && (
                <DeleteToggleBtn
                  src={minusIcon}
                  alt="minus"
                  $active={deleteMode}
                  onClick={() => setDeleteMode((v) => !v)}
                />
              )}
            </ButtonContainer>

            {(monthlyData?.pages?.[0]?.result?.monthlyHistory?.length ?? 0) >
            0 ? (
              monthlyData?.pages?.map((page) =>
                page.result.monthlyHistory.map((day) => {
                  const dateObj = new Date(day.date);
                  const dayNum = dateObj.getDate();
                  const wd = WEEKDAY[dateObj.getDay()];

                  return (
                    <Section key={day.date}>
                      <DateRow>
                        <span className="date">{`${dayNum} ${wd}`}</span>
                      </DateRow>

                      {day.items.map((item) => (
                        <ItemRow key={item.consumptionRecordId}>
                          <ItemRowLeft>
                            <Dot $hide={deleteMode}>
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
                            </Dot>
                            <span className="memo">{item.content}</span>
                          </ItemRowLeft>

                          <ItemRowRight>
                            <span className="amount">
                              {comma(item.amount)}원
                            </span>

                            {deleteMode && (
                              <DeleteBtn
                                src={closeIcon}
                                alt="delete"
                                onClick={() =>
                                  deleteEntry(item.consumptionRecordId)
                                }
                              />
                            )}
                          </ItemRowRight>
                        </ItemRow>
                      ))}
                    </Section>
                  );
                }),
              )
            ) : (
              <EmptyBox>
                <EmptyCircle src={emptyImage} alt="비어 있음" />
                <EmptyText>등록된 소비 내역이 없어요.</EmptyText>
              </EmptyBox>
            )}

            {hasNextPage && <div ref={loadMoreRef} style={{ height: 40 }} />}
          </>
        )}

        {activeTab === '달력' && (
          <>
            <CalendarWrap>
              <WeekRow>
                {WEEKDAY.map((w) => (
                  <WeekCell key={w}>{w}</WeekCell>
                ))}
              </WeekRow>

              <DayGrid>
                {calendarCells.map((d, i) => {
                  if (!d) return <DayCell key={`empty-${i}`} />;

                  const dateStr = `${calYear}-${String(calMonth + 1).padStart(
                    2,
                    '0',
                  )}-${String(d).padStart(2, '0')}`;

                  const daySpent = calendarData?.result?.data?.[dateStr] ?? 0;
                  const isSelected = selectedDate === dateStr;

                  return (
                    <DayCell key={dateStr}>
                      <DayNumButton
                        $selected={isSelected}
                        onClick={() => toggleDate(dateStr)}
                      >
                        {d}
                      </DayNumButton>

                      {daySpent !== 0 && (
                        <SpendPill $minus={true}>
                          -{comma(Math.abs(daySpent))}
                        </SpendPill>
                      )}

                      {(i + 1) % 7 === 0 && i + 1 !== calendarCells.length && (
                        <WeekDivider />
                      )}
                    </DayCell>
                  );
                })}
              </DayGrid>
            </CalendarWrap>

            {selectedDate && (
              <CalListSection
                style={{
                  transform: `translateY(${dragOffset}px)`,
                  transition: anim ? 'transform 0.25s ease' : 'none',
                }}
                onPointerDown={onDragStart}
                onPointerMove={onDragMove}
                onPointerUp={onDragEnd}
              >
                <SheetHandle />

                <CalDateTitle>
                  {new Date(selectedDate).getDate()}{' '}
                  {WEEKDAY[new Date(selectedDate).getDay()]}
                </CalDateTitle>

                {selectedList.length ? (
                  selectedList.map((item) => (
                    <CalItemRow key={item.consumptionRecordId}>
                      <CalDot>
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
                      </CalDot>
                      <span className="memo">{item.content}</span>
                      <span className="amount">{comma(item.amount)}원</span>
                    </CalItemRow>
                  ))
                ) : (
                  <EmptyBoxSmall>해당 날짜에 기록이 없어요.</EmptyBoxSmall>
                )}

                <FloatingPlus onClick={() => navigate('/record')}>
                  <img src={plusCircle} alt="add" />
                </FloatingPlus>
              </CalListSection>
            )}
          </>
        )}

        {activeTab === '고정비' && (
          <>
            <ButtonContainer>
              <PlusBtn
                onClick={() => navigate('/fixed-cost')}
                src={plusIcon}
                alt="plus"
              />

              {fixedItems.length > 0 && (
                <DeleteToggleBtn
                  src={minusIcon}
                  alt="minus"
                  $active={fixedDel}
                  onClick={() => setFixedDel((v) => !v)}
                />
              )}
            </ButtonContainer>

            {fixedItems.length ? (
              <Section2>
                {fixedItems.map((e) => (
                  <ItemRow key={e.fixedConsumptionId}>
                    <ItemRowLeft>
                      <Dot>
                        <img src={fixedCostImage} alt="fixed cost" />
                      </Dot>
                      <span className="memo">
                        {e.memo || e.categoryName || ''}
                      </span>
                    </ItemRowLeft>

                    <ItemRowRight>
                      <span className="amount">{comma(e.amount)}원</span>

                      {fixedDel && (
                        <DeleteBtn
                          src={closeIcon}
                          alt="close"
                          onClick={() => deleteFixed(e.fixedConsumptionId)}
                        />
                      )}
                    </ItemRowRight>
                  </ItemRow>
                ))}

                {hasNextFixed && (
                  <div ref={fixedLoadMoreRef} style={{ height: 40 }} />
                )}
              </Section2>
            ) : (
              <EmptyBox>
                <EmptyCircle src={emptyImage} alt="비어 있음" />
                <EmptyText>등록된 고정비가 없어요.</EmptyText>
              </EmptyBox>
            )}
          </>
        )}

        {activeTab === '소비 루틴' && (
          <>
            <ButtonContainer>
              <PlusBtn
                onClick={() => navigate('/money-routine')}
                src={plusIcon}
                alt="plus"
              />
            </ButtonContainer>

            {routines.length ? (
              <RoutineCardList>
                {routines
                  .slice()
                  .reverse()
                  .map((r) => {
                    const date = new Date(r.createdAt || Date.now());
                    const dateStr = `${date.getFullYear()} • ${String(
                      date.getMonth() + 1,
                    ).padStart(2, '0')} • ${String(date.getDate()).padStart(
                      2,
                      '0',
                    )}`;

                    return (
                      <RoutineWideCard
                        key={r.id}
                        onClick={() =>
                          navigate(`/myroutine/${r.id}`, {
                            state: { from: 'money' },
                          })
                        }
                      >
                        <PreviewBox />

                        <RoutineContent>
                          <DateLine>{dateStr}</DateLine>

                          <TitleRow>
                            <h3 className="title">{r.title}</h3>
                            <ArrowIcon src={arrowIconImg} alt="arrow" />
                          </TitleRow>

                          <TagsRow>
                            {r.tags?.map((t) => {
                              const tag = t.startsWith('#') ? t : `#${t}`;
                              return (
                                <span className="tag" key={tag}>
                                  {tag}
                                </span>
                              );
                            })}
                          </TagsRow>

                          <UserRow>
                            <Avatar />
                            <span className="nick">라인</span>
                          </UserRow>
                        </RoutineContent>
                      </RoutineWideCard>
                    );
                  })}
              </RoutineCardList>
            ) : (
              <EmptyBox>
                <EmptyCircle src={emptyImage} alt="비어 있음" />
                <EmptyText>등록된 소비 루틴이 없어요.</EmptyText>
              </EmptyBox>
            )}
          </>
        )}
      </ContentArea>
    </Container>
  );
};

export default Money;
