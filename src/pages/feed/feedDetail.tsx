import React, { useState } from 'react';
import * as S from '../../styles/feed/feedDetail.style';
import LikeIcon from '../../assets/images/feed/Like.png';
import LikeActiveIcon from '../../assets/images/feed/Like_Fill.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';
import DislikeActiveIcon from '../../assets/images/feed/Dislike_Fill.png';
import CommentIcon from '../../assets/images/feed/Bubble.png';
import PersonIcon from '../../assets/images/feed/Person.png';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header'
import { handleLike, handleDislike } from '../../utils/feed/reaction';
import type { Post, PostStates } from '../../types/feed/feed';

export const FeedDetail: React.FC = () => {
  const navigate = useNavigate();

  const [post] = useState<Post>({
    id: 1,
    author: {
      name: '라인',
      profileImage: '',
    },
    category: '배달/외식',
    image: '',
    timestamp: new Date(),
    likes: 1,
    dislikes: 10,
    comments: 3,
  });

  const [posts, setPosts] = useState<Post[]>([post]);
  const [postStates, setPostStates] = useState<PostStates>({});

  const handleBack = () => {
    navigate(-1);
  };

  const handleComment = () => {
    // 댓글 관련 로직
  };

  const date = new Date(post.timestamp);
  const formattedTime = `${date.toLocaleDateString()} · ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const updatedPost = posts.find((p) => p.id === post.id) ?? post;
  const { liked, disliked } = postStates[post.id] || { liked: false, disliked: false };

  return (
    <S.Container>
      <Header title={updatedPost.category} onBack={handleBack} />

      <S.ContentContainer>
        <S.AuthorSection>
          {updatedPost.author.profileImage ? (
            <S.ProfileImage src={updatedPost.author.profileImage} />
          ) : (
            <S.ProfileImage src={PersonIcon} />
          )}
          <S.AuthorInfo>
            <S.AuthorName>{updatedPost.author.name}</S.AuthorName>
            <S.Timestamp>{formattedTime}</S.Timestamp>
          </S.AuthorInfo>
        </S.AuthorSection>

        <S.PostImage
          src={updatedPost.image || ''}
          alt="본문 이미지"
          hasImage={!!updatedPost.image}
        />

        <S.ActionButtons>
          <S.ActionButton
            onClick={() =>
              handleLike(updatedPost.id, posts, postStates, setPosts, setPostStates)
            }
          >
            <img src={liked ? LikeActiveIcon : LikeIcon} alt="좋아요" />
            <S.ActionCount>{updatedPost.likes}</S.ActionCount>
          </S.ActionButton>

          <S.ActionButton
            onClick={() =>
              handleDislike(updatedPost.id, posts, postStates, setPosts, setPostStates)
            }
          >
            <img src={disliked ? DislikeActiveIcon : DislikeIcon} alt="싫어요" />
            <S.ActionCount>{updatedPost.dislikes}</S.ActionCount>
          </S.ActionButton>

          <S.ActionButton onClick={handleComment}>
            <img src={CommentIcon} alt="댓글" />
            <S.ActionCount>{updatedPost.comments}</S.ActionCount>
          </S.ActionButton>
        </S.ActionButtons>
      </S.ContentContainer>
    </S.Container>
  );
};

export default FeedDetail;
