import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { RoutineDetailResponse } from '../../../types/money/registration/routineDetail';

export const fetchRoutineDetail = async (
  routineId: number,
): Promise<RoutineDetailResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.get<RoutineDetailResponse>(
    `/api/house-holds/routines/list/${routineId}/apply-info`,
    {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  );
  return data;
};

export const useRoutineDetailQuery = (routineId?: number) => {
  return useQuery({
    queryKey: ['routineDetail', routineId],
    queryFn: () => fetchRoutineDetail(routineId!),
    enabled: !!routineId,
  });
};
