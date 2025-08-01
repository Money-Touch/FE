import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { UserRecord } from '../../../types/home/record';

export function useSubmitRecord(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: async ({
      formData,
      file,
    }: {
      formData: UserRecord;
      file: File | null;
    }) => {
      const accessToken = localStorage.getItem('accessToken');
      const form = new FormData();

      form.append(
        'data',
        new Blob(
          [
            JSON.stringify({
              ...formData,
              memo: formData.isPublic ? formData.memo : '',
            }),
          ],
          { type: 'application/json' },
        ),
      );

      if (formData.isPublic && file) {
        form.append('file', file);
      }

      const res = await API.post('/api/consumptionrecord/record', form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },

    onSuccess: (data) => {
      console.log('등록 성공:', data);
      if (onSuccessCallback) onSuccessCallback();
    },

    onError: (err) => {
      console.error('등록 실패:', err);
    },
  });
}
