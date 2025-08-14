import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../../styles/feed/feedDetail.style';

import LikeIcon from '../../assets/images/feed/Like.png';
import LikeActiveIcon from '../../assets/images/feed/Like_Fill.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';
import DislikeActiveIcon from '../../assets/images/feed/Dislike_Fill.png';
import CommentIcon from '../../assets/images/feed/Bubble.png';
import PersonIcon from '../../assets/images/feed/Person.png';
import EllipseIcon from '../../assets/images/feed/Ellipse_221.png';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

import CommentInput from '../../components/feed/feedDetail/CommentInput';
import CommentItem from '../../components/feed/feedDetail/CommentItem';
import { useFeedDetail } from '../../hooks/feed/useFeedDetail';
import { useFeedComments } from '../../hooks/feed/useFeedComments';
import { useCreateComment } from '../../hooks/feed/useCreateComment';
import { useReaction } from '../../hooks/feed/useReaction';

export const FeedDetail: React.FC = () => {
  const { postId } = useParams();
  const consumptionRecordId = Number(postId);

  const { data } = useFeedDetail(consumptionRecordId);
  const { data: comments } = useFeedComments(consumptionRecordId);
  const { mutate: createComment, isPending } =
    useCreateComment(consumptionRecordId);

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [mentionName, setMentionName] = useState<string | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {},
  );

  const reaction = useReaction(
    consumptionRecordId,
    {
      wiseCount: data?.wiseCount ?? 0,
      wasteCount: data?.wasteCount ?? 0,
      myReaction: data?.myReaction ?? null,
    },
    {
      invalidateKeys: [
        ['feed', 'POPULAR'],
        ['feed', 'RECENT'],
        ['feedDetail', consumptionRecordId],
      ],
    },
  );

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.style.display = isReplying ? 'block' : 'none';
    return () => {
      if (footer) footer.style.display = 'none';
    };
  }, [isReplying]);

  const handleComment = (mention?: string, parentId?: number) => {
    setIsReplying(true);
    setMentionName(mention || null);
    setSelectedParentId(parentId ?? null);
    setReplyText('');
  };

  const closeReplyInput = () => {
    setIsReplying(false);
    setReplyText('');
    setMentionName(null);
    setSelectedParentId(null);
  };

  const handleSubmitComment = () => {
    const content = replyText.trim();
    if (!content) return;
    createComment(
      { parentId: selectedParentId ?? undefined, content },
      { onSuccess: closeReplyInput },
    );
  };

  const onLikeComment = (id: number) => {
    setLikedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onReplyTo = (parentId: number) => (mention: string) => {
    handleComment(mention, parentId);
  };

  const createdAt = useMemo(
    () => (data ? new Date(data.createdAt) : null),
    [data],
  );
  const month = createdAt ? createdAt.getMonth() + 1 : '';
  const day = createdAt ? createdAt.getDate() : '';
  const time = createdAt
    ? createdAt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '';

  if (!data)
    return <div className="text-center p-10">게시글을 찾을 수 없습니다.</div>;

  const image = data.imageUrls?.[0];
  const categoryName = data.consumptionCategory?.budgetCategoryName ?? '';
  const authorName = data.user?.nickname ?? '';
  const authorProfile = data.user?.profileImgUrl || PersonIcon;

  const wiseCount = reaction?.wiseCount ?? 0;
  const wasteCount = reaction?.wasteCount ?? 0;
  const mine = reaction?.myReaction ?? null;
  const isReacting = reaction?.isReacting ?? false;
  const reactWise = reaction?.reactWise ?? (() => {});
  const reactWaste = reaction?.reactWaste ?? (() => {});

  return (
    <>
      <div className={S.container}>
        <div className={S.contentContainer}>
          <Header title={categoryName} />
          <div className={S.authorSection}>
            <img
              src={authorProfile}
              className={S.profileImage}
              alt="작성자 프로필"
            />
            <div className={S.authorInfo}>
              <span className={S.authorName}>{authorName}</span>
              <span className={S.timestamp}>
                {month}
                <img src={EllipseIcon} className={S.eclipseIcon} alt="·" />
                {day}
                <img src={EllipseIcon} className={S.eclipseIcon} alt="·" />
                {time}
              </span>
            </div>
          </div>

          <img
            src={image || ''}
            alt="본문 이미지"
            className={`${S.postImage} ${!image ? S.noImage : ''}`}
          />

          <div className={S.actionButtons}>
            <button
              className={S.actionButton}
              onClick={() => !isReacting && reactWise()}
              disabled={isReacting}
              aria-pressed={mine === 'WISE'}
            >
              <img
                src={mine === 'WISE' ? LikeActiveIcon : LikeIcon}
                className={S.actionIcon}
                alt="현명해요"
              />
              <span className={S.actionCount}>{wiseCount}</span>
            </button>
            <button
              className={S.actionButton}
              onClick={() => !isReacting && reactWaste()}
              disabled={isReacting}
              aria-pressed={mine === 'WASTE'}
            >
              <img
                src={mine === 'WASTE' ? DislikeActiveIcon : DislikeIcon}
                className={S.actionIcon}
                alt="낭비에요"
              />
              <span className={S.actionCount}>{wasteCount}</span>
            </button>
            <button className={S.actionButton} onClick={() => handleComment()}>
              <img src={CommentIcon} className={S.actionIcon} alt="댓글" />
              <span className={S.actionCount}>{data.commentCount ?? 0}</span>
            </button>
          </div>

          <div className={S.infoContainer}>
            <h2 className={S.companyName}>{categoryName}</h2>
            <div className={S.price}>
              {(data.amount ?? 0).toLocaleString()}원
            </div>
            <p className={S.content}>{data.content}</p>
            {data.memo && <p className={S.content}>{data.memo}</p>}
          </div>
        </div>

        <div className={S.divider} />

        {comments && comments.length > 0 && (
          <div className={S.commentContainer}>
            {comments.map((c) => (
              <div key={c.commentId} style={{ marginBottom: '1.2rem' }}>
                <CommentItem
                  comment={c}
                  likedComments={likedComments}
                  onLike={onLikeComment}
                  onReply={onReplyTo(c.commentId)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {isReplying && (
        <CommentInput
          mentionName={mentionName}
          replyText={replyText}
          onChange={setReplyText}
          onSubmit={handleSubmitComment}
          onClose={closeReplyInput}
          isSubmitting={isPending}
          maxLength={300}
        />
      )}

      {!isReplying && <Footer />}
    </>
  );
};

export default FeedDetail;
