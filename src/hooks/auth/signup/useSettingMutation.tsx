import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type {
  RequestEmailCodePayload,
  VerifyEmailCodePayload,
  EmailSendResponse,
  VerifyEmailCodeResponse,
} from '../../../types/auth/signup/setting';

// 이메일 인증 요청
const requestEmailCode = async ({ to, isResend }: RequestEmailCodePayload) => {
  const response = await API.get<EmailSendResponse>('/api/user/email/send', {
    params: { to, isResend },
  });
  return response.data;
};

// 인증번호 검증 요청
const verifyEmailCode = async ({ email, code }: VerifyEmailCodePayload) => {
  const response = await API.get<VerifyEmailCodeResponse>(
    '/api/user/email/verify',
    { params: { email, code } },
  );
  return response.data;
};

export const useRequestEmailCode = () =>
  useMutation({
    mutationFn: requestEmailCode,
  });

export const useVerifyEmailCode = () =>
  useMutation({
    mutationFn: verifyEmailCode,
  });
