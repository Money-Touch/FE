import { useQuery } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await API.get('/users');
  return data;
};

export const useFeedQuery = () => {
  return useQuery<User[]>({
    queryKey: ['feed'],
    queryFn: fetchUsers,
  });
};
