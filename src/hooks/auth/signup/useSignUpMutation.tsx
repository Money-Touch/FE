import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { AxiosError } from 'axios';
import type {
  SignUpPayload,
  SignUpResponse,
} from '../../../types/auth/signup/profile';

export const useSignUpMutation = () => {
  return useMutation<SignUpResponse, AxiosError, SignUpPayload>({
    mutationFn: async (payload) => {
      const res = await API.post('/api/user/signup/local', payload);
      return res.data;
    },

    onSuccess: () => {
      console.log('회원가입 성공');
    },

    onError: (error) => {
      console.error('회원가입 실패:', error.response?.data || error.message);
    },
  });
};
