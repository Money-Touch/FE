import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { DailyCalendarResponse } from '../../../types/money/money/dailyCalendar';

const fetchDailyCalendarDetail = async (
  year: number,
  month: number,
  day: number,
  cursorId?: number,
): Promise<DailyCalendarResponse> => {
  const token = localStorage.getItem('accessToken') || '';
  const { data } = await API.get<DailyCalendarResponse>(
    '/api/house-holds/consumptions/calendar/daily',
    {
      params: {
        year,
        month,
        day,
        ...(cursorId != null ? { cursorId } : {}),
      },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  return data;
};

export const useDailyCalendarQuery = (
  year: number,
  month: number,
  day: number,
  enabled = true,
) => {
  return useInfiniteQuery<
    DailyCalendarResponse,
    Error,
    InfiniteData<DailyCalendarResponse>,
    [string, number, number, number],
    number | undefined
  >({
    queryKey: ['dailyCalendarDetail', year, month, day],
    queryFn: ({ pageParam = undefined }) =>
      fetchDailyCalendarDetail(year, month, day, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext
        ? (lastPage.result.nextCursorId ?? undefined)
        : undefined,
    initialPageParam: undefined,
    enabled:
      enabled &&
      Number.isFinite(year) &&
      Number.isFinite(month) &&
      Number.isFinite(day),
  });
};
