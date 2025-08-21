import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { FixedCostResponse } from '../../../types/money/money/fixedCost';

const fetchFixedCostList = async (
  year: number,
  month: number,
  cursorId?: number,
): Promise<FixedCostResponse> => {
  const { data } = await API.get<FixedCostResponse>(
    '/api/house-holds/fixed-consumptions/list',
    {
      params: {
        year,
        month,
        ...(cursorId ? { cursorId } : {}),
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
      },
    },
  );
  return data;
};

export const useFixedCostQuery = (year: number, month: number) => {
  return useInfiniteQuery<
    FixedCostResponse,
    Error,
    InfiniteData<FixedCostResponse, number | undefined>,
    [string, number, number],
    number | undefined
  >({
    queryKey: ['fixedCostList', year, month],
    queryFn: ({ pageParam }) =>
      fetchFixedCostList(year, month, pageParam as number | undefined),
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext
        ? (lastPage.result.nextCursorId ?? undefined)
        : undefined,
    initialPageParam: undefined as number | undefined,
  });
};
