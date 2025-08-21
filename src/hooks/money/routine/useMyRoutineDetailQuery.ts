import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type RoutineDetail = {
  totalBudget: number;
  routineName: string;
  categoryBudgetList: Array<{ categoryName: string; amount: number }>;
  routineImgUrl?: string; // 서버에 있으면 사용
  routineImageUrl?: string; // 레거시 호환
  hashtags?: string[];
  nickname?: string;
  createDate?: string;
};

const fetchMyRoutineDetail = async (routineId: number) => {
  const { data } = await API.get<ApiResponse<RoutineDetail>>(
    `/api/house-holds/routines/users/${routineId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return data;
};

export const useMyRoutineDetailQuery = (routineId?: number) =>
  useQuery({
    queryKey: ['myRoutineDetail', routineId],
    queryFn: () => fetchMyRoutineDetail(routineId as number),
    enabled: !!routineId,
  });
