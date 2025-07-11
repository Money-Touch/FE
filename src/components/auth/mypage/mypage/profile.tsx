import * as M from '../../../../styles/auth/mypage/mypage.style';
import ProfileImage from '../../../../assets/images/auth/mypage/profileImg.png';
import NotBadgeImage from '../../../../assets/images/auth/mypage/notBadge.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleMybadgeClick = () => {
    navigate('/mypage/badge');
  };
  return (
    <M.ProfileContainer>
      <M.ProfileLeftContainer>
        <M.ProfileImg src={ProfileImage} alt="profile" />
        <M.ProfileEditButton>프로필 편집</M.ProfileEditButton>
      </M.ProfileLeftContainer>

      <M.ProfileRightContaienr>
        <M.ProfileP>라인</M.ProfileP>
        <M.BadgeImg
          src={NotBadgeImage}
          alt="notBadge"
          onClick={handleMybadgeClick}
        />
      </M.ProfileRightContaienr>
    </M.ProfileContainer>
  );
};

export default Profile;
