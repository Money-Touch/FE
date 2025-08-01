import * as M from '../../../../styles/auth/mypage/mypage.style';
import ProfileImage from '../../../../assets/images/auth/mypage/profileImg.png';
import NotBadgeImage from '../../../../assets/images/auth/mypage/notBadge.png';
import { useNavigate } from 'react-router-dom';
import type { MypageResponse } from '../../../../types/auth/mypage/mypage';

interface ProfileProps {
  data: MypageResponse;
}

const Profile = ({ data }: ProfileProps) => {
  const navigate = useNavigate();

  const handleMybadgeClick = () => {
    navigate('/mypage/badge');
  };

  const profileImg = data?.result?.profileImgUrl?.trim()
    ? data.result.profileImgUrl
    : ProfileImage;

  const badgeImg = data?.result?.representativeBadgeImageUrl?.trim()
    ? data.result.representativeBadgeImageUrl
    : NotBadgeImage;

  return (
    <div className={M.ProfileContainer}>
      <div className={M.ProfileLeftContainer}>
        <img className={M.ProfileImg} src={profileImg} alt="profile" />
        <button className={M.ProfileEditButton}>프로필 편집</button>
      </div>

      <div className={M.ProfileRightContaienr}>
        <p className={M.ProfileP}>{data?.result?.nickname}</p>
        <img
          className={M.BadgeImg}
          src={badgeImg}
          alt="notBadge"
          onClick={handleMybadgeClick}
        />
      </div>
    </div>
  );
};

export default Profile;
