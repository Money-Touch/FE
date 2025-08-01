import * as S from '../../../styles/home/ranking.style';
import profile_t from '../../../assets/images/home/profile_t.png';
import type { UserRanking } from '../../../types/home/ranking';

interface TopUserCardProps {
  user: UserRanking;
  medal: string;
  podium: string;
}

function TopUser({ user, medal, podium }: TopUserCardProps) {
  return (
    <div className={S.TopUser}>
      <div className={S.ProfileWrapper}>
        <img src={medal} alt="medal" className={S.Medal} />
        <img
          src={user.profileImage || profile_t}
          alt="profile"
          className={S.Profile}
        />
      </div>

      <div className={S.InfoWrapper}>
        <div className={S.UserName}>{user.name}</div>
        <div className={S.Count}>{user.wiseCount}회</div>
      </div>

      <img src={podium} alt="podium" className={S.Podium} />
    </div>
  );
}

export default TopUser;
