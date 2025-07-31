import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { AxiosError } from 'axios';
import type {
  LoginPayload,
  LoginResponse,
} from '../../../types/auth/login/login';

export const useLoginMutation = () => {
  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: async (payload) => {
      const res = await API.post('/api/user/login/local', payload);
      return res.data;
    },
    onError: (error) => {
      console.error('로그인 실패:', error.response?.data || error.message);
    },
  });
};
