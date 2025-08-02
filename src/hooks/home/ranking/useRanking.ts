import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { RankingResponse } from '../../../types/home/ranking';

export function useRanking() {
  return useQuery<{
    isSuccess: boolean;
    result: RankingResponse;
  }>({
    queryKey: ['ranking'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.get('/api/home/ranking', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.data.isSuccess) {
        throw new Error('랭킹 조회 실패');
      }

      return res.data;
    },
  });
}
