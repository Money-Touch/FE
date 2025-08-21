import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeIcon from '../../assets/images/feed/Like.png';
import LikeIconFill from '../../assets/images/feed/Like_Fill.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';
import DislikeIconFill from '../../assets/images/feed/Dislike_Fill.png';
import noProfile from '../../assets/images/feed/noProfile.png';
import type { FeedItem } from '../../types/feed/feed';
import { useReaction } from '../../hooks/feed/useReaction';
import * as S from '../../styles/feed/feed.style';

type Props = { post: FeedItem };

function ReactionBar({
  id,
  wiseCount,
  wasteCount,
  myReaction,
}: {
  id: number;
  wiseCount: number;
  wasteCount: number;
  myReaction: 'WISE' | 'WASTE' | null;
}) {
  const {
    wiseCount: w,
    wasteCount: wa,
    myReaction: mine,
    isReacting,
    reactWise,
    reactWaste,
  } = useReaction(
    id,
    { wiseCount, wasteCount, myReaction },
    {
      invalidateKeys: [
        ['feed', 'POPULAR'],
        ['feed', 'RECENT'],
        ['feedDetail', id],
      ],
    },
  );

  const onLike = useCallback(() => {
    if (!isReacting) reactWise();
  }, [isReacting, reactWise]);

  const onDislike = useCallback(() => {
    if (!isReacting) reactWaste();
  }, [isReacting, reactWaste]);

  return (
    <div className={S.actionContainer}>
      <button
        onClick={onLike}
        disabled={isReacting}
        aria-pressed={mine === 'WISE'}
        className={S.actionImg}
      >
        <img
          src={mine === 'WISE' ? LikeIconFill : LikeIcon}
          alt="현명해요"
          className={S.actionIcon}
        />
        <span className={S.actionText}>{w}</span>
      </button>

      <button
        onClick={onDislike}
        disabled={isReacting}
        aria-pressed={mine === 'WASTE'}
        className={S.actionImg}
      >
        <img
          src={mine === 'WASTE' ? DislikeIconFill : DislikeIcon}
          alt="낭비에요"
          className={S.actionIcon}
        />
        <span className={S.actionText}>{wa}</span>
      </button>
    </div>
  );
}

function PostItem({ post }: Props) {
  const navigate = useNavigate();
  const imageUrl = post.imageUrls?.[0];

  const handleNavigate = useCallback(() => {
    navigate(`/feed/post/${post.consumptionRecordId}`);
  }, [navigate, post.consumptionRecordId]);

  const authorProfile = post.user.profileImgUrl || noProfile;

  return (
    <div className={S.postItemContainer}>
      <div className={S.profileContainer}>
        <img
          src={authorProfile}
          alt={`${post.user.nickname}의 프로필 이미지`}
          className={`${S.profileStyle} object-cover ${
            authorProfile === noProfile ? 'bg-[var(--color-G6)]' : ''
          }`}
        />
        <div className={S.profileText}>
          <h3 className={S.profileName}>{post.user.nickname}</h3>
        </div>
      </div>

      <div onClick={handleNavigate} className={S.contentContainer}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`게시물 이미지 ${post.consumptionRecordId}`}
            className={S.postImg}
          />
        ) : (
          <div
            className={S.postNoImg}
            role="img"
            aria-label="게시물 이미지 없음"
          />
        )}
      </div>

      <ReactionBar
        id={post.consumptionRecordId}
        wiseCount={post.wiseCount}
        wasteCount={post.wasteCount}
        myReaction={post.myReaction}
      />
    </div>
  );
}

export default PostItem;
