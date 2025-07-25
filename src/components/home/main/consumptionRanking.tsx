import * as S from '../../../styles/home/home.style';
import { useNavigate } from 'react-router-dom';
import more from '../../../assets/images/home/more.png';
import medal1 from '../../../assets/images/home/medal1.png';
import medal2 from '../../../assets/images/home/medal2.png';
import medal3 from '../../../assets/images/home/medal3.png';
import profile_t from '../../../assets/images/home/profile_t.png';
import { getRankChangeIcon } from '../../../utils/home/getRankChangeIcon';
import { mockRankingData } from '../../../mocks/home/mockRankingData'; // mock data

function ConsumptionRanking() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/ranking');
  };

  const medalImages = [medal1, medal2, medal3];
  const top3 = mockRankingData.slice(0, 3);

  return (
    <div className={S.RankingContainer}>
      <div className={S.SectionHeader}>
        <h2 className={S.SectionTitle}>똑똑 소비 왕 랭킹</h2>
        <img
          src={more}
          alt="more"
          onClick={handleMoreClick}
          className={S.MoreIcon + ' cursor-pointer'}
        />
      </div>

      <div className={S.RankingSection}>
        {top3.map((user, index) => (
          <div key={user.id} className={S.RankingList}>
            <img
              src={medalImages[index]}
              alt={`${index + 1}등`}
              className={S.Medal}
            />
            <div className={S.ProfileAndName}>
              <img
                src={user.profileImage || profile_t}
                alt="userProfile"
                className={S.Profile}
              />
              <div className={S.UserName}>{user.name}</div>
            </div>
            <div className={S.WiseCount}>{user.wiseCount}회</div>
            <img
              src={getRankChangeIcon(index + 1, user.previousRank)}
              alt="rankingChange"
              className={S.RankChangeIcon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConsumptionRanking;
