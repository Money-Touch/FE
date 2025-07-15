import React from 'react';
import * as S from '../../styles/feed/feedDetail.style';
import LikeIcon from '../../assets/images/feed/Like.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';
import CommentIcon from '../../assets/images/feed/Bubble.png';
import BackIcon from '../../assets/images/feed/Back.png';
import { useNavigate } from 'react-router-dom';
import PersonIcon from "../../assets/images/feed/Person.png";

export const FeedDetail: React.FC = () => {
  const navigate = useNavigate();

  const post = {
    id: 1,
    author: {
      name: '라인',
      profileImage: '',
    },
    category: '배달/외식',
    image: '',
    timestamp: new Date().toISOString(),
    likes: 1,
    dislikes: 10,
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = () => {
  };

  const handleDislike = () => {
  };

  const handleComment = () => {
  };

  const date = new Date(post.timestamp);
  const formattedTime = `${date.toLocaleDateString()} · ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack}><img src={BackIcon}/></S.BackButton>
        <S.CategoryTitle>{post.category}</S.CategoryTitle>
      </S.Header>

      <S.ContentContainer>
        <S.AuthorSection>
          {post.author.profileImage ? (
            <S.ProfileImage src={post.author.profileImage} />
          ) : (
            <S.ProfileImage src={PersonIcon} />
          )}
          <S.AuthorInfo>
            <S.AuthorName>{post.author.name}</S.AuthorName>
            <S.Timestamp>{formattedTime}</S.Timestamp>
          </S.AuthorInfo>
        </S.AuthorSection>

        <S.PostImage src={post.image || ''} alt="본문 이미지" hasImage={!!post.image} />
        {/*{post.image && <S.PostImage src={post.image} alt="본문 이미지" />}*/}

        <S.ActionButtons>
          <S.ActionButton onClick={handleLike}>
            <img src={LikeIcon} alt="좋아요" />
          </S.ActionButton>
          <S.ActionButton onClick={handleDislike}>
            <img src={DislikeIcon} alt="싫어요" />
          </S.ActionButton>
          <S.ActionButton onClick={handleComment}>
            <img src={CommentIcon} alt="댓글" />
          </S.ActionButton>
        </S.ActionButtons>
      </S.ContentContainer>
    </S.Container>
  );
};

export default FeedDetail;