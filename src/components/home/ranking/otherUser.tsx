import * as S from '../../../styles/home/ranking.style';
import profile_t from '../../../assets/images/home/profile_t.png';
import type { TopUser } from '../../../types/home/ranking';

interface OtherUserRowProps {
  user: TopUser;
  rank: number;
  icon: string;
}

function OtherUserInfo({ user, rank, icon }: OtherUserRowProps) {
  return (
    <div className={S.OtherUser}>
      <div className={S.RankNumber}>{rank}</div>
      <img
        src={user.profileImgUrl || profile_t}
        alt="profile"
        className={S.RowProfile}
      />
      <div className={S.RowName}>{user.nickname}</div>
      <div className={S.RowRight}>
        <div className={S.RowCount}>{user.wiseCount}회</div>
        <img src={icon} className={S.RankChangeIcon} />
      </div>
    </div>
  );
}

export default OtherUserInfo;
