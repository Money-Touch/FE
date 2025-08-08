import styled, { css } from 'styled-components';
import colors from '../common/colors';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.B1};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.G8};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
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

export const IconBtnLeft = styled(IconBase)`
  left: 16px;
`;

export const GreetingCard = styled.section`
  margin: 16px;
  padding: 24px 28px;
  background: linear-gradient(135deg, ${colors.subColor3} 0%, #4be3a5 100%);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GreetText = styled.div`
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

export const MiniCard = styled.div`
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

export const MonthRow = styled.div`
  margin: 0 16px 4px;
  display: flex;
  align-items: center;
`;

export const ArrowBtn = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  font-size: 18px;
  padding: 2px 4px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const MonthText = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
`;

export const TotalRow = styled.div`
  margin: 0 16px 8px;
  display: flex;
  align-items: center;
`;

export const TotalSpent = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

export const Slash = styled.span`
  margin: 0 4px;
  font-size: 18px;
  color: ${colors.G3};
`;

export const TotalBudget = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.G3};
`;

export const EditBtn = styled.button`
  background: none;
  border: none;
  padding-left: 4px;
  cursor: pointer;
  img {
    width: 18px;
    height: 18px;
  }
`;

export const BudgetCardWrapper = styled.div`
  margin: 0 16px 12px;
  padding: 20px 16px 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  font-size: 14px;
`;

export const Summary = styled.p`
  font-weight: 600;
  line-height: 1.4;
  color: ${colors.G4};
`;

export const Used = styled.span`
  color: ${colors.mainColor1};
`;

export const BarWrapper = styled.div`
  position: relative;
  margin-top: 16px;
`;

export const Bar = styled.div`
  width: 100%;
  height: 6px;
  background: ${colors.G8};
  border-radius: 3px;
  overflow: hidden;
`;

export const Fill = styled.div`
  height: 100%;
  background: ${colors.mainColor1};
  transition: width 0.25s ease;
`;

export const Below = styled.div<{ $fillPercent: number }>`
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

export const TabMenu = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${colors.G8};
`;

export const TabItem = styled.button<{ $active: boolean }>`
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

export const ContentArea = styled.div`
  flex: 1;
  position: relative;
  padding-top: 44px;
`;

export const PlusBtn = styled.button<{ $shifted: boolean }>`
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

export const DeleteToggleBtn = styled.button<{ $active: boolean }>`
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

export const EmptyBox = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 60px;
  color: ${colors.G4};
`;

export const EmptyCircle = styled.img`
  width: 140px;
  height: 180px;
  object-fit: contain;
  margin: 0 auto 12px auto;
  display: block;
`;

export const EmptyText = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  text-align: center;
  width: 100%;
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
