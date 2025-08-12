import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

export const useProfileNicknameQuery = (nickname: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['nicknameCheck', nickname],
    queryFn: async () => {
      const res = await API.get('/api/user/nickname', {
        params: { nickname },
      });
      return res.data;
    },
    enabled,
    retry: false,
  });
};
