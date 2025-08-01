import * as S from '../../../styles/home/routine.style';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrow from '../../../assets/images/home/rightArrow.png';
import dateDot from '../../../assets/images/home/routine/dateDot.png';
import type { UserRoutineDetail } from '../../../types/home/routine';

interface Props {
  item: UserRoutineDetail;
}

function formatDateWithDots(date: string) {
  const [year, month, day] = date.split('-');
  return (
    <>
      {year}
      <img src={dateDot} alt="dot" className={S.DateDot} />
      {month}
      <img src={dateDot} alt="dot" className={S.DateDot} />
      {day}
    </>
  );
}

export default function RoutineCard({ item }: Props) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/routine/${item.routineId}`);
  }, [item.routineId, navigate]);

  const isNew = item.new;

  return (
    <div className={S.Card} onClick={handleClick}>
      <div className={S.Left}>
        <img src={item.routineImgUrl} alt="thumbnail" className={S.Thumbnail} />
      </div>

      <div className={S.Content(isNew)}>
        <div className={S.TopWrapper}>
          <div className={S.DateRow(isNew)}>
            {isNew ? (
              <div className={S.NewBadge}>NEW</div>
            ) : (
              <div className={S.Date}>
                {formatDateWithDots(item.createDate)}
              </div>
            )}
          </div>

          <div className={S.Title}>
            {item.routineName}
            <img src={rightArrow} alt="navigate" className={S.RightArrowImg} />
          </div>

          <div className={S.HashtagList}>
            {item.hashtags.map((hashtag) => (
              <span key={hashtag} className={S.Hashtag}>
                {hashtag}
              </span>
            ))}
          </div>
        </div>

        <div className={S.Author}>
          <img
            src={item.profileImgUrl}
            alt="profile"
            className={S.ProfileImg}
          />
          <div className={S.AuthorName}>{item.nickname}</div>
        </div>
      </div>
    </div>
  );
}
