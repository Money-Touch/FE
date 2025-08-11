export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

// 일반 로그인
export interface LoginInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

// 카카오 로그인
export interface KakaoLoginRequest {
  code: string;
  redirectUrl: string;
}
export type KakaoLoginResponse = LoginResponse;
