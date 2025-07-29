import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

export const useMypageQuery = () => {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: async () => {
      const res = await API.get('/api/user/mypage');
      return res.data;
    },
    retry: false,
  });
};
