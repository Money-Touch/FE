import { useInfiniteQuery } from '@tanstack/react-query';
import type { FeedResponse } from '../../../types/auth/mypage/myfeed';
import type { InfiniteData } from '@tanstack/react-query';
import { fetchFeed } from './useFeedQuery';

export const useInfiniteFeedQuery = (viewMode: 'CARD' | 'LIST') => {
  return useInfiniteQuery<
    FeedResponse,
    Error,
    InfiniteData<FeedResponse>,
    [string, string],
    number | null
  >({
    queryKey: ['feed', viewMode],
    queryFn: ({ pageParam }) => fetchFeed({ pageParam, viewMode }),
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext ? lastPage.result.nextCursorId : null,
    initialPageParam: null,
  });
};
