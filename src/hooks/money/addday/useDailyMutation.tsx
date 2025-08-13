import { API } from '../../../apis/axios';
import type {
  CreateConsumptionPayload,
  CreateConsumptionResponse,
} from '../../../types/money/addday/addday';

export const useDailyMutation = async (
  payload: CreateConsumptionPayload,
): Promise<CreateConsumptionResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.post<CreateConsumptionResponse>(
    '/api/house-holds/consumptions/daily',
    payload,
    {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  );

  return data;
};
