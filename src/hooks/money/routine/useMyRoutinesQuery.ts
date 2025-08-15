// src/hooks/money/routine/useMyRoutinesQuery.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

// ---- API types ----
export type RoutineItem = {
  routineId: number;
  createDate: string;
  routineName: string;
  nickname: string;
  routineImgUrl?: string;
  profileImgUrl?: string;
  hashtags: string[];
};

export type RoutineListResult = {
  routineList: RoutineItem[];
  routineListSize: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  nextCursorId: number | null;
};

export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export function useMyRoutinesQuery() {
  return useInfiniteQuery<ApiResponse<RoutineListResult>, Error>({
    queryKey: ['my-routines'],
    initialPageParam: undefined, // 첫 요청은 cursorId 없음
    queryFn: async ({ pageParam }) => {
      const accessToken =
        localStorage.getItem('accessToken') ||
        localStorage.getItem('ACCESS_TOKEN') ||
        '';

      const res = await API.get<ApiResponse<RoutineListResult>>(
        '/api/house-holds/routines/users',
        {
          params: pageParam ? { cursorId: pageParam } : undefined,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
          // withCredentials: true, // 쿠키 인증이면 해제
        },
      );

      const data = res.data;
      if (!data?.isSuccess) {
        throw new Error(data?.message || '루틴 목록 조회에 실패했습니다.');
      }
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage?.result?.hasNext
        ? (lastPage.result.nextCursorId ?? undefined)
        : undefined,
    staleTime: 60_000,
    retry: 1,
  });
}
