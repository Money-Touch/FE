import { API } from '../../../apis/axios';
import type { TotalConsumption } from '../../../types/money/money/total';
import { useQuery } from '@tanstack/react-query';

export const fetchTotalConsumption = async (
  year: number,
  month: number,
): Promise<TotalConsumption> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.get<TotalConsumption>(
    '/api/house-holds/budgets/total-consumption',
    {
      params: { year, month },
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  );

  return data;
};

export const useTotalQuery = (year?: number, month?: number) => {
  return useQuery<TotalConsumption>({
    queryKey: ['totalConsumption', year, month],
    queryFn: () => fetchTotalConsumption(year as number, month as number),
    enabled: typeof year === 'number' && typeof month === 'number',
  });
};
