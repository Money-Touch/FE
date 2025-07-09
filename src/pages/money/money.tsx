import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import colors from "../../styles/common/colors";
import leftArrow  from "../../assets/images/header/leftArrow.png";
import plusIcon   from "../../assets/images/budget/Plus.png";
import pencilIcon from "../../assets/images/budget/Pencil.png";
import signalIcon from "../../assets/images/budget/signal.png";

const TAB_LIST = ["일일", "달력", "고정비", "소비 루틴"] as const;
const WEEKDAY  = ["일", "월", "화", "수", "목", "금", "토"];
const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

interface Entry {
  id: number;
  category: string;
  item: string;
  amount: number;
  date: string;
  memo: string;
}

const Money = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [activeTab, setActiveTab] =
    useState<typeof TAB_LIST[number]>("일일");

  useEffect(() => {
    const tab = (location.state as { tab?: string } | null)?.tab;
    if (tab && TAB_LIST.includes(tab as typeof TAB_LIST[number])) {
      setActiveTab(tab as typeof TAB_LIST[number]);
    }
  }, [location.state]);

  const [monthBudget, setMonthBudget] = useState(0);
  const [entries,     setEntries]     = useState<Entry[]>([]);
  const [deleteMode,  setDeleteMode]  = useState(false);
  const [fixed,       setFixed]       = useState<Entry[]>([]);
  const [fixedDel,    setFixedDel]    = useState(false);

  useEffect(() => {
    setMonthBudget(Number(localStorage.getItem("monthBudget") || 0));
    loadEntries();
    loadFixed();
  }, []);

  const loadEntries = () => {
    const raw = localStorage.getItem("dailyEntries");
    setEntries(raw ? JSON.parse(raw) : []);
  };
  const loadFixed = () => {
    const raw = localStorage.getItem("fixedEntries");
    setFixed(raw ? JSON.parse(raw) : []);
  };

  useEffect(() => {
    const onFocus = () => {
      loadEntries();
      loadFixed();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const deleteEntry = (id: number) => {
    setEntries(prev => {
      const next = prev.filter(e => e.id !== id);
      localStorage.setItem("dailyEntries", JSON.stringify(next));
      if (!next.length) setDeleteMode(false);
      return next;
    });
  };
  const deleteFixed = (id: number) => {
    setFixed(prev => {
      const next = prev.filter(e => e.id !== id);
      localStorage.setItem("fixedEntries", JSON.stringify(next));
      if (!next.length) setFixedDel(false);
      return next;
    });
  };

  const totalSpent  = [...entries, ...fixed].reduce((s, c) => s + c.amount, 0);
  const fillPercent = monthBudget
    ? Math.min((Math.abs(totalSpent) / monthBudget) * 100, 100)
    : 0;
  const usedAbs = Math.abs(totalSpent);

  const groups = entries.reduce<Record<string, Entry[]>>((acc, cur) => {
    const key = cur.date.slice(0, 10);
    acc[key] = acc[key] ? [...acc[key], cur] : [cur];
    return acc;
  }, {});
  const groupArr = Object.entries(groups).sort(([a], [b]) => (a < b ? 1 : -1));

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
          <span>라인님!</span><br />
          소비 내역을 작성해 주세요.
        </GreetText>
        <MiniCard>일러스트</MiniCard>
      </GreetingCard>

      <MonthRow>
        <ArrowBtn>◀</ArrowBtn>
        <MonthText>{new Date().getMonth() + 1}월</MonthText>
        <ArrowBtn>▶</ArrowBtn>
      </MonthRow>

      <TotalRow>
        <TotalSpent>{comma(usedAbs)}원</TotalSpent>
        <Slash>/</Slash>
        <TotalBudget>{comma(monthBudget)}원</TotalBudget>
        <EditBtn onClick={() => navigate("/budget-register")}>
          <img src={pencilIcon} alt="edit" />
        </EditBtn>
      </TotalRow>

      <BudgetCardWrapper>
        {monthBudget ? (
          <>
            <Summary>
              한 달 예산 {comma(monthBudget)}원 중{" "}
              <Used>{comma(usedAbs)}원</Used> 사용했어요!
            </Summary>
            <BarWrapper>
              <Bar>
                <Fill style={{ width: `${fillPercent}%` }} />
              </Bar>
            </BarWrapper>
            <Below>
              <span
                style={{ position: "absolute", left: `calc(${fillPercent}% - 30px)` }}
              >
                {comma(usedAbs)}원
              </span>
              <span style={{ position: "absolute", right: 0 }}>
                {comma(monthBudget)}원
              </span>
            </Below>
          </>
        ) : (
          <NoBudgetTxt>한 달 예산을 등록해주세요!</NoBudgetTxt>
        )}
      </BudgetCardWrapper>

      <TabMenu>
        {TAB_LIST.map(t => (
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
        {activeTab === "일일" && (
          <>
            <PlusBtn
              $shifted={entries.length > 0}
              onClick={() => navigate("/add-day")}
            >
              <img src={plusIcon} alt="add" />
            </PlusBtn>
            {entries.length > 0 && (
              <DeleteToggleBtn
                $active={deleteMode}
                onClick={() => setDeleteMode(v => !v)}
              >
                –
              </DeleteToggleBtn>
            )}

            {entries.length ? (
              groupArr.map(([dateKey, list]) => {
                const d = new Date(dateKey);
                const day = d.getDate();
                const wd  = WEEKDAY[d.getDay()];
                return (
                  <Section key={dateKey}>
                    <DateRow>
                      <span className="date">{`${day} ${wd}`}</span>
                    </DateRow>
                    {list.map(e => (
                      <ItemRow key={e.id}>
                        <Dot>{e.category}</Dot>
                        <span className="memo">{e.item}</span>
                        <span className="amount">{comma(e.amount)}원</span>
                        {deleteMode && (
                          <DeleteBtn onClick={() => deleteEntry(e.id)}>×</DeleteBtn>
                        )}
                      </ItemRow>
                    ))}
                  </Section>
                );
              })
            ) : (
              <EmptyBox>
                <EmptyCircle />
                <EmptyText>등록된 소비 내역이 없어요.</EmptyText>
              </EmptyBox>
            )}
          </>
        )}

        {activeTab === "고정비" && (
          <>
            <PlusBtn
              $shifted={fixed.length > 0}
              onClick={() => navigate("/fixed-cost")}
            >
              <img src={plusIcon} alt="add" />
            </PlusBtn>
            {fixed.length > 0 && (
              <DeleteToggleBtn
                $active={fixedDel}
                onClick={() => setFixedDel(v => !v)}
              >
                –
              </DeleteToggleBtn>
            )}

            {fixed.length ? (
              <Section>
                {fixed.map(e => (
                  <ItemRow key={e.id}>
                    <Dot>{e.category}</Dot>
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
                <EmptyCircle />
                <EmptyText>등록된 소비 내역이 없어요.</EmptyText>
              </EmptyBox>
            )}
          </>
        )}

        {activeTab !== "일일" && activeTab !== "고정비" && (
          <EmptyBox style={{ marginTop: 100 }}>
            <EmptyText>현재 탭은 준비 중입니다 ✨</EmptyText>
          </EmptyBox>
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

  img,
  svg {
    width: 20px;
    height: 20px;
    display: block;
    object-fit: contain;
  }
`;

const IconBtnLeft  = styled(IconBase)`left: 16px;`;

const IconBtnRight = styled(IconBase)`right: 16px;`;

const GreetingCard = styled.section`
  margin: 16px;
  padding: 20px 18px;
  background: linear-gradient(135deg, ${colors.subColor3} 0%, #4be3a5 100%);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
`;

const GreetText = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: ${colors.G1};

  span {
    font-size: 18px;
  }
`;

const MiniCard = styled.div`
  width: 60px;
  height: 60px;
  background: ${colors.G6};
  border-radius: 8px;
  font-size: 11px;
  color: ${colors.G4};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MonthRow = styled.div`
  margin: 0 16px 4px;
  display: flex;
  align-items: center;
`;

const ArrowBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 2px 4px;
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

  img {
    width: 18px;
    height: 18px;
    display: block;
  }
`;

const BudgetCardWrapper = styled.div`
  margin: 0 16px 12px;
  padding: 20px 16px 24px;
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
`;

const Below = styled.div`
  margin-top: 8px;
  position: relative;
  height: 20px;
  font-size: 13px;
  color: ${colors.G4};
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
  position: relative;

  ${({ $active }) =>
    $active &&
    css`
      &::after {
        content: "";
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
  top: ${({ $shifted }) => ($shifted ? "12px" : "7px")};
  right: ${({ $shifted }) => ($shifted ? "56px" : "25px")};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;

  img {
    width: 24px;
    height: 24px;
    display: block;
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
  color: ${({ $active }) => ($active ? colors.mainColor1 : colors.G3)};
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${colors.G3};
  margin-left: 4px;
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
  margin-bottom: 0;

  .memo {
    flex: 1;
    font-size: 14px;
  }
  .amount {
    font-size: 14px;
    font-weight: 600;
  }
`;

const Dot = styled.span`
  flex: 0 0 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  border-radius: 50%;
  background: ${colors.G4};
`;

const EmptyBox = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.G4};
`;

const EmptyCircle = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: ${colors.G7};
  margin-bottom: 24px;
`;

const EmptyText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

