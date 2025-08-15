import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

// ----- Request / Response Types -----
export interface CreateRoutineBody {
  totalBudget: number;
  routineName: string;
  routineImgUrl?: string;
  hashtags: string[];
  budgetList: { categoryName: string; amount: number }[];
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

type CreateRoutineParams = {
  budgetId: number;
  body: CreateRoutineBody;
};

type CreateRoutineResult = { routineId: number };

// ----- Mutation Hook -----
export const useCreateRoutineMutation = () => {
  const accessToken =
    localStorage.getItem('accessToken') ||
    localStorage.getItem('ACCESS_TOKEN') ||
    '';

  return useMutation<
    ApiResponse<CreateRoutineResult>,
    Error,
    CreateRoutineParams
  >({
    mutationFn: async ({ budgetId, body }) => {
      if (!budgetId) {
        throw new Error('예산 ID(budgetId)가 없습니다.');
      }

      // 공통 axios 인스턴스(API) 사용
      const res = await API.post<ApiResponse<CreateRoutineResult>>(
        `/api/house-holds/routines/${budgetId}`,
        body,
        {
          headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            'Content-Type': 'application/json',
          },
          // 필요 시 쿠키 사용 시: withCredentials: true
        },
      );

      const data = res.data;

      if (!data?.isSuccess) {
        throw new Error(data?.message || '소비 루틴 등록에 실패했습니다.');
      }

      return data;
    },
  });
};
