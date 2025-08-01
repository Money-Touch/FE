import * as S from '../../../styles/home/ranking.style';
import profile_t from '../../../assets/images/home/profile_t.png';
import type { UserRanking } from '../../../types/home/ranking';

interface MyRankProps {
  user: UserRanking;
}

function MyRank({ user }: MyRankProps) {
  return (
    <div className={S.MyRankBox}>
      <div className={S.RankBox}>
        <img
          src={user.profileImage || profile_t}
          alt="profile"
          className={S.ProfileImg}
        />
        <div className={S.ProfileDes}>
          {user.name}님의 순위는 {user.currentRank}위({user.wiseCount}회)
          입니다.
        </div>
      </div>
    </div>
  );
}

export default MyRank;
