export interface CalendarConsumptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    data: Record<string, number>;
  };
}
