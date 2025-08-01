import { useInfiniteQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { RoutineResponse } from '../../../types/home/routine';

export function useRoutine() {
  return useInfiniteQuery<RoutineResponse, Error>({
    queryKey: ['routineData'],
    queryFn: async ({ pageParam = null }) => {
      const accessToken = localStorage.getItem('accessToken');
      const url = pageParam
        ? `/api/house-holds/routines/list?cursorId=${pageParam}`
        : '/api/house-holds/routines/list';

      const res = await API.get<RoutineResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.data.isSuccess) {
        throw new Error(res.data.message || '조회 실패');
      }

      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext ? lastPage.result.nextCursorId : undefined,
    initialPageParam: null,
  });
}
