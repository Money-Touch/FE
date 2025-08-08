import { API } from '../../../apis/axios';
import type { FeedResponse } from '../../../types/auth/mypage/myfeed';

export const fetchFeed = async ({
  pageParam,
  viewMode,
}: {
  pageParam?: number | null;
  viewMode: 'CARD' | 'LIST';
}): Promise<FeedResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const pageSize = viewMode === 'CARD' ? 20 : 5;

  const { data } = await API.get<FeedResponse>('/api/feed/my', {
    params: {
      viewMode,
      pageSize,
      ...(pageParam !== null &&
        pageParam !== undefined && { cursorId: pageParam }),
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
