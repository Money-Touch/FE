import { API } from '../../../apis/axios';
import type { DeleteConsumptionResponse } from '../../../types/money/money/daily';

export const useDailyDeleteMutation = async (
  consumptionRecordId: number,
): Promise<DeleteConsumptionResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.delete<DeleteConsumptionResponse>(
    `/api/house-holds/consumptions/daily/${consumptionRecordId}`,
    {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  );

  return data;
};
