import { useMemo } from 'react';
import type {
  StatisticsResult,
  ProcessedDataItem,
} from '../../../types/home/statistics';
import { processSpendingData } from '../../../utils/home/processSpendingData';

export function useSpendingData(
  spendingData?: StatisticsResult,
  otherCategories: ProcessedDataItem[] = [],
) {
  const totalPercentage = useMemo(() => {
    if (!spendingData) return 0;
    const topSum = spendingData.topCategories.reduce(
      (sum, item) => sum + item.percentage,
      0,
    );
    return topSum + (spendingData.hasOthers ? spendingData.othersPercent : 0);
  }, [spendingData]);

  const hasSpending = totalPercentage > 0;

  const processedData = useMemo(() => {
    if (!spendingData) return [];
    return processSpendingData(spendingData, hasSpending, otherCategories);
  }, [spendingData, hasSpending, otherCategories]);

  const topCategory = useMemo(() => {
    if (!spendingData || !hasSpending) return null;
    return spendingData.mostSpentCategoryName;
  }, [spendingData, hasSpending]);

  return { totalPercentage, hasSpending, processedData, topCategory };
}
