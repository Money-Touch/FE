export interface FixedCostPayload {
  amount: number;
  categoryName: string;
  content: string;
  memo?: string;
}

export interface FixedCostResponse {
  isSuccess: boolean;
  code: string;
  message: string;

  result?: {
    fixedConsumptionId?: number;
  };
}
