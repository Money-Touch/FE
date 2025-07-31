import React, { useState, useEffect } from 'react';
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

import { handleLike, handleDislike } from '../../utils/feed/reaction';
import type { Post, PostStates, Comment } from '../../types/feed/feed';

import { Posts } from '../../mocks/feed/feed';

export const FeedDetail: React.FC = () => {
  const { postId } = useParams();
  const numericPostId = Number(postId);

  const [posts, setPosts] = useState<Post[]>(Posts);
  const [postStates, setPostStates] = useState<PostStates>({});
  const [likedComments, setLikedComments] = useState<{
    [commentId: number]: boolean;
  }>({});
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [mentionName, setMentionName] = useState<string | null>(null);

  const post = posts.find((p) => p.id === numericPostId);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.style.display = isReplying ? 'block' : 'none';
    return () => {
      if (footer) footer.style.display = 'none';
    };
  }, [isReplying]);

  if (!post) {
    return <div className="text-center p-10">게시글을 찾을 수 없습니다.</div>;
  }

  const { liked, disliked } = postStates[post.id] || {
    liked: false,
    disliked: false,
  };

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
          <Header title={post.category} />
          <div className={S.authorSection}>
            <img
              src={post.author.profileImage || PersonIcon}
              className={S.profileImage}
              alt="작성자 프로필"
            />
            <div className={S.authorInfo}>
              <span className={S.authorName}>{post.author.name}</span>
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
            src={post.image || ''}
            alt="본문 이미지"
            className={`${S.postImage} ${!post.image ? S.noImage : ''}`}
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
                alt="현명해요"
              />
              <span className={S.actionCount}>{post.likes}</span>
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
                alt="낭비에요"
              />
              <span className={S.actionCount}>{post.dislikes}</span>
            </button>

            <button className={S.actionButton} onClick={() => handleComment()}>
              <img src={CommentIcon} className={S.actionIcon} alt="댓글" />
              <span className={S.actionCount}>
                {post.comments?.length ?? 0}
              </span>
            </button>
          </div>

          {post.companyName && (
            <div className={S.infoContainer}>
              <h2 className={S.companyName}>{post.companyName}</h2>
              <div className={S.price}>{post.price?.toLocaleString()}원</div>
              <p className={S.content}>{post.content}</p>
            </div>
          )}
        </div>

        <div className={S.divider} />

        {post.comments && post.comments.length > 0 && (
          <div className={S.commentContainer}>
            {renderComments(post.comments)}
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
