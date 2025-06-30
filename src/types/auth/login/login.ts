export interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface LoginRequest {
  email: string;
  password: string;
}

// 임시
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}