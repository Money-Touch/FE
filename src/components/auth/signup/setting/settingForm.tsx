import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingSchema } from '../../../../schemas/auth/signup/settingSchema';
import type { SettingFormValues } from '../../../../schemas/auth/signup/settingSchema';
import SettingInput from './settingInput';
import {
  useRequestEmailCode,
  useVerifyEmailCode,
} from '../../../../hooks/auth/signup/useSettingMutation';
import * as S from '../../../../styles/auth/signup/signup.style';

interface SettingFormProps {
  onNext: () => void;
}

const SettingForm = ({ onNext }: SettingFormProps) => {
  const methods = useForm<SettingFormValues>({
    resolver: zodResolver(settingSchema),
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const { mutate: requestEmailCode, isPending: isSending } =
    useRequestEmailCode();
  const { mutate: verifyEmailCode, isPending: isVerifying } =
    useVerifyEmailCode();

  const [cooldown, setCooldown] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [emailLocked, setEmailLocked] = useState(false);

  const canSubmit = methods.formState.isValid && verified;

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleRequestCode = () => {
    const rawEmail = getValues('email') ?? '';
    const email = rawEmail.trim();

    requestEmailCode(
      { to: email, isResend: emailSent },
      {
        onSuccess: () => {
          console.log('이메일 전송 성공');
          setEmailSent(true);
          setCooldown(60);
          setEmailLocked(true);
          alert('인증번호를 전송했습니다.');
        },
        onError: () => {
          alert('이미 가입된 이메일입니다. 다른 이메일을 입력해주세요');
          setEmailLocked(false);
          setEmailSent(false);
          setCooldown(0);
        },
      },
    );
  };

  const handleVerifyCode = () => {
    const email = (getValues('email') ?? '').trim();
    const code = (getValues('code') ?? '').trim();

    verifyEmailCode(
      { email, code },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            setVerified(true);
            setCooldown(0);
            console.log('인증 성공');
            alert('인증에 성공했습니다.');
          } else {
            console.error('인증 실패', data.message);
            alert(data.message || '인증번호가 올바르지 않거나 만료되었습니다.');
          }
        },
        onError: (err) => {
          console.error('요청 에러', err);
          alert('인증 요청 중 오류가 발생했습니다.');
        },
      },
    );
  };

  const onSubmit = (data: SettingFormValues) => {
    localStorage.setItem('email', data.email);
    localStorage.setItem('password', data.password);
    onNext();
  };

  const emailButtonText = verified
    ? '인증완료'
    : cooldown > 0
      ? `재전송\n(${cooldown}s)`
      : '인증요청';
  const emailButtonDisabled = verified || isSending || cooldown > 0;

  const emailInputDisabled =
    isSending || isVerifying || emailLocked || verified;

  const verifyButtonText = verified ? '인증완료' : '인증하기';

  const verifyButtonDisabled = !emailSent || isVerifying || verified;
  const codeInputDisabled = !emailSent || isVerifying || verified;

  return (
    <FormProvider {...methods}>
      <form
        className={S.Container}
        onSubmit={handleSubmit(onSubmit)}
        id="signupForm"
      >
        <div className={S.InputWrapper}>
          <SettingInput
            label="이메일"
            required
            register={register('email')}
            error={errors.email}
            buttonText={emailButtonText}
            name="email"
            placeholder="이메일 주소"
            onClickButton={handleRequestCode}
            buttonDisabled={emailButtonDisabled}
            loading={isSending}
            loadingText="전송 중..."
            inputDisabled={emailInputDisabled}
          />
        </div>

        <div className={S.InputWrapper}>
          <SettingInput
            label="인증번호"
            required
            register={register('code')}
            error={errors.code}
            buttonText={verifyButtonText}
            name="code"
            placeholder="인증번호 6자리를 입력해주세요."
            onClickButton={handleVerifyCode}
            buttonDisabled={verifyButtonDisabled}
            loading={isVerifying}
            loadingText="확인 중..."
            inputDisabled={codeInputDisabled}
          />
        </div>

        <div className={S.InputWrapper}>
          <SettingInput
            label="비밀번호"
            required
            register={register('password')}
            error={errors.password}
            name="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 15자 이하"
            type="password"
          />
        </div>

        <div className={S.InputWrapper}>
          <SettingInput
            label="비밀번호 확인"
            required
            register={register('confirmPassword')}
            error={errors.confirmPassword}
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
          />
        </div>
      </form>

      <div className={`${S.BottomContainer} !mt-[4.3rem]`}>
        <button
          className={S.NextButton(canSubmit)}
          type="submit"
          form="signupForm"
          disabled={!canSubmit}
        >
          다음
        </button>
      </div>
    </FormProvider>
  );
};

export default SettingForm;
