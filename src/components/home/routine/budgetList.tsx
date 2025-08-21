import * as S from '../../../styles/home/routine.style';

interface BudgetListProps {
  totalBudget: number;
  budgetList: { categoryName: string; amount: number }[];
}

export default function BudgetList({
  totalBudget,
  budgetList,
}: BudgetListProps) {
  return (
    <>
      <div className={S.Budget}>
        <div className={S.BudgetTitle}>한 달 예산</div>
        <div className={S.BudgetAmount}>{totalBudget.toLocaleString()}원</div>
      </div>

      <div className={S.Line} />

      <div className={S.BudgetListWrapper}>
        {budgetList?.map((item, index) => (
          <div key={index} className={S.BudgetItem}>
            <div className={S.BudgetLabel}>{item.categoryName}</div>
            <div className={S.BudgetAmountPerItem}>
              {item.amount.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
