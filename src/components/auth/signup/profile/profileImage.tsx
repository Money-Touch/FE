import * as S from '../../../../styles/auth/signup/signup';

interface Props {
  preview?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ preview, fileInputRef, onClick, onChange }: Props) => {
  return (
    <>
      <S.Img src={preview} alt="profile" onClick={onClick} />
      <S.HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onChange}
      />
    </>
  );
};

export default ProfileImage;
