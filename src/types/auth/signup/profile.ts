// 이미지 업로드 응답
export interface UploadedProfileImage {
  profileImgUrl?: string;
}

// 회원가입
export interface SignUpPayload extends UploadedProfileImage {
  email: string;
  password: string;
  nickname: string;
  agreeTerms?: {
    termsId: number;
    isAgree: boolean;
  }[];
}

// 회원가입 응답
export interface SignUpResponse {
  result: {
    userId: number;
    createdAt: string;
  };
}
