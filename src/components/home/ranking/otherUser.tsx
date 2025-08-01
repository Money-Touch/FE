import * as S from '../../../styles/home/ranking.style';
import profile_t from '../../../assets/images/home/profile_t.png';
import type { UserRanking } from '../../../types/home/ranking';

interface OtherUserRowProps {
  user: UserRanking;
  rank: number;
  icon: string;
}

function OtherUser({ user, rank, icon }: OtherUserRowProps) {
  return (
    <div className={S.OtherUser}>
      <div className={S.RankNumber}>{rank}</div>
      <img
        src={user.profileImage || profile_t}
        alt="profile"
        className={S.RowProfile}
      />
      <div className={S.RowName}>{user.name}</div>
      <div className={S.RowRight}>
        <div className={S.RowCount}>{user.wiseCount}회</div>
        <img src={icon} className={S.RankChangeIcon} />
      </div>
    </div>
  );
}

export default OtherUser;
