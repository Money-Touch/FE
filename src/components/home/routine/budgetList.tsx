import * as S from '../../../styles/home/routine.style';

interface BudgetListProps {
  totalBudget: number;
  budgetList: { label: string; amount: number }[];
}

export default function BudgetList({
  totalBudget,
  budgetList,
}: BudgetListProps) {
  return (
    <>
      <S.Budget>
        <S.BudgetTitle>한 달 예산</S.BudgetTitle>
        <S.BudgetAmount>{totalBudget.toLocaleString()}원</S.BudgetAmount>
      </S.Budget>
      <S.Line />
      <S.BudgetListWrapper>
        {budgetList.map((item, index) => (
          <S.BudgetItem key={index}>
            <S.BudgetLabel>{item.label}</S.BudgetLabel>
            <S.BudgetAmountPerItem>
              {item.amount.toLocaleString()}원
            </S.BudgetAmountPerItem>
          </S.BudgetItem>
        ))}
      </S.BudgetListWrapper>
    </>
  );
}
