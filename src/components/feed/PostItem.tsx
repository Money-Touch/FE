import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import LikeIcon from '../../assets/images/feed/Like.png';
import LikeIconFill from '../../assets/images/feed/Like_Fill.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';
import DislikeIconFill from '../../assets/images/feed/Dislike_Fill.png';

import type { FeedPost } from '../../types/feed/feed';

interface PostItemProps {
  post: FeedPost;
  onLike?: (postId: number) => void;
  onDislike?: (postId: number) => void;
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

  const handleNavigate = useCallback(() => {
    navigate(`/feed/post/${post.consumptionRecordId}`);
  }, [navigate, post.consumptionRecordId]);

  const handleLike = useCallback(() => {
    onLike?.(post.consumptionRecordId);
  }, [onLike, post.consumptionRecordId]);

  const handleDislike = useCallback(() => {
    onDislike?.(post.consumptionRecordId);
  }, [onDislike, post.consumptionRecordId]);

  const profileStyle = 'w-[3rem] h-[3rem] rounded-full';
  const imageUrl = post.imageUrls?.[0];

  return (
    <div className="bg-[var(--color-white)] overflow-hidden pb-[1.6rem]">
      <div className="pb-[0.8rem] flex items-center gap-[1.2rem]">
        {post.user.profileImgUrl ? (
          <img
            src={post.user.profileImgUrl}
            alt={`${post.user.nickname}의 프로필 이미지`}
            className={`${profileStyle} object-cover`}
          />
        ) : (
          <div
            className={`${profileStyle} bg-[var(--color-G6)]`}
            role="img"
            aria-label="기본 프로필 이미지"
          />
        )}
        <div className="flex flex-col">
          <h3 className="text-[1.4rem] text-[var(--color-G2)]">
            {post.user.nickname}
          </h3>
        </div>
      </div>

      <div
        onClick={handleNavigate}
        className="w-full relative pb-[100%] overflow-hidden rounded-[1rem] cursor-pointer"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`게시물 이미지 ${post.consumptionRecordId}`}
            className="absolute w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute w-full h-full bg-[var(--color-G6)] rounded-[1rem]"
            role="img"
            aria-label="게시물 이미지 없음"
          />
        )}
      </div>

      <div className="flex items-center gap-[1.6rem] pt-[0.5rem]">
        <button
          onClick={handleLike}
          className="flex items-center justify-center gap-[0.4rem] w-[5rem] h-[3.6rem] cursor-pointer"
        >
          <img src={liked ? LikeIconFill : LikeIcon} alt="좋아요" />
          <span className="w-[2rem] text-center text-[1.4rem] text-[var(--color-G1)]">
            {post.wiseCount}
          </span>
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center justify-center gap-[0.4rem] w-[5rem] h-[3.6rem] cursor-pointer"
        >
          <img src={disliked ? DislikeIconFill : DislikeIcon} alt="싫어요" />
          <span className="w-[2rem] text-center text-[1.4rem] text-[var(--color-G1)]">
            {post.wasteCount}
          </span>
        </button>
      </div>
    </div>
  );
};
