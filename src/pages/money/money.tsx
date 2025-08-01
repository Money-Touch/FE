import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import colors from '../../styles/common/colors';
import leftArrow from '../../assets/images/header/leftArrow.png';
import plusIcon from '../../assets/images/budget/Plus.png';
import pencilIcon from '../../assets/images/budget/Pencil.png';
import signalIcon from '../../assets/images/budget/signal.png';
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

  useEffect(() => {
    setMonthBudget(Number(localStorage.getItem('monthBudget') || 0));
    loadEntries();
    loadFixed();
    loadRoutines();
  }, []);

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

  const deleteEntry = (id: number) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      localStorage.setItem('dailyEntries', JSON.stringify(next));
      if (!next.length) setDeleteMode(false);
      return next;
    });
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

  const groups = entries.reduce<Record<string, Entry[]>>((acc, cur) => {
    const key = cur.date.slice(0, 10);
    acc[key] = acc[key] ? [...acc[key], cur] : [cur];
    return acc;
  }, {});

  const groupArr = Object.entries(groups).sort(([a], [b]) => (a < b ? 1 : -1));
  const selectedList = selectedDate ? groups[selectedDate] || [] : [];

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
      <Header>
        <IconBtnLeft onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="back" />
        </IconBtnLeft>
        <HeaderTitle>가계부</HeaderTitle>
        <IconBtnRight aria-label="알림">
          <img src={signalIcon} alt="알림" />
        </IconBtnRight>
      </Header>

      <GreetingCard>
        <GreetText>
          <span>라인님!</span>
          <p>소비 내역을 작성해 주세요.</p>
        </GreetText>
        <MiniCard>
          <img src={basicImage} alt="일러스트" />
        </MiniCard>
      </GreetingCard>

      <MonthRow>
        <ArrowBtn
          onClick={activeTab === '달력' ? prevMonth : undefined}
          disabled={activeTab !== '달력' ? true : false}
        >
          ◀
        </ArrowBtn>

        <MonthText>
          {activeTab === '달력'
            ? `${calMonth + 1}월`
            : `${new Date().getMonth() + 1}월`}
        </MonthText>

        <ArrowBtn
          onClick={activeTab === '달력' ? nextMonth : undefined}
          disabled={activeTab !== '달력' ? true : isCurrentMonth}
        >
          ▶
        </ArrowBtn>
      </MonthRow>

      <TotalRow>
        <TotalSpent>{comma(usedAbs)}원</TotalSpent>
        <Slash>/</Slash>
        <TotalBudget>{comma(monthBudget)}원</TotalBudget>
        <EditBtn onClick={() => navigate('/budget-register')}>
          <img src={pencilIcon} alt="edit" />
        </EditBtn>
      </TotalRow>

      <BudgetCardWrapper>
        {monthBudget ? (
          <>
            <Summary>
              한 달 예산 {comma(monthBudget)}원 중{' '}
              <Used>{comma(usedAbs)}원</Used> 사용했어요!
            </Summary>

            <BarWrapper>
              <Bar>
                <Fill style={{ width: `${fillPercent}%` }} />
              </Bar>
            </BarWrapper>

            <Below $fillPercent={fillPercent}>
              <span className="used-amount">
                <img src={starIcon} alt="star" />
                <span>{comma(usedAbs)}원</span>
              </span>
              <span style={{ position: 'absolute', right: 0 }}>
                {comma(monthBudget)}원
              </span>
            </Below>
          </>
        ) : (
          <NoBudgetTxt>한 달 예산을 등록해주세요!</NoBudgetTxt>
        )}
      </BudgetCardWrapper>

      <TabMenu>
        {TAB_LIST.map((t) => (
          <TabItem
            key={t}
            $active={activeTab === t}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </TabItem>
        ))}
      </TabMenu>

      <ContentArea>
        {activeTab === '일일' && (
          <>
            <PlusBtn
              $shifted={entries.length > 0}
              onClick={() => navigate('/add-day')}
            >
              <img src={plusIcon} alt="add" />
            </PlusBtn>

            {entries.length > 0 && (
              <DeleteToggleBtn
                $active={deleteMode}
                onClick={() => setDeleteMode((v) => !v)}
              >
                –
              </DeleteToggleBtn>
            )}

            {entries.length ? (
              groupArr.map(([dateKey, list]) => {
                const d = new Date(dateKey);
                const day = d.getDate();
                const wd = WEEKDAY[d.getDay()];

                return (
                  <Section key={dateKey}>
                    <DateRow>
                      <span className="date">{`${day} ${wd}`}</span>
                    </DateRow>

                    {list.map((e) => (
                      <ItemRow key={e.id}>
                        <Dot>
                          {categoryImages[e.category] ? (
                            <img
                              src={categoryImages[e.category]}
                              alt={e.category}
                            />
                          ) : (
                            e.category
                          )}
                        </Dot>

                        <span className="memo">{e.item}</span>
                        <span className="amount">{comma(e.amount)}원</span>

                        {deleteMode && (
                          <DeleteBtn onClick={() => deleteEntry(e.id)}>
                            ×
                          </DeleteBtn>
                        )}
                      </ItemRow>
                    ))}
                  </Section>
                );
              })
            ) : (
              <EmptyBox>
                <EmptyCircle src={emptyImage} alt="비어 있음" />
                <EmptyText>등록된 소비 내역이 없어요.</EmptyText>
              </EmptyBox>
            )}
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

                  const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                  const daySpent = (groups[dateStr] || []).reduce(
                    (s, c) => s + c.amount,
                    0,
                  );
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
                        <SpendPill $minus={daySpent < 0}>
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
                  selectedList.map((e) => (
                    <CalItemRow key={e.id}>
                      <CalDot>
                        {categoryImages[e.category] ? (
                          <img
                            src={categoryImages[e.category]}
                            alt={e.category}
                          />
                        ) : (
                          e.category
                        )}
                      </CalDot>
                      <span className="memo">{e.item}</span>
                      <span className="amount">{comma(e.amount)}원</span>
                    </CalItemRow>
                  ))
                ) : (
                  <EmptyBoxSmall>해당 날짜에 기록이 없어요.</EmptyBoxSmall>
                )}

                <FloatingPlus onClick={() => navigate('/add-day')}>
                  <img src={plusCircle} alt="add" />
                </FloatingPlus>
              </CalListSection>
            )}
          </>
        )}

        {activeTab === '고정비' && (
          <>
            <PlusBtn
              $shifted={fixed.length > 0}
              onClick={() => navigate('/fixed-cost')}
            >
              <img src={plusIcon} alt="add" />
            </PlusBtn>

            {fixed.length > 0 && (
              <DeleteToggleBtn
                $active={fixedDel}
                onClick={() => setFixedDel((v) => !v)}
              >
                –
              </DeleteToggleBtn>
            )}

            {fixed.length ? (
              <Section>
                {fixed.map((e) => (
                  <ItemRow key={e.id}>
                    <Dot>
                      <img src={fixedCostImage} alt="fixed cost" />
                    </Dot>

                    <span className="memo">{e.item}</span>
                    <span className="amount">{comma(e.amount)}원</span>

                    {fixedDel && (
                      <DeleteBtn onClick={() => deleteFixed(e.id)}>×</DeleteBtn>
                    )}
                  </ItemRow>
                ))}
              </Section>
            ) : (
              <EmptyBox>
                <EmptyCircle src={emptyImage} alt="비어 있음" />
                <EmptyText>등록된 소비 내역이 없어요.</EmptyText>
              </EmptyBox>
            )}
          </>
        )}

        {activeTab === '소비 루틴' && (
          <>
            <PlusBtn $shifted={false} onClick={() => navigate('/routine')}>
              <img src={plusIcon} alt="add" />
            </PlusBtn>

            {routines.length ? (
              <RoutineCardList>
                {routines
                  .slice()
                  .reverse()
                  .map((r) => {
                    const date = new Date(r.createdAt || Date.now());
                    const dateStr = `${date.getFullYear()} • ${String(date.getMonth() + 1).padStart(2, '0')} • ${String(date.getDate()).padStart(2, '0')}`;

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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.B1};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.G8};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const IconBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const IconBtnLeft = styled(IconBase)`
  left: 16px;
`;
const IconBtnRight = styled(IconBase)`
  right: 16px;
`;

const GreetingCard = styled.section`
  margin: 16px;
  padding: 24px 28px;
  background: linear-gradient(135deg, ${colors.subColor3} 0%, #4be3a5 100%);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GreetText = styled.div`
  flex: 1;
  margin-right: 16px;
  color: #fff;
  display: flex;
  flex-direction: column;
  span {
    font-size: 22px;
    font-weight: 700;
  }
  p {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
`;

const MiniCard = styled.div`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    margin-left: -40px;
    transform: scale(1.25);
  }
`;

const MonthRow = styled.div`
  margin: 0 16px 4px;
  display: flex;
  align-items: center;
`;

const ArrowBtn = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  font-size: 18px;
  padding: 2px 4px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const MonthText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
`;

const TotalRow = styled.div`
  margin: 0 16px 8px;
  display: flex;
  align-items: center;
`;

const TotalSpent = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const Slash = styled.span`
  margin: 0 4px;
  font-size: 18px;
  color: ${colors.G3};
`;

const TotalBudget = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.G3};
`;

const EditBtn = styled.button`
  background: none;
  border: none;
  padding-left: 4px;
  cursor: pointer;
  img {
    width: 18px;
    height: 18px;
  }
`;

const BudgetCardWrapper = styled.div`
  margin: 0 16px 12px;
  padding: 20px 16px 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  font-size: 14px;
`;

const NoBudgetTxt = styled.p`
  color: ${colors.G4};
`;

const Summary = styled.p`
  font-weight: 600;
  line-height: 1.4;
  color: ${colors.G4};
`;

const Used = styled.span`
  color: ${colors.mainColor1};
`;

const BarWrapper = styled.div`
  position: relative;
  margin-top: 16px;
`;

const Bar = styled.div`
  width: 100%;
  height: 6px;
  background: ${colors.G8};
  border-radius: 3px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  background: ${colors.mainColor1};
  transition: width 0.25s ease;
`;

const Below = styled.div<{ $fillPercent: number }>`
  margin-top: 8px;
  position: relative;
  height: 32px;
  font-size: 13px;
  color: ${colors.G4};

  .used-amount {
    position: absolute;
    left: ${({ $fillPercent }) => $fillPercent}%;
    transform: translateX(-50%);
    top: -30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
      margin-bottom: 2px;
    }
    span {
      position: relative;
      top: 12px;
    }
  }
`;

const TabMenu = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${colors.G8};
`;

const TabItem = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;

  ${({ $active }) =>
    $active &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 56%;
        max-width: 40px;
        height: 3px;
        background: ${colors.mainColor1};
        border-radius: 1.5px;
      }
    `}
`;

const ContentArea = styled.div`
  flex: 1;
  position: relative;
  padding-top: 44px;
`;

const PlusBtn = styled.button<{ $shifted: boolean }>`
  position: absolute;
  top: ${({ $shifted }) => ($shifted ? '12px' : '7px')};
  right: ${({ $shifted }) => ($shifted ? '56px' : '25px')};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const DeleteToggleBtn = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 7px;
  right: 25px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 36px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  color: ${({ $active }) => ($active ? colors.mainColor1 : colors.G3)};
`;

const Section = styled.section`
  padding: 0 16px;
  margin-bottom: 20px;
`;

const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  .date {
    font-size: 14px;
    font-weight: 700;
  }
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${colors.G8};
  border-radius: 10px;

  .memo {
    flex: 1;
    font-size: 14px;
  }

  .amount {
    font-size: 14px;
    font-weight: 600;
  }
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${colors.G3};
  margin-left: 4px;
  cursor: pointer;
`;

const Dot = styled.span`
  flex: 0 0 44px;
  height: 44px;
  border-radius: 50%;
  background: #f6f6f6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EmptyBox = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.G4};
`;

const EmptyCircle = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  margin-bottom: 24px;
`;

const EmptyText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const RoutineCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 8px 16px 40px;
`;

const RoutineWideCard = styled.button`
  display: flex;
  width: 100%;
  gap: 14px;
  padding: 14px 16px;
  border: none;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;

  &:active {
    transform: translateY(1px);
  }
`;

const PreviewBox = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 12px;
  background: ${colors.G8};
  flex-shrink: 0;
  align-self: center;
`;

const RoutineContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DateLine = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${colors.G4};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  .title {
    flex: 1;
    font-size: 15px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${colors.G2};
  }
`;

const ArrowIcon = styled.img`
  position: absolute;
  right: 23px;
  top: 52%;
  transform: translateY(-50%);
  width: 11px;
  height: 11px;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  .tag {
    font-size: 11px;
    color: ${colors.G4};
  }
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .nick {
    font-size: 12px;
    font-weight: 600;
    color: ${colors.G3};
  }
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${colors.G7};
`;

const CalendarWrap = styled.div`
  padding: 0 16px 20px;
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  color: ${colors.G4};
  margin-bottom: 6px;
`;

const WeekCell = styled.div``;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 18px;
  min-height: 260px;
`;

const WeekDivider = styled.div`
  grid-column: 1 / -1;
  border-top: 1px solid ${colors.G7};
  margin: 4px 0 1px;
`;

const DayCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 58px;
  position: relative;
`;

const DayNumButton = styled.button<{ $selected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
  display: grid;
  place-items: center;
  padding: 0;
  border: ${({ $selected }) => ($selected ? '0.5px solid #00D1B5' : 'none')};
  background: ${({ $selected }) => ($selected ? '#DDFAEA' : 'transparent')};
  color: ${({ $selected }) => ($selected ? '#00D1B5' : colors.G1)};
`;

const SpendPill = styled.div<{ $minus: boolean }>`
  margin: 4px auto 0;
  padding: 0 4px;
  height: 16px;
  min-width: 28px;
  border-radius: 5px;
  font-size: 10px;
  line-height: 16px;
  color: ${colors.subColor1};
  background: ${({ $minus }) => ($minus ? '#DDFAEA' : colors.G3)};
`;

const CalListSection = styled.section`
  padding: 16px;
  background: #f0fff9;
  border-radius: 16px 16px 0 0;
  margin-top: -300px;
  padding-bottom: 190px;
`;

const CalDateTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const CalItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.G8};

  .memo {
    flex: 1;
    font-size: 14px;
  }
  .amount {
    font-size: 14px;
    font-weight: 600;
  }
`;

const CalDot = styled.span`
  flex: 0 0 32px;
  height: 32px;
  border-radius: 50%;
  background: #f6f6f6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EmptyBoxSmall = styled.div`
  padding: 12px 0 24px;
  text-align: center;
  color: ${colors.G4};
  font-size: 13px;
`;

const SheetHandle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: ${colors.G4};
  margin: 0 auto 12px;
`;

const FloatingPlus = styled.button`
  position: absolute;
  right: 18px;
  bottom: 24px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
