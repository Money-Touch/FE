import * as S from '../../../../styles/auth/signup/signup.style';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../../../../schemas/auth/signup/profileSchema';
import { z } from 'zod';
import { useProfileNicknameQuery } from '../../../../hooks/auth/signup/useProfileNicknameQuery';
import { useProfileImage } from '../../../../hooks/auth/signup/useProfileImage';
import ProfileImage from './profileImage';
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
  const { mutate } = useProfileMutation();

  const onSubmit = (formDataInput: z.infer<typeof profileSchema>) => {
    const file = fileInputRef.current?.files?.[0];

    const payload: ProfileFormPayload = {
      nickname: formDataInput.nickname,
      profileImage: file,
    };

    localStorage.setItem('nickname', payload.nickname);

    if (!file) {
      onNext();
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        if (res?.result) {
          localStorage.setItem('profileImgUrl', res.result);
        }
        onNext();
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
