export interface SpendingCategory {
  name: string;
  amount: number;
}

export interface ProcessedDataItem extends SpendingCategory {
  percentage: number;
  color: string;
}
