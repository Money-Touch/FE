import * as S from '../../styles/home/ranking.style';
import { mockUser } from '../../mocks/home/mockUser'; // mock data
import { mockRankingData } from '../../mocks/home/mockRankingData'; // mock data
import { getRankChangeIcon } from '../../utils/home/getRankChangeIcon';

import medal1 from '../../assets/images/home/medal1.png';
import medal2 from '../../assets/images/home/medal2.png';
import medal3 from '../../assets/images/home/medal3.png';
import ranking1 from '../../assets/images/home/ranking1.png';
import ranking2 from '../../assets/images/home/ranking2.png';
import ranking3 from '../../assets/images/home/ranking3.png';

import MyRank from '../../components/home/ranking/myRank';
import TopUser from '../../components/home/ranking/topUser';
import OtherUser from '../../components/home/ranking/otherUser';
import Header from '../../components/header/header';

const Ranking = () => {
  const top3 = mockRankingData.slice(0, 3);
  const others = mockRankingData.slice(3, 10);
  const myInfo = mockRankingData.find((user) => user.id === mockUser.id);

  const displayOrder = [1, 0, 2];
  const medalImages = [medal1, medal2, medal3];
  const podiumImages = [ranking2, ranking1, ranking3];

  return (
    <S.Container className="pageContainer">
      <Header title="똑똑 소비 왕 랭킹" />

      {myInfo && <MyRank user={myInfo} />}

      <S.Top3Wrapper>
        {displayOrder.map((orderIdx, i) => (
          <TopUser
            key={top3[orderIdx].id}
            user={top3[orderIdx]}
            medal={medalImages[orderIdx]}
            podium={podiumImages[i]}
          />
        ))}
      </S.Top3Wrapper>

      <S.OtherListWrapper>
        <S.OtherListBox>
          {others.map((user, idx) => {
            const rankNow = idx + 4;
            const icon = getRankChangeIcon(user.currentRank, user.previousRank);
            return (
              <OtherUser key={user.id} user={user} rank={rankNow} icon={icon} />
            );
          })}
        </S.OtherListBox>
      </S.OtherListWrapper>
    </S.Container>
  );
};

export default Ranking;
