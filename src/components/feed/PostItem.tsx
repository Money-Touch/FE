import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="bg-[var(--color-white)] overflow-hidden pb-[1.6rem]">
      <div className="pb-[0.8rem] flex items-center gap-[1.2rem]">
        {post.author.profileImage ? (
          <img
            src={post.author.profileImage}
            alt={post.author.name}
            className="w-[3rem] h-[3rem] rounded-full object-cover"
          />
        ) : (
          <div className="w-[3rem] h-[3rem] rounded-full bg-[var(--color-G6)]" />
        )}
        <div className="flex flex-col">
          <h3 className="text-[1.4rem] text-[var(--color-G2)]">
            {post.author.name}
          </h3>
        </div>
      </div>

      <div
        onClick={handlePostClick}
        className="w-full relative pb-[100%] overflow-hidden rounded-[1rem] cursor-pointer"
      >
        {post.image ? (
          <img
            src={post.image}
            alt="게시물 이미지"
            className="absolute w-full h-full object-cover"
          />
        ) : (
          <div className="absolute w-full h-full bg-[var(--color-G6)] rounded-[1rem]" />
        )}
      </div>

      <div className="flex items-center gap-[1.6rem] pt-[0.5rem]">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center justify-center gap-[0.4rem] w-[5rem] h-[3.6rem] cursor-pointer"
        >
          <img src={liked ? LikeIconFill : LikeIcon} alt="좋아요" />
          <span className="w-[2rem] text-center text-[1.4rem] text-[var(--color-G1)]">
            {post.likes}
          </span>
        </button>
        <button
          onClick={() => onDislike(post.id)}
          className="flex items-center justify-center gap-[0.4rem] w-[5rem] h-[3.6rem] cursor-pointer"
        >
          <img src={disliked ? DislikeIconFill : DislikeIcon} alt="싫어요" />
          <span className="w-[2rem] text-center text-[1.4rem] text-[var(--color-G1)]">
            {post.dislikes}
          </span>
        </button>
      </div>
    </div>
  );
};
