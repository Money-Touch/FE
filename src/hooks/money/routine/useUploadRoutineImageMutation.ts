import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

type UploadResult = {
  routineImageUrl?: string;
  routineImgUrl?: string;
  url?: string;
};

export const useUploadRoutineImageMutation = () => {
  const accessToken = localStorage.getItem('accessToken') || '';

  return useMutation<ApiResponse<UploadResult>, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const res = await API.post('/api/house-holds/routines/img', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': undefined,
        },
      });

      const data = res.data;
      if (!data?.isSuccess) {
        throw new Error(data?.message || '이미지 업로드에 실패했습니다.');
      }
      return data;
    },
  });
};
