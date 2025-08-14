import { API } from '../../../apis/axios';
import type {
  DeleteRequest,
  DeleteResponse,
} from '../../../types/auth/mypage/mypage';

export const useDeleteMutation = async (
  payload: DeleteRequest,
): Promise<DeleteResponse> => {
  const { data } = await API.post<DeleteResponse>('/api/user/delete', null, {
    params: { userId: payload.userId },
  });
  return data;
};
