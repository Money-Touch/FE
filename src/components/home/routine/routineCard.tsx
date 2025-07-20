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
      <S.DateDot src={dateDot} alt="dot" />
      {month}
      <S.DateDot src={dateDot} alt="dot" />
      {day}
    </>
  );
}

export default function RoutineCard({ item }: Props) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/routine/${item.id}`);
  }, [item.id, navigate]);

  return (
    <S.Card onClick={handleClick}>
      <S.Left>
        <S.Thumbnail src={item.thumbnail} alt="routine thumbnail" />
      </S.Left>

      <S.Content $isNew={isToday(item.startDate)}>
        <S.TopWrapper>
          <S.DateRow $isNew={isToday(item.startDate)}>
            {isToday(item.startDate) ? (
              <S.NewBadge>NEW</S.NewBadge>
            ) : (
              <S.Date>{formatDateWithDots(item.startDate)}</S.Date>
            )}
          </S.DateRow>

          <S.Title>
            {item.title}
            <S.RightArrowImg src={rightArrow} alt="navigate" />
          </S.Title>

          <S.HashtagList>
            {item.hashtags.map((tag) => (
              <S.Hashtag key={tag}>{tag}</S.Hashtag>
            ))}
          </S.HashtagList>
        </S.TopWrapper>

        <S.Author>
          <S.ProfileImg src={item.authorProfileImg} alt="profile" />
          <S.AuthorName>{item.author}</S.AuthorName>
        </S.Author>
      </S.Content>
    </S.Card>
  );
}
