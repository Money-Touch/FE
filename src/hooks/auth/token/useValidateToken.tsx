import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { AxiosError } from 'axios';
import type {
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '../../../types/auth/token/validate';

export const useValidateToken = () => {
  return useMutation<ValidateTokenResponse, AxiosError, ValidateTokenRequest>({
    mutationFn: async (body) => {
      const res = await API.post('/api/auth/validate', body, {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
      return res.data;
    },
  });
};
