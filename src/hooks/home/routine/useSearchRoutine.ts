import { useInfiniteQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { RoutineSearchResponse } from '../../../types/home/routine';

export function useRoutineSearch(keyword: string) {
  return useInfiniteQuery<RoutineSearchResponse, Error>({
    queryKey: ['routineSearch', keyword],
    queryFn: async ({ pageParam = null }) => {
      const url =
        pageParam !== null
          ? `/api/house-holds/routines/list/search?keyword=${keyword}&cursorId=${pageParam}`
          : `/api/house-holds/routines/list/search?keyword=${keyword}`;

      const res = await API.get<RoutineSearchResponse>(url);
      if (!res.data.isSuccess) {
        throw new Error(res.data.message || '검색 실패');
      }
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext ? lastPage.result.nextCursorId : undefined,
    enabled: !!keyword,
    initialPageParam: null,
  });
}
