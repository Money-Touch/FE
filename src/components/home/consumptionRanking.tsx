import * as S from '../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import { mockRankingData } from '../../mocks/ranking/mockRankingData'; // mock data
import { getRankChangeIcon } from '../../utils/home/getRankChangeIcon';
import more from '../../assets/images/home/more.png';
import medal1 from '../../assets/images/home/medal1.png';
import medal2 from '../../assets/images/home/medal2.png';
import medal3 from '../../assets/images/home/medal3.png';
import profile_t from '../../assets/images/home/profile_t.png';

function ConsumptionRanking() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/ranking');
  };

  const medalImages = [medal1, medal2, medal3];
  const top3 = mockRankingData.slice(0, 3);

  return (
    <S.RankingContainer>
      <S.SectionHeader>
        <S.SectionTitle>똑똑 소비 왕 랭킹</S.SectionTitle>
        <S.MoreIcon src={more} alt="more" onClick={handleMoreClick} />
      </S.SectionHeader>

      <S.RankingSection>
        {top3.map((user, index) => (
          <S.RankingList key={user.id}>
            <S.Medal src={medalImages[index]} alt={`${index + 1}등`} />
            <S.ProfileAndName>
              <S.Profile
                src={user.profileImage || profile_t}
                alt="userProfile"
              />
              <S.UserName>{user.name}</S.UserName>
            </S.ProfileAndName>
            <S.WiseCount>{user.wiseCount}회</S.WiseCount>
            <S.RankChangeIcon
              src={getRankChangeIcon(index + 1, user.previousRank)}
              alt="rankingChange"
            />
          </S.RankingList>
        ))}
      </S.RankingSection>
    </S.RankingContainer>
  );
}

export default ConsumptionRanking;
