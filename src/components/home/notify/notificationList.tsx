import * as S from '../../../styles/home/notify.style';
import HighlightedMessage from './highlightedMessage';
import {
  typeToIcon,
  hasThumbnail,
} from '../../../constants/home/notificationIcon';
import type { Notification } from '../../../types/home/notification';
import { getFormattedTime } from '../../../utils/home/timeFormat';

import exImage from '../../../assets/images/home/notify/ex1.png';

type Props = {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
};

function NotificationList({ notification, onMarkAsRead }: Props) {
  const { id, title, message, type, imageUrl, createdAt, isRead, senderId } =
    notification;

  const handleClick = () => {
    if (!isRead) {
      onMarkAsRead(id);
    }
  };

  return (
    <S.List $isRead={isRead} onClick={handleClick}>
      <S.Item>
        <S.LeftSection>
          <S.IconTitleGroup>
            <S.Icon src={typeToIcon[type]} alt="icon" />
            <S.TitleContentGroup>
              <S.Title>{title}</S.Title>
              <S.MessageGroup>
                <S.Message>
                  <HighlightedMessage
                    message={message}
                    type={type}
                    senderId={senderId}
                    hasThumbnail={hasThumbnail}
                  />
                </S.Message>
                <S.DateText>{getFormattedTime(createdAt)}</S.DateText>
              </S.MessageGroup>
            </S.TitleContentGroup>
          </S.IconTitleGroup>
        </S.LeftSection>
        <S.RightSection>
          {hasThumbnail(type) && (
            <S.Thumbnail
              src={imageUrl && imageUrl.trim() !== '' ? imageUrl : exImage}
              alt="thumbnail"
            />
          )}
        </S.RightSection>
      </S.Item>
    </S.List>
  );
}

export default NotificationList;
