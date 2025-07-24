import * as S from '../../../../styles/auth/signup/signup.style';
import ProfileForm from './profileForm';

interface ProfileProps {
  onNext: () => void;
}

const Profile = ({ onNext }: ProfileProps) => {
  return (
    <div className={`${S.AgreeContainer} pageContainer`}>
      <p className={`${S.AgreeP} !mt-[11.2rem] !w-full !text-center`}>
        닉네임을 설정해주세요.
      </p>

      <ProfileForm onNext={onNext} />
    </div>
  );
};

export default Profile;
