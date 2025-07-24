import * as S from '../../../../styles/auth/signup/signup.style';

interface Props {
  preview?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ preview, fileInputRef, onClick, onChange }: Props) => {
  return (
    <>
      <img className={S.Img} src={preview} alt="profile" onClick={onClick} />
      <input
        className={S.HiddenInput}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onChange}
      />
    </>
  );
};

export default ProfileImage;
