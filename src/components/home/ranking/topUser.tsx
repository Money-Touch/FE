import * as S from "../../../styles/home/ranking.style";
import profile_t from "../../../assets/images/home/profile_t.png";
import type { UserRanking } from "../../../types/home/ranking";

interface TopUserCardProps {
  user: UserRanking;
  medal: string;
  podium: string;
}

function TopUser({ user, medal, podium }: TopUserCardProps) {
  return (
    <S.TopUser>
      <S.ProfileWrapper>
        <S.Medal src={medal} alt="medal" />
        <S.Profile src={user.profileImage || profile_t} />
      </S.ProfileWrapper>

      <S.InfoWrapper>
        <S.UserName>{user.name}</S.UserName>
        <S.Count>{user.wiseCount}회</S.Count>
      </S.InfoWrapper>

      <S.Podium src={podium} alt="podium" />
    </S.TopUser>
  );
}

export default TopUser;
