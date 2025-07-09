import React from 'react';
import {
  PostCard,
  PostHeader,
  ProfileImage,
  AuthorInfo,
  AuthorName,
  PostImageContainer,
  PostImage,
  PostActions,
  LikeButton,
  DislikeButton,
  DefaultProfile,
  DefaultPostImage,
} from '../../styles/feed/feed';
import LikeIcon from '../../assets/images/feed/Like.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';

export interface Author {
  name: string;
  profileImage?: string;
}

export interface Post {
  id: number;
  author: Author;
  content?: string;
  image?: string;
  likes: number;
  dislikes: number;
  timestamp: Date;
}

interface PostItemProps {
  post: Post;
  onLike: (postId: number) => void;
  onDislike: (postId: number) => void;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  onLike,
  onDislike,
}) => {
  return (
    <PostCard>
      <PostHeader>
        {post.author.profileImage ? (
          <ProfileImage src={post.author.profileImage} alt={post.author.name} />
        ) : (
          <DefaultProfile />
        )}

        <AuthorInfo>
          <AuthorName>{post.author.name}</AuthorName>
        </AuthorInfo>
      </PostHeader>

      <PostImageContainer>
        {post.image ? (
          <PostImage src={post.image} alt="게시물 이미지" />
        ) : (
          <DefaultPostImage />
        )}
      </PostImageContainer>

      <PostActions>
        <LikeButton onClick={() => onLike(post.id)}>
          <img src={LikeIcon} alt="좋아요" width={20} height={20} />
          <span>{post.likes}</span>
        </LikeButton>
        <DislikeButton onClick={() => onDislike(post.id)}>
          <img src={DislikeIcon} alt="싫어요" width={20} height={20} />
          <span>{post.dislikes}</span>
        </DislikeButton>
      </PostActions>
    </PostCard>
  );
};
