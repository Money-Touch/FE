import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

interface CategoryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: { categoryName: string }[];
}

export function useCategories() {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await API.get<CategoryResponse>(
        '/api/consumptionrecord/categories',
      );
      if (res.data.isSuccess) {
        return res.data.result.map((c) => c.categoryName);
      } else {
        throw new Error('카테고리 불러오기 실패');
      }
    },
    staleTime: 1000 * 60 * 3,
  });
}
