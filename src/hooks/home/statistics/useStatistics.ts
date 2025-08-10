import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { StatisticsResponse } from '../../../types/home/statistics';

export function useStatistics() {
  return useQuery<StatisticsResponse>({
    queryKey: ['statistics'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.get('/api/home/statistics', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.data.isSuccess) {
        throw new Error('소비 통계 조회 실패');
      }

      return res.data;
    },
  });
}

export function useOtherCategories() {
  return useQuery({
    queryKey: ['otherCategories'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.get('/api/home/statistics/others', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.data.isSuccess) {
        throw new Error('기타 카테고리 조회 실패');
      }

      return res.data.result.otherCategories;
    },
  });
}
