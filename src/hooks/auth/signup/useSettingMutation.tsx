import { useMutation } from "@tanstack/react-query";
import { API } from "../../../apis/axios";
import type { RequestEmailCodePayload, VerifyEmailCodePayload, SignUpPayload } from "../../../types/auth/signup/setting";

// 이메일 인증 요청
const requestEmailCode = async ({ email }: RequestEmailCodePayload) => {
    const response = await API.post("/users", { email });
    return response.data;
};

// 인증번호 검증 요청
const verifyEmailCode = async ({ email, code }: VerifyEmailCodePayload) => {
    const response = await API.post("/users", { email, code });
    return response.data;
};

// 최종 회원가입 제출
const submitSignUp = async ({ email, password, confirmPassword }: SignUpPayload) => {
    const response = await API.post("/users", { email, password, confirmPassword });
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

export const useSignUp = () =>
    useMutation({
        mutationFn: submitSignUp,
    });