import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { RoutinesPreviewResponse } from '../../../types/home/routine';

export function useRoutinePreview() {
  return useQuery<RoutinesPreviewResponse>({
    queryKey: ['routinesPreview'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.get('/api/home/routinesPreview', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.data.isSuccess) {
        throw new Error('루틴 목록 조회 실패');
      }

      return res.data;
    },
  });
}
