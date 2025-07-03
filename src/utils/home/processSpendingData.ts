import type {
  SpendingCategory,
  ProcessedDataItem,
} from "../../types/home/spending";
import colors from "../../styles/common/colors";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_COLORS,
} from "../../constants/defaultSpending";

export function processSpendingData(
  spendingData: SpendingCategory[],
  hasSpending: boolean
): ProcessedDataItem[] {
  const nonZeroData = spendingData.filter((item) => item.amount > 0);

  if (!hasSpending || nonZeroData.length === 0) {
    return DEFAULT_CATEGORIES.map((name, idx) => {
      const matchedItem = spendingData.find((item) => item.name === name) || {
        name,
        amount: 0,
      };

      return {
        ...matchedItem,
        percentage: 20,
        color: DEFAULT_COLORS[idx],
      };
    });
  }

  const totalAmount = nonZeroData.reduce((sum, item) => sum + item.amount, 0);

  if (nonZeroData.length === 1) {
    return [
      {
        ...nonZeroData[0],
        percentage: 100,
        color: colors.mainColor1,
      },
    ];
  }

  const sorted = [...nonZeroData].sort((a, b) => b.amount - a.amount);
  const top5 = sorted.slice(0, 5);
  const others = sorted.slice(5);
  const otherAmount = others.reduce((sum, item) => sum + item.amount, 0);

  const colorOrder = DEFAULT_COLORS;

  let processedData = top5.map((item, idx) => ({
    ...item,
    percentage: +((item.amount / totalAmount) * 100).toFixed(1),
    color: colorOrder[idx % colorOrder.length],
  }));

  if (otherAmount > 0) {
    processedData.push({
      name: "그 외",
      amount: otherAmount,
      percentage: +((otherAmount / totalAmount) * 100).toFixed(1),
      color: colors.mainColor2,
    });
  }

  const percentSum = processedData.reduce(
    (sum, item) => sum + item.percentage,
    0
  );
  const diff = +(100 - percentSum).toFixed(1);
  if (diff !== 0) {
    const maxIdx = processedData.reduce(
      (maxIdx, item, idx) =>
        item.amount > processedData[maxIdx].amount ? idx : maxIdx,
      0
    );
    processedData[maxIdx].percentage = +(
      processedData[maxIdx].percentage + diff
    ).toFixed(1);
  }

  return processedData;
}
