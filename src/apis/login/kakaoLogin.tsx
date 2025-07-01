import axios from "axios";
import { getApiBaseUrl } from "../../utils/auth/login/kakao/getApiBaseUrl"
import type { KakaoLoginRequest, KakaoLoginResponse } from "../../types/auth/login/login";

// 백엔드로 인가코드 전송
export const kakaoLogin = async (
    payload: KakaoLoginRequest
    ): Promise<KakaoLoginResponse> => {
    const res = await axios.post<KakaoLoginResponse>(
        `${getApiBaseUrl()}/auth/kakao`,
        payload
    );
    return res.data;
};
