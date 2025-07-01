export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

// 일반 로그인
export interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: UserInfo;
}

// 카카오 로그인
export interface KakaoLoginRequest {
  code: string;
  redirectUri: string;
}
export type KakaoLoginResponse = LoginResponse;
