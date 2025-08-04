import type {
  StatisticsResult,
  ProcessedDataItem,
} from '../../types/home/statistics';
import {
  DEFAULT_CATEGORIES,
  DEFAULT_COLORS,
} from '../../constants/home/defaultSpending';

export function processSpendingData(
  data: StatisticsResult,
  hasSpending: boolean,
  otherCategories: ProcessedDataItem[] = [],
): ProcessedDataItem[] {
  const { topCategories, hasOthers, othersPercent } = data;

  if (!hasSpending || topCategories.length === 0) {
    return DEFAULT_CATEGORIES.map((categoryName, idx) => ({
      categoryName,
      percentage: 20,
      color: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
    }));
  }

  const processedData: ProcessedDataItem[] = topCategories.map((item, idx) => ({
    categoryName: item.categoryName,
    amount: 0,
    percentage: +item.percentage.toFixed(1),
    color: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
  }));

  if (hasOthers) {
    processedData.push({
      categoryName: '그 외',
      percentage: +othersPercent.toFixed(1),
      color: 'var(--color-mainColor2)',
      isOther: true,
      items: otherCategories,
    });
  }

  const percentSum = processedData.reduce(
    (sum, item) => sum + item.percentage,
    0,
  );
  const diff = +(100 - percentSum).toFixed(1);

  if (diff !== 0) {
    const maxIdx = processedData.reduce(
      (maxIdx, item, idx) =>
        item.percentage > processedData[maxIdx].percentage ? idx : maxIdx,
      0,
    );
    processedData[maxIdx].percentage = +(
      processedData[maxIdx].percentage + diff
    ).toFixed(1);
  }

  return processedData;
}
