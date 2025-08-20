import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { CategoryReponse } from '../../../types/money/addday/addday';

export const fetchCategory = async (): Promise<CategoryReponse> => {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await API.get<CategoryReponse>(
    `/api/consumptionrecord/categories`,
    {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  );
  return data;
};

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });
};
