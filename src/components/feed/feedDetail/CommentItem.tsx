import React from 'react';
import * as S from '../../../styles/feed/feedDetail.style';

import PersonIcon from '../../../assets/images/feed/Person.png';
import CommentIcon from '../../../assets/images/feed/Bubble.png';
import LikeIcon from '../../../assets/images/feed/Like.png';
import LikeActiveIcon from '../../../assets/images/feed/Like_Fill.png';
import ReplyIcon from '../../../assets/images/feed/Reply.png';

import type { Comment as CommentType } from '../../../types/feed/feed';

interface CommentItemProps {
  comment: CommentType;
  likedComments: { [commentId: number]: boolean };
  onLike: (id: number) => void;
  onReply: (mention: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, likedComments, onLike, onReply }) => {
  return (
    <div>
      <S.CommentItem>
        <S.CommentMain>
          <S.CommentAuthorSection>
            <S.AuthorInfoGroup>
              <S.ProfileImage src={comment.author.profileImage || PersonIcon} />
              <S.AuthorInfo>
                <S.AuthorName>{comment.author.name}</S.AuthorName>
                <S.Timestamp>{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</S.Timestamp>
              </S.AuthorInfo>
            </S.AuthorInfoGroup>

            <S.AuthorActionGroup>
              <S.IconButton onClick={() => onLike(comment.id)}>
                <img src={likedComments[comment.id] ? LikeActiveIcon : LikeIcon} alt="좋아요" />
              </S.IconButton>
              <S.IconButton onClick={() => onReply(comment.author.name)}>
                <img src={CommentIcon} alt="댓글" />
              </S.IconButton>
            </S.AuthorActionGroup>
          </S.CommentAuthorSection>
          <S.CommentContent>{comment.content}</S.CommentContent>
        </S.CommentMain>
      </S.CommentItem>

      {comment.replies && comment.replies.map((reply) => (
        <div key={reply.id} style={{ marginLeft: 18 }}>
          <S.CommentItem>
            <S.ReplyIconContain src={ReplyIcon} alt="reply" />
            <S.CommentMain>
              <S.CommentAuthorSection>
                <S.AuthorInfoGroup>
                  <S.ProfileImage src={reply.author.profileImage || PersonIcon} />
                  <S.AuthorInfo>
                    <S.AuthorName>{reply.author.name}</S.AuthorName>
                    <S.Timestamp>{new Date(reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</S.Timestamp>
                  </S.AuthorInfo>
                </S.AuthorInfoGroup>

                <S.AuthorActionGroup>
                  <S.IconButton onClick={() => onLike(reply.id)}>
                    <img src={likedComments[reply.id] ? LikeActiveIcon : LikeIcon} alt="좋아요" />
                  </S.IconButton>
                  <S.IconButton onClick={() => onReply(reply.author.name)}>
                    <img src={CommentIcon} alt="댓글" />
                  </S.IconButton>
                </S.AuthorActionGroup>
              </S.CommentAuthorSection>
              <S.CommentContent>{reply.content}</S.CommentContent>
            </S.CommentMain>
          </S.CommentItem>
        </div>
      ))}
    </div>
  );
};

export default CommentItem;