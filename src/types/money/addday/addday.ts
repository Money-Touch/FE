export interface CreateConsumptionPayload {
  categoryName: string;
  amount: number;
  content: string;
  memo: string;
  consumeDate: string;
}

export interface CreateConsumptionResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

export interface CategoryReponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    categoryName: string;
  }[];
}
