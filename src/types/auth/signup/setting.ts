import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface InputButtonProps {
  hasError?: boolean;
  hasButton?: boolean;
  hasDelete?: boolean;
}

export interface SettingInputProps {
  name: string;
  label?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  buttonText?: string;
  onClickButton?: () => void;
  placeholder: string;
  inputDisabled?: boolean;
  buttonDisabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

export interface RequestEmailCodePayload {
  to: string;
}

export interface EmailSendResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

export interface VerifyEmailCodePayload {
  email: string;
  code: string;
}

export type VerifyEmailCodeResponse = EmailSendResponse;
