import colors from '../../styles/common/colors';
import styled from 'styled-components';

// notify.tsx
export const Container = styled.div`
  display: flex;
  padding: 0 2.4rem;
  background-color: ${colors.white};
`;

// notificationList.tsx
export const List = styled.div<{ $isRead: boolean }>`
  width: calc(100% + 4.8rem);
  display: flex;
  padding: 1.5rem 2.4rem;
  background-color: ${({ $isRead }) =>
    $isRead ? colors.white : colors.subColor5};
  align-items: flex-start;
  box-sizing: border-box;
  gap: 8.3rem;
  cursor: pointer;
`;

export const Item = styled.div`
  width: 100%;
  height: 7.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Icon = styled.img`
  width: 2.6rem;
  height: 2.6rem;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LeftSection = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const IconTitleGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
`;

export const TitleContentGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 7.3rem;
`;

export const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 0;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  height: 2.6rem;
  line-height: 2.6rem;
  color: ${colors.G1};
`;

export const Message = styled.div`
  font-size: 1.1rem;
  font-style: Light;
  color: ${colors.G2};
  white-space: pre-line;
  font-weight: 300;
`;

export const DateText = styled.div`
  font-weight: 300;
  font-size: 1.1rem;
  color: ${colors.G5};
`;

export const Thumbnail = styled.img`
  width: 5.3rem;
  height: 5.3rem;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const NoNewNotice = styled.div`
  align-self: flex-start;
  height: 2.2rem;
  left: 2.4rem;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${colors.G2};
`;

// highlightedMessage.tsx
export const SenderName = styled.span`
  font-weight: 500;
`;
