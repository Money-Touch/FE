import styled from 'styled-components';
import colors from '../common/colors';

export const Container = styled.div`
`;

//content
export const ContentContainer = styled.div`
  display:flex;
  flex-direction: column;
  margin: 0 2.4rem;
 `;

//author info
export const AuthorSection = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const AuthorName = styled.span`
  font-size: 1.4rem;
  color: ${colors.G1};
`;

export const Timestamp = styled.span`
  font-size: 0.8rem;
  color: ${colors.G3};
`;

export const PostImage = styled.img<{ hasImage: boolean }>`
  width: 37.7rem;
  height: 36.5rem;
  object-fit: cover;
  background-color: ${({ hasImage }) => (hasImage ? 'transparent' : '#aaaaaa')};  //실제 코드에서는 삭제
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 1rem;
  margin-top: 0.6rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
  gap: 0.6rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  gap: 0.6rem;
  width: 4rem;
  height: 2rem;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

export const ActionCount = styled.span`
  font-size: 1.2rem;
  color: ${colors.G1};
  display: flex;
  align-items: center;
`

//contents
export const InfoContainer = styled.div`
  margin-top: 2rem;
  gap: 1rem;
`;

export const CompanyName = styled.h2`
  line-height: 1.6rem;
  font-size: 1.2rem;
  color: ${colors.G3};
`;

export const Price = styled.div`
  line-height: 2.8rem;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Content = styled.p`
  line-height: 1.8rem;
  font-size: 1.4rem;
  white-space: pre-wrap;
`;

//Divider
export const Divider = styled.div`
  height: 0.7rem;
  background-color: ${colors.G8};
  margin-top: 2rem;
`;

//Comment
export const CommentContainer = styled.div`
  display:flex;
  flex-direction: column;
  margin: 0 2.4rem;
  margin-top: 1.4rem;
`;

export const CommentItem = styled.div`
  display:flex;
  margin-bottom: 1.4rem;
`;

export const CommentContent = styled.div`
  line-height: 1.6rem;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

export const CommentAuthorSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AuthorInfoGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorActionGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;

  img {
    width: 14px;
    height: 14px;
  }
`;

export const ReplyIconContain = styled.img`
  width: 0.8rem;
  height: 0.8rem;
  margin-top: 0.8rem;
  margin-right: 0.5rem;
`;

export const CommentMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
