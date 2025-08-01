import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { FeedResponse } from '../../../types/auth/mypage/myfeed';

const fetchFeed = async (viewMode: 'CARD' | 'LIST'): Promise<FeedResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.get<FeedResponse>('/api/feed/my', {
    params: { viewMode },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const useFeedQuery = (viewMode: 'CARD' | 'LIST') => {
  return useQuery<FeedResponse>({
    queryKey: ['feed', viewMode],
    queryFn: () => fetchFeed(viewMode),
  });
};
