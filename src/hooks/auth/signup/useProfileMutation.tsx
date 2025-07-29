import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { AxiosError } from 'axios';

interface UploadResponse {
  result: string;
}

export const useProfileMutation = () => {
  return useMutation<UploadResponse, AxiosError, FormData>({
    mutationFn: async (formData: FormData) => {
      const res = await API.post('/api/test/s3/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },

    onSuccess: (data) => {
      console.log('저장 성공: ', data);
    },

    onError: (error) => {
      console.error('저장 실패: ', error.response?.data || error.message);
    },
  });
};
