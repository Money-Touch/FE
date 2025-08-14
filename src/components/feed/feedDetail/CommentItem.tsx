import React from 'react';
import * as S from '../../../styles/feed/feedDetail.style';

import PersonIcon from '../../../assets/images/feed/Person.png';
import CommentIcon from '../../../assets/images/feed/Bubble.png';
import LikeIcon from '../../../assets/images/feed/Like.png';
import LikeActiveIcon from '../../../assets/images/feed/Like_Fill.png';
import ReplyIcon from '../../../assets/images/feed/Reply.png';
import EllipseIcon from '../../../assets/images/feed/Ellipse_221.png';

import type { CommentListDTO } from '../../../types/feed/feedDetail';

interface CommentItemProps {
  comment: CommentListDTO;
  likedComments: Record<number, boolean>;
  onLike: (id: number) => void;
  onReply: (mention: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  likedComments,
  onLike,
  onReply,
}) => {
  const formatCommentTime = (iso: string) => {
    const date = new Date(iso);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return (
      <span className={S.timestamp}>
        {month}
        <img src={EllipseIcon} className={S.eclipseIcon} alt="·" />
        {day}
        <img src={EllipseIcon} className={S.eclipseIcon} alt="·" />
        {time}
      </span>
    );
  };

  return (
    <div>
      <div className={S.commentItem}>
        <div className={S.commentMain}>
          <div className={S.commentAuthorSection}>
            <div className={S.authorInfoGroup}>
              <img
                src={comment.profileImgUrl || PersonIcon}
                className={S.profileImage}
                alt="작성자 프로필"
              />
              <div className={S.authorInfo}>
                <span className={S.authorName}>{comment.nickname}</span>
                {formatCommentTime(comment.createdAt)}
              </div>
            </div>

            <div className={S.authorActionGroup}>
              <button
                className={S.iconButton}
                onClick={() => onLike(comment.commentId)}
              >
                <img
                  src={
                    likedComments[comment.commentId] ? LikeActiveIcon : LikeIcon
                  }
                  alt="좋아요"
                />
              </button>
              <button
                className={S.iconButton}
                onClick={() => onReply(comment.nickname)}
              >
                <img src={CommentIcon} alt="댓글" />
              </button>
            </div>
          </div>
          <div className={S.commentContent}>{comment.content}</div>
        </div>
      </div>

      {comment.replies &&
        comment.replies.map((reply) => (
          <div key={reply.commentId} className="ml-[1.8rem]">
            <div className={S.commentItem}>
              <img src={ReplyIcon} alt="reply" className={S.replyIconContain} />
              <div className={S.commentMain}>
                <div className={S.commentAuthorSection}>
                  <div className={S.authorInfoGroup}>
                    <img
                      src={reply.profileImgUrl || PersonIcon}
                      className={S.profileImage}
                      alt="작성자 프로필"
                    />
                    <div className={S.authorInfo}>
                      <span className={S.authorName}>{reply.nickname}</span>
                      {formatCommentTime(reply.createdAt)}
                    </div>
                  </div>

                  <div className={S.authorActionGroup}>
                    <button
                      className={S.iconButton}
                      onClick={() => onLike(reply.commentId)}
                    >
                      <img
                        src={
                          likedComments[reply.commentId]
                            ? LikeActiveIcon
                            : LikeIcon
                        }
                        alt="좋아요"
                      />
                    </button>
                    <button
                      className={S.iconButton}
                      onClick={() => onReply(reply.nickname)}
                    >
                      <img src={CommentIcon} alt="댓글" />
                    </button>
                  </div>
                </div>
                <div className={S.commentContent}>{reply.content}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentItem;
