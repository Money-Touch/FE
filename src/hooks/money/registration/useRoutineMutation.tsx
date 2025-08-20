import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { RoutinePayload } from '../../../types/money/registration/routine';

export const useRoutineMutation = () => {
  return useMutation({
    mutationFn: async ({
      routineId,
      data,
    }: {
      routineId: number;
      data: RoutinePayload;
    }) => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.patch(
        `/api/house-holds/routines/list/${routineId}/apply`,
        data,
        {
          params: { routineId },
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        },
      );
      return res.data;
    },
  });
};
