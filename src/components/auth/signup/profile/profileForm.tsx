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
import type { ProfileFormPayload } from '../../../../types/auth/signup/profile';
import SettingInput from '../setting/settingInput';

interface ProfileFormProps {
  onNext: () => void;
}

const ProfileForm = ({ onNext }: ProfileFormProps) => {
  const [nicknameCheck, setNicknameCheck] = useState('');
  const [shouldCheck, setShoulCheck] = useState(false);

  const { data } = useProfileNicknameQuery(nicknameCheck, shouldCheck);
  useEffect(() => {
    if (data) {
      console.log('닉네임 중복확인 응답:', data);
    }
  }, [data]);

  const handleCheckNickname = () => {
    const nickname = methods.getValues('nickname');
    setNicknameCheck(nickname);
    setShoulCheck(true);
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
  const { mutate: uploadImage } = useProfileMutation();

  // 폼 제출
  const onSubmit = (formDataInput: z.infer<typeof profileSchema>) => {
    const file = fileInputRef.current?.files?.[0];
    const payload: ProfileFormPayload = { profileImage: file };

    const email = localStorage.getItem('email') || '';
    const password = localStorage.getItem('password') || '';
    const agreeTerms = JSON.parse(localStorage.getItem('agreeTerms') || '[]');
    const nickname = formDataInput.nickname;

    const signUpPayload = {
      email,
      password,
      agreeTerms,
      nickname,
    };

    signUp(signUpPayload, {
      onSuccess: (res) => {
        const userId = res?.result?.userId;
        if (!userId) {
          alert('회원가입에 실패하였습니다.');
          return;
        }

        localStorage.clear();
        localStorage.setItem('userId', String(userId));
        localStorage.setItem('nickname', nickname);

        if (!file) {
          onNext();
          return;
        }

        const formData = new FormData();
        formData.append('file', payload.profileImage!);

        uploadImage(formData, {
          onSuccess: (uploadRes) => {
            const uploadedUrl = uploadRes?.result;
            if (uploadedUrl) {
              localStorage.setItem('profileImageUrl', uploadedUrl);
            }
            console.log('이미지 업로드 성공');
            onNext();
          },
          onError: (err) => {
            console.error('이미지 업로드 실패:', err);
            alert('프로필 사진 등록에 실패하였습니다.');
            onNext();
          },
        });
      },
      onError: (err) => {
        console.error('회원가입 실패:', err);
        alert('회원가입에 실패하였습니다.');
      },
    });
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
