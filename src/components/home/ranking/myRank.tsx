import * as S from "../../../styles/home/ranking.style";
import profile_t from "../../../assets/images/home/profile_t.png";
import type { UserRanking } from "../../../types/home/ranking";

interface MyRankProps {
  user: UserRanking;
}

function MyRank({ user }: MyRankProps) {
  return (
    <S.MyRankBox>
      <S.RankBox>
        <S.ProfileImg src={user.profileImage || profile_t} alt="profile" />
        <S.ProfileDes>
          {user.name}님의 순위는{" "}
          <strong>
            {user.currentRank}위({user.wiseCount}회)
          </strong>{" "}
          입니다.
        </S.ProfileDes>
      </S.RankBox>
    </S.MyRankBox>
  );
}

export default MyRank;
