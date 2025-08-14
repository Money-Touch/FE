export interface FixedConsumption {
  fixedConsumptionId: number;
  categoryName: string;
  amount: number;
  memo?: string;
}

export interface FixedCostResult {
  fixedConsumptions: FixedConsumption[];
  fixedConsumptionSize: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  nextCursorId: number | null;
}

export interface FixedCostResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FixedCostResult;
}
