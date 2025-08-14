import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type {
  FixedCostPayload,
  FixedCostResponse,
} from '../../../types/money/fixedcost/fixedcost';

const postFixedCost = async (
  payload: FixedCostPayload,
): Promise<FixedCostResponse> => {
  const token = localStorage.getItem('accessToken');
  const { data } = await API.post<FixedCostResponse>(
    '/api/house-holds/fixed-consumptions',
    payload,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  return data;
};

export const useFixedCostMutation = () => {
  return useMutation({
    mutationKey: ['fixedCostCreate'],
    mutationFn: postFixedCost,
  });
};
