import { useInfiniteQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { MonthlyConsumptionResponse } from '../../../types/money/money/monthly';

const fetchMonthlyConsumptions = async (
  year: number,
  month: number,
  cursorId?: number,
): Promise<MonthlyConsumptionResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.get<MonthlyConsumptionResponse>(
    '/api/house-holds/consumptions/monthly',
    {
      params: { year, month, cursorId },
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  );

  return data;
};

export const useMonthlyQuery = (
  year: number | null | undefined,
  month: number | null | undefined,
  enabled = true,
) => {
  const canRun =
    enabled && typeof year === 'number' && typeof month === 'number';

  const keyYear = typeof year === 'number' ? year : -1;
  const keyMonth = typeof month === 'number' ? month : -1;

  return useInfiniteQuery({
    queryKey: ['monthlyConsumptions', keyYear, keyMonth],
    enabled: canRun,
    queryFn: ({ pageParam }) =>
      fetchMonthlyConsumptions(
        keyYear,
        keyMonth,
        pageParam as number | undefined,
      ),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext
        ? lastPage.result.monthlyHistory.at(-1)?.items.at(-1)
            ?.consumptionRecordId
        : undefined,
  });
};
