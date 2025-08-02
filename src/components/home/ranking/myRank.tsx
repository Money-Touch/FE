import * as S from '../../../styles/home/ranking.style';
import profile_t from '../../../assets/images/home/profile_t.png';
import type { MyRank } from '../../../types/home/ranking';

interface MyRankProps {
  user: MyRank;
}

function MyRankInfo({ user }: MyRankProps) {
  return (
    <div className={S.MyRankBox}>
      <div className={S.RankBox}>
        <img
          src={user.profileImgUrl || profile_t}
          alt="profile"
          className={S.ProfileImg}
        />
        <div className={S.ProfileDes}>
          {user.nickname}님의 순위는 {user.ranking}위({user.totalWiseCount}회)
          입니다.
        </div>
      </div>
    </div>
  );
}

export default MyRankInfo;
