import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { ResultProps } from '../../../types/auth/test/result';

const fetchResult = async (): Promise<ResultProps> => {
  const result = localStorage.getItem('resultCode');
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.get('/api/consumptionMbti/result', {
    params: { result },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const useResultQuery = ({ enabled = true } = {}) => {
  return useQuery<ResultProps>({
    queryKey: ['result'],
    queryFn: fetchResult,
    enabled,
    retry: false,
  });
};
