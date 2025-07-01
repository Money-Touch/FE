import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { LoginRequest, LoginResponse } from '../../../types/auth/login/login';

export const useLoginMutation = () =>
  useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: async (loginData) => {
      const response = await API.post<LoginResponse>('/users', loginData);
      return response.data;
    },
  });