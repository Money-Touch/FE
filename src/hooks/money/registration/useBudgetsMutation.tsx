import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { BudgetPayload } from '../../../types/money/registration/budget';

export const useBudgetMutation = () => {
  const accessToken = localStorage.getItem('accessToken');

  return useMutation({
    mutationFn: async ({
      year,
      month,
      data,
    }: {
      year: number;
      month: number;
      data: BudgetPayload;
    }) => {
      const res = await API.post(
        `/api/house-holds/budgets?year=${year}&month=${month}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    },
  });
};
