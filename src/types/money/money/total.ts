export interface TotalConsumption {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    budgetId: number | null;
    totalConsumptionAmount: number;
  };
}
