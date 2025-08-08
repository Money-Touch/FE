import styled, { css } from 'styled-components';
import colors from '../common/colors';

export const Container = styled.div`
  width: 100%;
  background: ${colors.B1};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopContainer = styled.div`
  width: 100%;
  padding: 0 2.4rem;
`;

export const GreetingCard = styled.section`
  width: 100%;
  height: 11rem;
  background: linear-gradient(135deg, ${colors.subColor3} 0%, #4be3a5 100%);
  border-radius: 1.5rem;
  display: flex;
  gap: 2.2rem;
  align-items: center;
  margin: 1rem 0 2.4rem 0;
`;

export const GreetText = styled.p`
  margin-left: 3.9rem;
  color: ${colors.white};
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.8rem;

  span {
    font-weight: 500;
  }
`;

export const MiniCard = styled.img`
  width: 8.4rem;
  height: 9.2rem;
`;

export const MonthRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.4rem;
`;

export const ArrowBtn = styled.img<{ disabled?: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const MonthText = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${colors.G1};
`;

export const TotalRow = styled.div`
  margin: 0.6rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TotalSpent = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${colors.G1};

  .slash {
    font-size: 1.6rem;
  }

  span {
    font-weight: 500;
    font-size: 1.8rem;
    color: ${colors.G4};
  }
`;

export const EditBtn = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
  margin-top: 0.2rem;
`;

export const BudgetCardWrapper = styled.div`
  width: 100%;
  height: 10.1rem;
  margin: 0.6rem 0 2.4rem 0;
  padding: 0 1.5rem;
  background: ${colors.white};
  border-radius: 1.5rem;
  box-shadow: 0 0 1rem 0 #0000000d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 0.8rem;
`;

export const SummaryP = styled.p`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${colors.G3};

  span {
    font-weight: 700;
    color: ${colors.subColor3};
  }
`;

export const BarWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 3.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Bar = styled.div`
  width: 98%;
  height: 0.6rem;
  background: ${colors.G8};
  border-radius: 1rem;
  overflow: hidden;
`;

export const Fill = styled.div`
  height: 100%;
  background: ${colors.mainColor1};
  border-radius: 1rem;
  transition: width 0.25s ease;
`;

export const Below = styled.div<{ $fillPercent: number }>`
  font-size: 1.1rem;
  font-weight: 300;
  color: ${colors.G5};

  .used-amount {
    position: absolute;
    bottom: -0.6rem;
    left: ${({ $fillPercent }) => $fillPercent}%;

    img {
      width: 1.6rem;
      height: 1.5rem;
      margin-bottom: 1.4rem;
    }
  }
`;

export const TabMenu = styled.nav`
  width: 100%;
  height: 4.3rem;
  display: flex;
  justify-content: center;
  background: ${colors.white};
  border-radius: 1.5rem 1.5rem 0 0;
  border-bottom: 0.1rem solid ${colors.G7};
  box-shadow: 0 0 1rem 0 #0000000d;
`;

export const TabItemMenu = styled.div`
  width: 31.2rem;
  display: flex;
  justify-content: space-between;
`;

export const TabItem = styled.button<{ $active: boolean }>`
  font-size: 1.5rem;
  font-weight: 500;
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
        width: 4.4rem;
        height: 0.4rem;
        background: ${colors.mainColor1};
        border-radius: 1rem;
      }
    `}
`;

export const ContentArea = styled.div`
  background: ${colors.white};
  width: 100%;
  position: relative;
  padding-top: 2.71rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 2.4rem;
  gap: 1.6rem;
`;

export const PlusBtn = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;

export const DeleteToggleBtn = styled(PlusBtn)<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? colors.mainColor1 : colors.G3)};
`;

export const Section = styled.section`
  padding: 0 16px;
  margin-bottom: 20px;
`;

export const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  .date {
    font-size: 14px;
    font-weight: 700;
  }
`;

export const ItemRow = styled.div`
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

export const DeleteBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${colors.G3};
  margin-left: 4px;
  cursor: pointer;
`;

export const Dot = styled.span`
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

// 비어있을 때
export const EmptyBox = styled.div`
  margin: 12.3rem 0 25.9rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
`;

export const EmptyCircle = styled.img`
  width: 13.822rem;
  height: 13rem;
  margin-right: 1rem;
`;

export const EmptyText = styled.p`
  font-size: 1.6rem;
  color: ${colors.G1};
  font-weight: 500;
`;

export const RoutineCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 8px 16px 40px;
`;

export const RoutineWideCard = styled.button`
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
  align-items: center;

  &:active {
    transform: translateY(1px);
  }
`;

export const PreviewBox = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 12px;
  background: ${colors.G8};
  flex-shrink: 0;
  align-self: center;
`;

export const RoutineContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 2px;
`;

export const DateLine = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${colors.G4};
  text-align: left;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  text-align: left;
  margin-top: -8px;

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

export const ArrowIcon = styled.img`
  position: absolute;
  right: 23px;
  top: 42px;
  transform: translateY(-50%);
  width: 11px;
  height: 11px;
`;

export const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;
  top: -6px;

  .tag {
    font-size: 11px;
    color: ${colors.G4};
  }
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .nick {
    font-size: 12px;
    font-weight: 600;
    color: ${colors.G3};
  }
`;

export const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${colors.G7};
`;

export const CalendarWrap = styled.div`
  padding: 0 16px 20px;
`;

export const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  color: ${colors.G4};
  margin-bottom: 6px;
`;

export const WeekCell = styled.div``;

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 18px;
  min-height: 260px;
`;

export const WeekDivider = styled.div`
  grid-column: 1 / -1;
  border-top: 1px solid ${colors.G7};
  margin: 4px 0 1px;
`;

export const DayCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 58px;
  position: relative;
`;

export const DayNumButton = styled.button<{ $selected: boolean }>`
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

export const SpendPill = styled.div<{ $minus: boolean }>`
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

export const CalListSection = styled.section`
  padding: 16px;
  background: #f0fff9;
  border-radius: 16px 16px 0 0;
  margin-top: -300px;
  padding-bottom: 190px;
`;

export const CalDateTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const CalItemRow = styled.div`
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

export const CalDot = styled.span`
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

export const EmptyBoxSmall = styled.div`
  padding: 12px 0 24px;
  text-align: center;
  color: ${colors.G4};
  font-size: 13px;
`;

export const SheetHandle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: ${colors.G4};
  margin: 0 auto 12px;
`;

export const FloatingPlus = styled.button`
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
