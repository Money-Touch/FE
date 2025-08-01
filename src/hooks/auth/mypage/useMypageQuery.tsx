import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

export const useMypageQuery = () => {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken');
      const res = await API.get('/api/user/mypage', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    },
    retry: false,
  });
};
