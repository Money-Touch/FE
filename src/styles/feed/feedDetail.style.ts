import styled from 'styled-components';
import colors from '../common/colors';

export const Container = styled.div`
`;

//header
export const Header = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 6rem;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2.4rem;
`;

export const BackButton = styled.button`
  padding-left: 1.7rem;
  cursor: pointer;
`;

export const CategoryTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: ${colors.G1};
  margin: 0;
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
  margin-left: 0.2rem;
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