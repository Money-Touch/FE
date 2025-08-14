export interface MonthlyConsumptionItem {
  consumptionRecordId: number;
  categoryName: string;
  content: string;
  amount: number;
}

export interface MonthlyDaily {
  date: string;
  items: MonthlyConsumptionItem[];
  itemsSize: number;
}

export interface MonthlyConsumptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    monthlyHistory: MonthlyDaily[];
    monthlyHistorySize: number;
    isFirst: boolean;
    isLast: boolean;
    hasNext: boolean;
  };
}
