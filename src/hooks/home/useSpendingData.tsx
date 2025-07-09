import { useMemo } from 'react';
import type { SpendingCategory } from '../../types/home/spending';
import { processSpendingData } from '../../utils/home/processSpendingData';

export function useSpendingData(spendingData: SpendingCategory[]) {
  const totalAmount = useMemo(
    () => spendingData.reduce((sum, item) => sum + item.amount, 0),
    [spendingData],
  );
  const hasSpending = totalAmount > 0;

  const processedData = useMemo(() => {
    return processSpendingData(spendingData, hasSpending);
  }, [spendingData, hasSpending]);

  const topCategory = useMemo(() => {
    if (!hasSpending) return null;
    return processedData.reduce(
      (max, item) => (item.amount > max.amount ? item : max),
      processedData[0],
    );
  }, [processedData, hasSpending]);

  return { totalAmount, hasSpending, processedData, topCategory };
}
