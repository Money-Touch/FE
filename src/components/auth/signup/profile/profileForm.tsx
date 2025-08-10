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

  const { data } = useProfileNicknameQuery(nicknameCheck, shouldCheck);
  useEffect(() => {
    if (data) {
      console.log('닉네임 중복확인 응답:', data);
    }
  }, [data]);

  const handleCheckNickname = () => {
    const nickname = methods.getValues('nickname');
    setNicknameCheck(nickname);
    setShouldCheck(true);
  };

  const methods = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });

  const { handleSubmit, formState, register } = methods;
  const { errors, isValid } = formState;

  const { preview, fileInputRef, handleImgClick, handleChange } =
    useProfileImage();
  const { mutate: signUp } = useSignUpMutation();
  const { mutate: login } = useLoginMutation();
  const { mutate: uploadImage } = useProfileMutation();

  // 폼 제출
  const onSubmit = (formDataInput: z.infer<typeof profileSchema>) => {
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

          console.log('회원가입 성공:', userId);

          login(
            { email, password },
            {
              onSuccess: (loginRes) => {
                localStorage.clear();
                const { accessToken, refreshToken } = loginRes.result;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                console.log('로그인 성공');
                onNext();
              },
              onError: (err) => {
                console.error('로그인 실패:', err);
                alert(
                  '자동 로그인에 실패했습니다. 로그인 페이지로 이동해 주세요.',
                );
                onNext();
              },
            },
          );
        },
        onError: (err) => {
          console.error('회원가입 실패:', err);
          alert('회원가입에 실패하였습니다.');
        },
      });
    };

    // 이미지 있을 시
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

          console.log('이미지 업로드 성공:', profileImgUrl);
          proceedToSignUp(profileImgUrl);
        },
        onError: (err) => {
          console.error('이미지 업로드 실패:', err);
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
          />
        </div>
      </form>

      <div className={`${S.BottomContainer} !mt-[25.3rem]`}>
        <button
          className={S.NextButton(isValid)}
          type="submit"
          disabled={!isValid}
          form="profileForm"
        >
          다음
        </button>
      </div>
    </FormProvider>
  );
};

export default ProfileForm;
