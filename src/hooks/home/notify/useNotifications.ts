import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { NotificationResponse } from '../../../types/home/notification';

export function useNotifications() {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<NotificationResponse, Error>({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = null }) => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.get('/api/notification/list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { cursor: pageParam },
      });

      if (!res.data.isSuccess) {
        throw new Error('알림 조회 실패');
      }

      return res.data.result;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursorId : undefined,
    initialPageParam: null,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (id: number) => {
      const accessToken = localStorage.getItem('accessToken');

      const res = await API.patch(
        `/api/notification/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!res.data.isSuccess) {
        throw new Error('알림 읽음 처리 실패');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      console.log('알림 읽음 처리 성공');
    },
  });

  const notifications =
    data?.pages.flatMap((page) => page.notificationList) || [];

  return {
    notifications,
    markAsRead,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
}
