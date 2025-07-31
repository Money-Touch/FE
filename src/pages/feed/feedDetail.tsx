// FeedDetail.tsx
import React, { useState, useEffect } from 'react';
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

import { handleLike, handleDislike } from '../../utils/feed/reaction';
import type { Post, PostStates, Comment } from '../../types/feed/feed';

export const FeedDetail: React.FC = () => {
  const [post] = useState<Post>({
    id: 1,
    author: {
      name: '라인',
      profileImage: '',
    },
    image: '',
    likes: 1,
    dislikes: 10,
    timestamp: new Date(),
    category: '배달/외식',
    companyName: '신라방마라탕',
    price: 12000,
    content:
      '오늘 저녁은 기필코 집밥을 해먹으려고 했는데...\n남자친구랑 헤어져서 슬퍼서 마라탕 먹었습니다.',
    comments: [
      {
        id: 1,
        author: { name: '영이', profileImage: '' },
        content: '네? 헤어진거랑 마라탕이 무슨 상관이죠?',
        timestamp: new Date(),
        replies: [
          {
            id: 2,
            author: { name: '라인', profileImage: '' },
            content: '헤어졌으니 봐주세요ㅜ 다음부턴 무조건 집밥입니다..',
            timestamp: new Date(),
          },
        ],
      },
    ],
  });

  const [posts, setPosts] = useState<Post[]>([post]);
  const [postStates, setPostStates] = useState<PostStates>({});
  const [likedComments, setLikedComments] = useState<{
    [commentId: number]: boolean;
  }>({});
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [mentionName, setMentionName] = useState<string | null>(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.style.display = isReplying ? 'block' : 'none';
    return () => {
      if (footer) footer.style.display = 'none';
    };
  }, [isReplying]);

  const handleComment = (mention?: string) => {
    setIsReplying(true);
    setMentionName(mention || null);
    setReplyText('');
  };

  const closeReplyInput = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const toggleLike = (commentId: number) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComments = (comments: Comment[]) =>
    comments.map((cmt) => (
      <CommentItem
        key={cmt.id}
        comment={cmt}
        likedComments={likedComments}
        onLike={toggleLike}
        onReply={handleComment}
      />
    ));

  const updatedPost = posts.find((p) => p.id === post.id) ?? post;
  const { liked, disliked } = postStates[post.id] || {
    liked: false,
    disliked: false,
  };

  const date = new Date(post.timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <>
      <div className={S.container}>
        <div className={S.contentContainer}>
          <Header title={updatedPost.category} />
          <div className={S.authorSection}>
            <img
              src={updatedPost.author.profileImage || PersonIcon}
              className={S.profileImage}
              alt="작성자 프로필"
            />
            <div className={S.authorInfo}>
              <span className={S.authorName}>{updatedPost.author.name}</span>
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
            src={updatedPost.image || ''}
            alt="본문 이미지"
            className={`${S.postImage} ${!updatedPost.image ? S.noImage : ''}`}
          />

          <div className={S.actionButtons}>
            <button
              className={S.actionButton}
              onClick={() =>
                handleLike(post.id, posts, postStates, setPosts, setPostStates)
              }
            >
              <img
                src={liked ? LikeActiveIcon : LikeIcon}
                className={S.actionIcon}
                alt="좋아요"
              />
              <span className={S.actionCount}>{updatedPost.likes}</span>
            </button>

            <button
              className={S.actionButton}
              onClick={() =>
                handleDislike(
                  post.id,
                  posts,
                  postStates,
                  setPosts,
                  setPostStates,
                )
              }
            >
              <img
                src={disliked ? DislikeActiveIcon : DislikeIcon}
                className={S.actionIcon}
                alt="싫어요"
              />
              <span className={S.actionCount}>{updatedPost.dislikes}</span>
            </button>

            <button className={S.actionButton} onClick={() => handleComment()}>
              <img src={CommentIcon} className={S.actionIcon} alt="댓글" />
              <span className={S.actionCount}>
                {updatedPost.comments?.length ?? 0}
              </span>
            </button>
          </div>

          {updatedPost.companyName && (
            <div className={S.infoContainer}>
              <h2 className={S.companyName}>{updatedPost.companyName}</h2>
              <div className={S.price}>
                {updatedPost.price?.toLocaleString()}원
              </div>
              <p className={S.content}>{updatedPost.content}</p>
            </div>
          )}
        </div>

        <div className={S.divider} />

        {updatedPost.comments && updatedPost.comments.length > 0 && (
          <div className={S.commentContainer}>
            {renderComments(updatedPost.comments)}
          </div>
        )}
      </div>

      {isReplying && (
        <CommentInput
          mentionName={mentionName}
          replyText={replyText}
          onChange={setReplyText}
          onClose={closeReplyInput}
        />
      )}

      {!isReplying && <Footer />}
    </>
  );
};

export default FeedDetail;
