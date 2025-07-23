import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/feed/feed.style';
import LikeIcon from '../../assets/images/feed/Like.png';
import LikeIconFill from '../../assets/images/feed/Like_Fill.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';
import DislikeIconFill from '../../assets/images/feed/Dislike_Fill.png';

import type { Post } from '../../types/feed/feed';

interface PostItemProps {
  post: Post;
  onLike: (postId: number) => void;
  onDislike: (postId: number) => void;
  liked?: boolean;
  disliked?: boolean;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  onLike,
  onDislike,
  liked = false,
  disliked = false,
}) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/feed/post/${post.id}`);
  };

  return (
    <S.PostCard>
      <S.PostHeader>
        {post.author.profileImage ? (
          <S.ProfileImage src={post.author.profileImage} alt={post.author.name} />
        ) : (
          <S.DefaultProfile />
        )}
        <S.AuthorInfo>
          <S.AuthorName>{post.author.name}</S.AuthorName>
        </S.AuthorInfo>
      </S.PostHeader>

      <S.PostImageContainer onClick={handlePostClick}>
        {post.image ? (
          <S.PostImage src={post.image} alt="게시물 이미지" />
        ) : (
          <S.DefaultPostImage />
        )}
      </S.PostImageContainer>

      <S.PostActions>
        <S.LikeButton onClick={() => onLike(post.id)}>
          <img src={liked ? LikeIconFill : LikeIcon} alt="좋아요" />
          <S.LikeCount>{post.likes}</S.LikeCount>
        </S.LikeButton>
        <S.DislikeButton onClick={() => onDislike(post.id)}>
          <img src={disliked ? DislikeIconFill : DislikeIcon} alt="싫어요" />
          <S.DislikeCount>{post.dislikes}</S.DislikeCount>
        </S.DislikeButton>
      </S.PostActions>
    </S.PostCard>
  );
};

