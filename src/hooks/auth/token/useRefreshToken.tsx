import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { AxiosError } from 'axios';
import type {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../../../types/auth/token/refresh';

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, AxiosError, RefreshTokenRequest>({
    mutationFn: async (body) => {
      const res = await API.post('/api/auth/refresh', body, {
        headers: {
          Authorization: `Bearer ${body.refreshToken}`,
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });
      return res.data;
    },
  });
};
