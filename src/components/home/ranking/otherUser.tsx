import * as S from "../../../styles/home/ranking.style";
import profile_t from "../../../assets/images/home/profile_t.png";
import type { UserRanking } from "../../../types/home/ranking";

interface OtherUserRowProps {
  user: UserRanking;
  rank: number;
  icon: string;
}

function OtherUser({ user, rank, icon }: OtherUserRowProps) {
  return (
    <S.OtherUser>
      <S.RankNumber>{rank}</S.RankNumber>
      <S.RowProfile src={user.profileImage || profile_t} alt="profile" />
      <S.RowName>{user.name}</S.RowName>
      <S.RowRight>
        <S.RowCount>{user.wiseCount}회</S.RowCount>
        <S.RankChangeIcon src={icon} />
      </S.RowRight>
    </S.OtherUser>
  );
}

export default OtherUser;
