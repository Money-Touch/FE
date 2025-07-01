import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { kakaoLogin } from "../../../apis/login/kakaoLogin";
import type { KakaoLoginRequest, KakaoLoginResponse } from "../../../types/auth/login/login";

export const useKakaoLoginMutation = (
    options?: UseMutationOptions<KakaoLoginResponse, unknown, KakaoLoginRequest>
  ) => {
    return useMutation({
      mutationFn: kakaoLogin,
      ...options,
    });
};
