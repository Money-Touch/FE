import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

export type FixedCostApiResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: unknown;
};

const deleteFixedCost = async (
  fixedConsumptionId: number,
): Promise<FixedCostApiResponse> => {
  const token = localStorage.getItem('accessToken');
  const { data } = await API.delete<FixedCostApiResponse>(
    `/api/house-holds/fixed-consumptions/${fixedConsumptionId}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  return data;
};

export const useFixedCostDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['fixedCostDelete'],
    mutationFn: deleteFixedCost,
    onSuccess: () => {
      // 고정비 목록 및 관련 리스트 새로고침
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey.join('|').includes('fixed'),
      });
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey.join('|').includes('money'),
      });
    },
  });
};
