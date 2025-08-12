import { API } from '../axios';
import type {
  KakaoLoginRequest,
  KakaoLoginResponse,
} from '../../types/auth/login/login';

// 인가코드 전송
export const kakaoLogin = async (
  payload: KakaoLoginRequest,
): Promise<KakaoLoginResponse> => {
  // console.log('인가코드 전송', payload);
  const res = await API.get<KakaoLoginResponse>('/auth/login/kakao', {
    params: payload,
  });
  return res.data;
};
