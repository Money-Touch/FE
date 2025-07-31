import React from 'react';
import * as S from '../../../styles/feed/feedDetail.style';

import PersonIcon from '../../../assets/images/feed/Person.png';
import CommentIcon from '../../../assets/images/feed/Bubble.png';
import LikeIcon from '../../../assets/images/feed/Like.png';
import LikeActiveIcon from '../../../assets/images/feed/Like_Fill.png';
import ReplyIcon from '../../../assets/images/feed/Reply.png';
import EllipseIcon from '../../../assets/images/feed/Ellipse_221.png';

import type { Comment as CommentType } from '../../../types/feed/feed';

interface CommentItemProps {
  comment: CommentType;
  likedComments: { [commentId: number]: boolean };
  onLike: (id: number) => void;
  onReply: (mention: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  likedComments,
  onLike,
  onReply,
}) => {
  const formatCommentTime = (timestamp: Date) => {
    const date = new Date(timestamp);
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
                src={comment.author.profileImage || PersonIcon}
                className={S.profileImage}
              />
              <div className={S.authorInfo}>
                <span className={S.authorName}>{comment.author.name}</span>
                {formatCommentTime(comment.timestamp)}
              </div>
            </div>

            <div className={S.authorActionGroup}>
              <button
                className={S.iconButton}
                onClick={() => onLike(comment.id)}
              >
                <img
                  src={likedComments[comment.id] ? LikeActiveIcon : LikeIcon}
                  alt="좋아요"
                />
              </button>
              <button
                className={S.iconButton}
                onClick={() => onReply(comment.author.name)}
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
          <div key={reply.id} className="ml-[1.8rem]">
            <div className={S.commentItem}>
              <img src={ReplyIcon} alt="reply" className={S.replyIconContain} />
              <div className={S.commentMain}>
                <div className={S.commentAuthorSection}>
                  <div className={S.authorInfoGroup}>
                    <img
                      src={reply.author.profileImage || PersonIcon}
                      className={S.profileImage}
                    />
                    <div className={S.authorInfo}>
                      <span className={S.authorName}>{reply.author.name}</span>
                      {formatCommentTime(reply.timestamp)}
                    </div>
                  </div>

                  <div className={S.authorActionGroup}>
                    <button
                      className={S.iconButton}
                      onClick={() => onLike(reply.id)}
                    >
                      <img
                        src={
                          likedComments[reply.id] ? LikeActiveIcon : LikeIcon
                        }
                        alt="좋아요"
                      />
                    </button>
                    <button
                      className={S.iconButton}
                      onClick={() => onReply(reply.author.name)}
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
