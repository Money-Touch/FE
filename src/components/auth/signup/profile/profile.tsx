import * as S from "../../../../styles/auth/signup/signup";
import ProfileForm from "./profileForm";

interface ProfileProps {
  onNext: () => void;
}

const Profile = ({ onNext }: ProfileProps) => {
    return (
        <S.AgreeContainer className="pageContainer">
            <S.AgreeP style={{ marginTop: "11.2rem", width: "100%", textAlign: "center"}}>닉네임을 설정해주세요.</S.AgreeP>

            <ProfileForm onNext={onNext} />
        </S.AgreeContainer>
    )
}

export default Profile;