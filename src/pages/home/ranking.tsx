import * as S from '../../styles/home/ranking.style';
import medal1 from '../../assets/images/home/medal1.png';
import medal2 from '../../assets/images/home/medal2.png';
import medal3 from '../../assets/images/home/medal3.png';
import ranking1 from '../../assets/images/home/ranking1.png';
import ranking2 from '../../assets/images/home/ranking2.png';
import ranking3 from '../../assets/images/home/ranking3.png';
import MyRankInfo from '../../components/home/ranking/myRank';
import TopUserInfo from '../../components/home/ranking/topUser';
import OtherUserInfo from '../../components/home/ranking/otherUser';
import Header from '../../components/header/header';
import { useRanking } from '../../hooks/home/ranking/useRanking';
import { getRankChangeIcon } from '../../utils/home/getRankChangeIcon';

const Ranking = () => {
  const { data, isLoading, error } = useRanking();

  if (isLoading) return <div></div>;
  if (error || !data?.result) return <div></div>;

  const { top10Users, myRank } = data.result;

  const top3 = top10Users.slice(0, 3);
  const others = top10Users.slice(3);

  const displayOrder = [1, 0, 2];
  const medalImages = [medal1, medal2, medal3];
  const podiumImages = [ranking2, ranking1, ranking3];

  return (
    <div
      className={`pageContainer ${S.Container} !pt-[11rem] !overflow-y-auto`}
    >
      <Header
        title="똑똑 소비 왕 랭킹"
        bgColor="bg-[#e0fadd] backdrop-blur-sm"
      />

      <MyRankInfo user={myRank} />

      <div className={S.Top3Wrapper}>
        {displayOrder.map((orderIdx, i) => (
          <TopUserInfo
            key={top3[orderIdx].nickname}
            user={top3[orderIdx]}
            medal={medalImages[orderIdx]}
            podium={podiumImages[i]}
          />
        ))}
      </div>

      <div className={S.OtherListWrapper}>
        <div className={S.OtherListBox}>
          {others.map((user, idx) => {
            const rankNow = idx + 4;
            const icon = getRankChangeIcon(
              user.rankChangeStatus as 'UP' | 'DOWN' | 'SAME',
            );
            return (
              <OtherUserInfo
                key={user.nickname}
                user={user}
                rank={rankNow}
                icon={icon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
