import * as S from '../../../../styles/auth/signup/signup.style';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../../../../schemas/auth/signup/profileSchema';
import { z } from 'zod';
import { useProfileNicknameQuery } from '../../../../hooks/auth/signup/useProfileNicknameQuery';
import { useProfileImage } from '../../../../hooks/auth/signup/useProfileImage';
import ProfileImage from './profileImage';
import { useSignUpMutation } from '../../../../hooks/auth/signup/useSignUpMutation';
import { useProfileMutation } from '../../../../hooks/auth/signup/useProfileMutation';
import { useLoginMutation } from '../../../../hooks/auth/login/useLoginMutation';
import SettingInput from '../setting/settingInput';

interface ProfileFormProps {
  onNext: () => void;
}

const ProfileForm = ({ onNext }: ProfileFormProps) => {
  const [nicknameCheck, setNicknameCheck] = useState('');
  const [shouldCheck, setShouldCheck] = useState(false);
  const [isNicknameOk, setIsNicknameOk] = useState<boolean | null>(null);

  const methods = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });
  const { handleSubmit, formState, register, setError, clearErrors, watch } =
    methods;
  const { errors, isValid } = formState;

  const nicknameValue = watch('nickname');

  const { data, isFetching } = useProfileNicknameQuery(
    nicknameCheck,
    shouldCheck,
  );

  useEffect(() => {
    setIsNicknameOk(null);
    setShouldCheck(false);
    if (errors.nickname?.type === 'server') {
      clearErrors('nickname');
    }
  }, [nicknameValue]);

  useEffect(() => {
    if (!data) return;

    if (data.isSuccess) {
      setIsNicknameOk(true);
      clearErrors('nickname');
      alert('사용 가능한 닉네임입니다.');
    } else {
      setIsNicknameOk(false);
      setError('nickname', {
        type: 'server',
        message: data.message || '사용할 수 없는 닉네임입니다.',
      });
    }
  }, [data, setError, clearErrors]);

  const handleCheckNickname = () => {
    const nickname = methods.getValues('nickname');
    if (!nickname || nickname.trim().length < 2) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임은 2자 이상 입력해주세요.',
      });
      return;
    }
    setNicknameCheck(nickname.trim());
    setShouldCheck(true);
  };

  const { preview, fileInputRef, handleImgClick, handleChange } =
    useProfileImage();
  const { mutate: signUp } = useSignUpMutation();
  const { mutate: login } = useLoginMutation();
  const { mutate: uploadImage } = useProfileMutation();

  const onSubmit = (formDataInput: z.infer<typeof profileSchema>) => {
    if (isNicknameOk !== true) {
      setError('nickname', {
        type: 'server',
        message: '닉네임 중복확인을 완료해주세요.',
      });
      return;
    }

    const file = fileInputRef.current?.files?.[0];
    const email = localStorage.getItem('email') || '';
    const password = localStorage.getItem('password') || '';
    const agreeTerms = JSON.parse(localStorage.getItem('agreeTerms') || '[]');
    const nickname = formDataInput.nickname;

    const proceedToSignUp = (profileImgUrl?: string) => {
      const signUpPayload = {
        email,
        password,
        nickname,
        agreeTerms,
        profileImgUrl,
      };

      signUp(signUpPayload, {
        onSuccess: (signUpRes) => {
          const userId = signUpRes?.result?.userId;
          if (!userId) {
            alert('회원가입에 실패하였습니다.');
            return;
          }

          login(
            { email, password },
            {
              onSuccess: (loginRes) => {
                localStorage.clear();
                const { accessToken, refreshToken } = loginRes.result;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('nickname', nickname);
                onNext();
              },
              onError: () => {
                alert(
                  '자동 로그인에 실패했습니다. 로그인 페이지로 이동해 주세요.',
                );
                onNext();
              },
            },
          );
        },
        onError: () => {
          alert('회원가입에 실패하였습니다.');
        },
      });
    };

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      uploadImage(formData, {
        onSuccess: (uploadRes) => {
          const profileImgUrl = uploadRes?.result;
          if (!profileImgUrl) {
            alert('프로필 이미지 업로드에 실패했습니다.');
            return;
          }
          proceedToSignUp(profileImgUrl);
        },
        onError: () => {
          alert('프로필 이미지 업로드에 실패하였습니다.');
        },
      });
    } else {
      proceedToSignUp();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={S.ProfileFormContainer}
        onSubmit={handleSubmit(onSubmit)}
        id="profileForm"
      >
        <ProfileImage
          preview={preview}
          fileInputRef={fileInputRef}
          onClick={handleImgClick}
          onChange={handleChange}
        />

        <div className={S.InputWrapper}>
          <SettingInput
            register={register('nickname')}
            error={errors.nickname}
            buttonText="중복확인"
            name="nickname"
            placeholder="닉네임 (2~10자)"
            onClickButton={handleCheckNickname}
            buttonDisabled={!nicknameValue || nicknameValue.trim().length < 2}
            loading={isFetching}
            loadingText="확인 중..."
          />
        </div>
      </form>

      <div className={`${S.BottomContainer} !mt-[25.3rem]`}>
        <button
          className={S.NextButton(isValid && isNicknameOk === true)}
          type="submit"
          disabled={!isValid || isNicknameOk !== true}
          form="profileForm"
        >
          다음
        </button>
      </div>
    </FormProvider>
  );
};

export default ProfileForm;
