import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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
  const accessToken =
    localStorage.getItem('accessToken') ||
    localStorage.getItem('ACCESS_TOKEN') ||
    '';

  // 업로드는 API 인스턴스의 기본 JSON 헤더 영향을 피하기 위해 axios 기본 인스턴스 사용
  const baseURL = (API.defaults.baseURL as string) || '';

  return useMutation<ApiResponse<UploadResult>, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post<ApiResponse<UploadResult>>(
        baseURL + '/api/house-holds/routines/img',
        formData,
        {
          headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            // Content-Type 설정하지 않음 (브라우저가 boundary 포함해 자동 설정)
          },
          withCredentials: true,
        },
      );

      const data = res.data;
      if (!data?.isSuccess) {
        throw new Error(data?.message || '이미지 업로드에 실패했습니다.');
      }
      return data;
    },
  });
};
