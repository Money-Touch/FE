import * as S from '../../../styles/home/routine.style';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrow from '../../../assets/images/home/rightArrow.png';
import dateDot from '../../../assets/images/home/routine/dateDot.png';
import { isToday } from '../../../utils/home/todayCheck';
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
    navigate(`/routine/${item.id}`);
  }, [item.id, navigate]);

  const isNew = isToday(item.startDate);

  return (
    <div className={S.Card} onClick={handleClick}>
      <div className={S.Left}>
        <img
          src={item.thumbnail}
          alt="routine thumbnail"
          className={S.Thumbnail}
        />
      </div>

      <div className={S.Content(isNew)}>
        <div className={S.TopWrapper}>
          <div className={S.DateRow(isNew)}>
            {isNew ? (
              <div className={S.NewBadge}>NEW</div>
            ) : (
              <div className={S.Date}>{formatDateWithDots(item.startDate)}</div>
            )}
          </div>

          <div className={S.Title}>
            {item.title}
            <img src={rightArrow} alt="navigate" className={S.RightArrowImg} />
          </div>

          <div className={S.HashtagList}>
            {item.hashtags.map((tag) => (
              <span key={tag} className={S.Hashtag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={S.Author}>
          <img
            src={item.authorProfileImg}
            alt="profile"
            className={S.ProfileImg}
          />
          <div className={S.AuthorName}>{item.author}</div>
        </div>
      </div>
    </div>
  );
}
