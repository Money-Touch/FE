import { API } from '../../../apis/axios';
import type { CalendarConsumptionResponse } from '../../../types/money/money/monthlyCalendar';
import { useQuery } from '@tanstack/react-query';

export const fetchCalendarConsumption = async (
  year: number,
  month: number,
): Promise<CalendarConsumptionResponse> => {
  const token = localStorage.getItem('accessToken');
  const { data } = await API.get<CalendarConsumptionResponse>(
    '/api/house-holds/consumptions/calendar',
    {
      params: { year, month },
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const useMonthlyCalendarQuery = (year: number, month: number) => {
  return useQuery({
    queryKey: ['calendarConsumption', year, month],
    queryFn: () => fetchCalendarConsumption(year, month),
    enabled: !!year && !!month,
  });
};
