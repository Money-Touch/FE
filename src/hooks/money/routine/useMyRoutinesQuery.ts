// src/hooks/money/routine/useMyRoutinesQuery.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

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

// ✅ year/month를 인자로 받고, 미지정 시 현재 날짜로 기본값 설정
export function useMyRoutinesQuery(yearInput?: number, monthInput?: number) {
  const now = new Date();
  const year = yearInput ?? now.getFullYear();
  const month = monthInput ?? now.getMonth() + 1;

  return useInfiniteQuery<ApiResponse<RoutineListResult>, Error>({
    queryKey: ['my-routines', year, month], // ✅ 캐시 분리
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const accessToken =
        localStorage.getItem('accessToken') ||
        localStorage.getItem('ACCESS_TOKEN') ||
        '';

      const res = await API.get<ApiResponse<RoutineListResult>>(
        '/api/house-holds/routines/users',
        {
          params: {
            year, // ✅ 여기서 year/month 사용
            month,
            ...(pageParam ? { cursorId: pageParam } : {}),
          },
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
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
