import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { BudgetDetailResponse } from '../../../types/money/registration/budgetDetail';

export const fetchBudgetDetail = async (
  budgetId: number,
): Promise<BudgetDetailResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.get<BudgetDetailResponse>(
    `/api/house-holds/budgets/${budgetId}`,
    {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  );
  return data;
};

export const useBudgetDetailQuery = (budgetId?: number) => {
  return useQuery({
    queryKey: ['budgetDetail', budgetId],
    queryFn: () => fetchBudgetDetail(budgetId!),
    enabled: !!budgetId,
  });
};
