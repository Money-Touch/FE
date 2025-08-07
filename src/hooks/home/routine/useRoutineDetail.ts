import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { RoutineDetailResponse } from '../../../types/home/routine';

export function useRoutineDetail(routineId: number) {
  return useQuery<{
    isSuccess: boolean;
    result: RoutineDetailResponse;
  }>({
    queryKey: ['routineDetail', routineId],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.get(`/api/house-holds/routines/list/${routineId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.data.isSuccess) {
        throw new Error('루틴 상세 조회 실패');
      }

      return res.data;
    },
    enabled: !!routineId,
  });
}
