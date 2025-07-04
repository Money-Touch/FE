import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingSchema } from "../../../../schemas/auth/signup/settingSchema";
import type { SettingFormValues } from "../../../../schemas/auth/signup/settingSchema";
import SettingInput from "./settingInput";
import { useRequestEmailCode, useVerifyEmailCode, useSignUp } from "../../../../hooks/auth/signup/useSettingMutation";
import * as S from "../../../../styles/auth/signup/signup";

interface SettingFormProps {
    onNext: () => void;
}

const SettingForm = ({ onNext }: SettingFormProps) => {
    const methods = useForm<SettingFormValues>({
        resolver: zodResolver(settingSchema),
        mode: "onChange",
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = methods;

    const { mutate: requestEmailCode } = useRequestEmailCode();
    const { mutate: verifyEmailCode } = useVerifyEmailCode();
    const { mutate: signUp } = useSignUp();

    const handleRequestCode = () => {
        requestEmailCode(
            { email: getValues("email") },
            {
                onSuccess: () => {
                    console.log("이메일 전송 성공");
                },
                onError: (err) => {
                    console.error("이메일 전송 실패", err);
                },
            }
        );
    };

    const handleVerifyCode = () => {
        verifyEmailCode(
            { email: getValues("email"), code: getValues("code") },
            {
            onSuccess: () => {
                console.log("인증 성공");
            },
            onError: (err) => {
                console.error("인증 실패", err);
            },
            }
        );
    };

    const onSubmit = (data: SettingFormValues) => {
        signUp(data, {
            onSuccess: () => {
                console.log("회원가입 성공");
                onNext();
            },
            onError: (err) => {
            console.error("회원가입 실패", err);
            },
        });
    };

    return (
        <FormProvider {...methods}>
            <S.Container onSubmit={handleSubmit(onSubmit)} id="signupForm">
                <S.InputWrapper>
                    <SettingInput label="이메일" required register={register("email")} error={errors.email} buttonText="인증요청" name="email" placeholder="이메일 주소" onClickButton={handleRequestCode} />
                </S.InputWrapper>

                <S.InputWrapper>
                    <SettingInput label="인증번호" required register={register("code")} error={errors.code} buttonText="인증하기" name="code" placeholder="인증번호 6자리를 입력해주세요." onClickButton={handleVerifyCode}/>
                </S.InputWrapper>

                <S.InputWrapper>
                    <SettingInput label="비밀번호" required register={register("password")} error={errors.password} name="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상 15자 이하" type="password" />
                </S.InputWrapper>

                <S.InputWrapper>
                    <SettingInput label="비밀번호 확인" required register={register("confirmPassword")} error={errors.confirmPassword} name="confirmPassword" placeholder="비밀번호를 다시 입력해주세요." type="password" />
                </S.InputWrapper>
            </S.Container>

            <S.BottomContainer style={{ marginTop: "7.6rem" }}>
                <S.NextButton type="submit" form="signupForm" active={methods.formState.isValid}>
                    다음
                </S.NextButton>
            </S.BottomContainer>
        </FormProvider>
    );
};

export default SettingForm;
