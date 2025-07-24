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
    <div className={M.ProfileContainer}>
      <div className={M.ProfileLeftContainer}>
        <img className={M.ProfileImg} src={ProfileImage} alt="profile" />
        <button className={M.ProfileEditButton}>프로필 편집</button>
      </div>

      <div className={M.ProfileRightContaienr}>
        <p className={M.ProfileP}>라인</p>
        <img
          className={M.BadgeImg}
          src={NotBadgeImage}
          alt="notBadge"
          onClick={handleMybadgeClick}
        />
      </div>
    </div>
  );
};

export default Profile;
