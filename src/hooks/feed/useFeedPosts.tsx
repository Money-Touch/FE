import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { API } from '../../apis/axios';
import type {
  FeedListResultDTO,
  ApiResponse,
  SortType,
  FeedRequestParams,
} from '../../types/feed/feed';

interface PageParam {
  cursorId: number | null;
  cursorViewCount: number | null;
}

type Page = FeedListResultDTO & {
  hasNext: boolean;
  nextCursorId: number | null;
  nextCursorViewCount: number | null;
};

const fetchFeedPosts = async (
  sortType: SortType,
  pageParam: PageParam,
): Promise<Page> => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('No access token');

  const params: FeedRequestParams = {
    sortType,
    ...(sortType === 'RECENT'
      ? pageParam.cursorId !== null
        ? { cursorId: pageParam.cursorId }
        : {}
      : {}),
    ...(sortType === 'POPULAR'
      ? pageParam.cursorId !== null && pageParam.cursorViewCount !== null
        ? {
            cursorId: pageParam.cursorId,
            cursorViewCount: pageParam.cursorViewCount,
          }
        : {}
      : {}),
  };

  const res = await API.get<ApiResponse<Page>>('/api/feed/home', {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.result;
};

export const useFeedPosts = (sortType: SortType) => {
  return useInfiniteQuery<
    Page,
    Error,
    InfiniteData<Page>,
    [string, SortType],
    PageParam
  >({
    queryKey: ['feed', sortType],
    initialPageParam: { cursorId: null, cursorViewCount: null },
    queryFn: ({ pageParam }) => fetchFeedPosts(sortType, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      if (sortType === 'RECENT') {
        if (lastPage.nextCursorId != null) {
          return { cursorId: lastPage.nextCursorId, cursorViewCount: null };
        }
        return undefined;
      } else {
        if (
          lastPage.nextCursorId != null &&
          lastPage.nextCursorViewCount != null
        ) {
          return {
            cursorId: lastPage.nextCursorId,
            cursorViewCount: lastPage.nextCursorViewCount,
          };
        }
        return undefined;
      }
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
