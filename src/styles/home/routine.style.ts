import colors from '../../styles/common/colors';
import styled from 'styled-components';

// routine.tsx
export const Container = styled.div`
  display: flex;
  padding: 0 2.4rem;
  align-items: flex-start;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  border: 0.1rem solid ${colors.G7};
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background-color: ${colors.white};
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 2.2rem;
  border: none;
  outline: none;
  font-size: 1.4rem;
  color: ${colors.G7};
  background: transparent;
  font-family: Pretendard;
  font-weight: 300;
  font-size: 1.4rem;
  color: ${colors.G1};

  &::placeholder {
    color: ${colors.G5};
  }
`;

export const SearchIcon = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const Card = styled.div`
  display: flex;
  align-items: flex-start;
  height: 10.6rem;
  border-radius: 1.5rem;
  background: ${colors.white};
  box-shadow: 0px 0px 10px 0px #0000000d;
  position: relative;
  cursor: pointer;
`;

export const Left = styled.div`
  margin-left: 1.1rem;
  margin-top: 1.1rem;
`;

export const Thumbnail = styled.img`
  width: 8.4rem;
  height: 8.4rem;
  border-radius: 1rem;
  object-fit: cover;
  opacity: 0.8;
  box-shadow: 0px 0px 10px 0px #0000000d;
`;

export const Content = styled.div<{ $isNew?: boolean }>`
  flex: 1;
  width: 25.6rem;
  height: 8.6rem;
  margin-left: 1.1rem;
  margin-right: 1.5rem;
  margin-top: ${({ $isNew }) => ($isNew ? '0.9rem' : '1.1rem')};
  gap: 1.8rem;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 5.4rem;
`;

export const DateRow = styled.div<{ $isNew?: boolean }>`
  height: ${({ $isNew }) => ($isNew ? '1.4rem' : '1rem')};
  display: flex;
  align-items: center;
`;

export const Date = styled.div`
  color: ${colors.G3};
  font-weight: 300;
  font-size: 0.8rem;
  text-align: center;
`;

export const DateDot = styled.img`
  width: 0.2rem;
  height: 0.2rem;
  margin: 0 0.3rem;
  object-fit: contain;
  vertical-align: middle;
`;

export const NewBadge = styled.div`
  width: 3.2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background: #ff828226;
  border: 0.07rem solid #ffadadcc;
  font-weight: 500;
  font-size: 0.8rem;
  color: ${colors.M1};
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.3rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${colors.G1};
  cursor: default;
`;

export const RightArrowImg = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

export const HashtagList = styled.div`
  display: flex;
  height: 1.4rem;
  margin-top: 0.3rem;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

export const Hashtag = styled.span`
  font-weight: 300;
  font-size: 1.1rem;
  color: ${colors.G4};
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  height: 1.4rem;
  gap: 0.6rem;
  margin-top: 1.8rem;
`;

export const ProfileImg = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const AuthorName = styled.span`
  height: 100%;
  color: ${colors.G1};
  font-weight: 500;
  font-size: 1.1rem;
`;

export const NoResultWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7.3rem;
`;

export const NoResultImg = styled.img`
  width: 14.8rem;
  height: 15.8rem;
`;

// routineDetail.tsx
export const Budget = styled.div`
  width: 100%;
  height: 6.1rem;
  margin-top: 2.6rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const BudgetTitle = styled.div`
  height: 2.6rem;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${colors.G1};
`;

export const BudgetAmount = styled.div`
  height: 3.5rem;
  font-weight: 700;
  font-size: 2.6rem;
  color: ${colors.G1};
`;

export const Line = styled.div`
  width: 100%;
  height: 0.7rem;
  margin-top: 2.4rem;
  background-color: ${colors.G8};
`;

export const BudgetListWrapper = styled.div`
  height: 22.6rem;
  margin-top: 3rem;
  gap: 1.4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const BudgetItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.6rem;
`;

export const BudgetLabel = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${colors.G5};
`;

export const BudgetAmountPerItem = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  color: ${colors.G1};
`;

export const BudgetButton = styled.button<{ $isReflected: boolean }>`
  width: 100%;
  height: 5rem;
  margin-top: 24.3rem;
  border-radius: 1rem;
  background-color: ${({ disabled }) =>
    disabled ? colors.G6 : colors.mainColor1};
  color: ${colors.white};
  font-weight: 500;
  font-size: 1.8rem;
  cursor: ${({ $isReflected }) => ($isReflected ? 'default' : 'pointer')};
`;

export const ErrorMessage = styled.div`
  width: 100%;
  margin-top: 0.6rem;
  font-weight: 300;
  font-size: 1.1rem;
  color: ${colors.M1};
  text-align: center;
`;
