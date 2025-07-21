import React, { useState } from 'react';
import * as S from '../../styles/feed/feedDetail.style';
import { useNavigate } from 'react-router-dom';

import LikeIcon from '../../assets/images/feed/Like.png';
import LikeActiveIcon from '../../assets/images/feed/Like_Fill.png';
import DislikeIcon from '../../assets/images/feed/Dislike.png';
import DislikeActiveIcon from '../../assets/images/feed/Dislike_Fill.png';
import CommentIcon from '../../assets/images/feed/Bubble.png';
import PersonIcon from '../../assets/images/feed/Person.png';
import ReplyIcon from '../../assets/images/feed/Reply.png';

import Header from '../../components/header/header'
import { handleLike, handleDislike } from '../../utils/feed/reaction';
import type { Post, PostStates, Comment } from '../../types/feed/feed';

export const FeedDetail: React.FC = () => {
  const navigate = useNavigate();

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
    content: '오늘 저녁은 기필코 집밥을 해먹으려고 했는데...\n남자친구랑 헤어져서 슬퍼서 마라탕 먹었습니다.',

    comments: [
      {
        id: 1,
        author: { name: '영이', profileImage: '' },
        content: '네? 헤어진거랑 마라탕이 무슨 상관이죠?',
        timestamp: new Date(),
        replies: [
          {
            id:2,
            author: { name: '라인', profileImage: '' },
            content: '헤어졌으니 봐주세요ㅜ 다음부턴 무조건 집밥입니다..',
            timestamp: new Date(),
          }
        ]
      },
    ],
  });

  const [posts, setPosts] = useState<Post[]>([post]);
  const [postStates, setPostStates] = useState<PostStates>({});

  const handleBack = () => {
    navigate(-1);
  };

  const handleComment = () => {
  };

  const [likedComments, setLikedComments] = useState<{ [commentId: number]: boolean }>({});

  const toggleLike = (commentId: number) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComments = (comments: Comment[]) => {
    return comments.map((cmt) => (
      <div key={cmt.id}>
        <S.CommentItem>
          <S.CommentMain>
            <S.CommentAuthorSection>
              <S.AuthorInfoGroup>
                {cmt.author.profileImage ? (
                  <S.ProfileImage src={cmt.author.profileImage} />
                ) : (
                  <S.ProfileImage src={PersonIcon} />
                )}
                <S.AuthorInfo>
                  <S.AuthorName>{cmt.author.name}</S.AuthorName>
                  <S.Timestamp>
                    {new Date(cmt.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </S.Timestamp>
                </S.AuthorInfo>
              </S.AuthorInfoGroup>

              <S.AuthorActionGroup>
                <S.IconButton onClick={() => toggleLike(cmt.id)}>
                  <img
                    src={likedComments[cmt.id] ? LikeActiveIcon : LikeIcon}
                    alt="좋아요"
                  />
                </S.IconButton>
                <S.IconButton>
                  <img src={CommentIcon} alt="댓글" />
                </S.IconButton>
              </S.AuthorActionGroup>
            </S.CommentAuthorSection>
            <S.CommentContent>{cmt.content}</S.CommentContent>
          </S.CommentMain>
        </S.CommentItem>

        {cmt.replies &&
          cmt.replies.map((reply) => (
            <div key={reply.id} style={{ marginLeft: 18 }}>
              <S.CommentItem>
                <S.ReplyIconContain src={ReplyIcon} alt="reply" />
                <S.CommentMain>
                  <S.CommentAuthorSection>
                    <S.AuthorInfoGroup>
                      {reply.author.profileImage ? (
                        <S.ProfileImage src={reply.author.profileImage} />
                      ) : (
                        <S.ProfileImage src={PersonIcon} />
                      )}
                      <S.AuthorInfo>
                        <S.AuthorName>{reply.author.name}</S.AuthorName>
                        <S.Timestamp>
                          {new Date(reply.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </S.Timestamp>
                      </S.AuthorInfo>
                    </S.AuthorInfoGroup>

                    <S.AuthorActionGroup>
                      <S.IconButton onClick={() => toggleLike(reply.id)}>
                        <img
                          src={likedComments[reply.id] ? LikeActiveIcon : LikeIcon}
                          alt="좋아요"
                        />
                      </S.IconButton>
                      <S.IconButton>
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
    ));
  };

  const date = new Date(post.timestamp);
  const formattedTime = `${date.toLocaleDateString()} · ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const updatedPost = posts.find((p) => p.id === post.id) ?? post;
  const { liked, disliked } = postStates[post.id] || { liked: false, disliked: false };

  return (
    <>
    <S.Container>
      <Header title={updatedPost.category} onBack={handleBack} />

      <S.ContentContainer>
        <S.AuthorSection>
          {updatedPost.author.profileImage ? (
            <S.ProfileImage src={updatedPost.author.profileImage} />
          ) : (
            <S.ProfileImage src={PersonIcon} />
          )}
          <S.AuthorInfo>
            <S.AuthorName>{updatedPost.author.name}</S.AuthorName>
            <S.Timestamp>{formattedTime}</S.Timestamp>
          </S.AuthorInfo>
        </S.AuthorSection>

        <S.PostImage
          src={updatedPost.image || ''}
          alt="본문 이미지"
          hasImage={!!updatedPost.image}
        />

        <S.ActionButtons>
          <S.ActionButton
            onClick={() =>
              handleLike(updatedPost.id, posts, postStates, setPosts, setPostStates)
            }
          >
            <img src={liked ? LikeActiveIcon : LikeIcon} alt="좋아요" />
            <S.ActionCount>{updatedPost.likes}</S.ActionCount>
          </S.ActionButton>

          <S.ActionButton
            onClick={() =>
              handleDislike(updatedPost.id, posts, postStates, setPosts, setPostStates)
            }
          >
            <img src={disliked ? DislikeActiveIcon : DislikeIcon} alt="싫어요" />
            <S.ActionCount>{updatedPost.dislikes}</S.ActionCount>
          </S.ActionButton>

          <S.ActionButton onClick={handleComment}>
            <img src={CommentIcon} alt="댓글" />
            <S.ActionCount>{updatedPost.comments?.length ?? 0}</S.ActionCount>
          </S.ActionButton>
        </S.ActionButtons>

        {updatedPost.companyName && (
          <S.InfoContainer>
            <S.CompanyName>{updatedPost.companyName}</S.CompanyName>
            <S.Price>{updatedPost.price?.toLocaleString()}원</S.Price>
            <S.Content>{updatedPost.content}</S.Content>
          </S.InfoContainer>
        )}
      </S.ContentContainer>

      <S.Divider />

      {updatedPost.comments && updatedPost.comments.length > 0 && (
        <S.CommentContainer>
          {renderComments(updatedPost.comments)}
        </S.CommentContainer>
      )}
    </S.Container>
    </>
  );
};

export default FeedDetail;
