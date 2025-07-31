export interface ProfileFormPayload {
  profileImage?: File;
}

export interface SignUpPayload {
  email: string;
  password: string;
  agreeTerms?: {
    termsId: number;
    isAgree: boolean;
  }[];
  nickname: string;
}

export interface SignUpResponse {
  result: {
    userId: number;
    createdAt: string;
  };
}
