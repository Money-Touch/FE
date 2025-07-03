import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface InputButtonProps {
  hasError?: boolean;
  hasButton?: boolean;
  hasDelete?: boolean;
}

export interface SettingInputProps {
    name: string;
    label: string;
    required?: boolean;
    register?: UseFormRegisterReturn;
    error?: FieldError;
    type?: string;
    buttonText?: string;
    onClickButton?: () => void;
    placeholder: string;
}

export interface RequestEmailCodePayload {
    email: string;
}

export interface VerifyEmailCodePayload {
    email: string;
    code: string;
}

export interface SignUpPayload {
    email: string;
    password: string;
    confirmPassword: string;
}