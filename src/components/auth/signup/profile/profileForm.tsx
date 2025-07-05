import * as S from "../../../../styles/auth/signup/signup";
import ProfileInput from "./profileInput";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../../../schemas/auth/signup/profileSchema";
import { z } from "zod";
import { useProfileImage } from "../../../../hooks/auth/signup/useProfileImage";
import ProfileImage from "./profileImage";
import { useProfileMutation } from "../../../../hooks/auth/signup/useProfileMutation";
import type { ProfileFormPayload } from "../../../../types/auth/signup/profile";

interface ProfileFormProps {
    onNext: () => void;
}

const ProfileForm = ({ onNext }: ProfileFormProps) => {
    const methods = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
    });

    const { handleSubmit, formState } = methods;
    const { isValid } = formState;

    const { preview, fileInputRef, handleImgClick, handleChange } = useProfileImage();
    const { mutate } = useProfileMutation();

    const onSubmit = (data: z.infer<typeof profileSchema>) => {
        const file = fileInputRef.current?.files?.[0];

        const payload: ProfileFormPayload = {
            nickname: data.nickname,
            profileImage: file,
        };

        const formData = new FormData();
        formData.append("nickname", payload.nickname);

        if (payload.profileImage) {
            formData.append("profileImage", payload.profileImage);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        mutate(formData, {
            onSuccess: () => {
                onNext();
            },
        });
    };

    return (
        <FormProvider {...methods}>
            <S.ProfileFormContainer onSubmit={handleSubmit(onSubmit)} id="profileForm">
                <ProfileImage
                    preview={preview}
                    fileInputRef={fileInputRef}
                    onClick={handleImgClick}
                    onChange={handleChange}
                />
                <ProfileInput />
            </S.ProfileFormContainer>

            <S.BottomContainer style={{ marginTop: "27.1rem" }}>
                <S.NextButton type="submit" active={isValid} disabled={!isValid} form="profileForm">다음</S.NextButton>
            </S.BottomContainer>
        </FormProvider>
    );
};

export default ProfileForm;
