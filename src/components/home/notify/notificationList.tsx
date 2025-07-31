import * as S from '../../../styles/home/notify.style';
import HighlightedMessage from './highlightedMessage';
import {
  typeToIcon,
  hasThumbnail,
} from '../../../constants/home/notificationIcon';
import type { Notification } from '../../../types/home/notification';
import { getFormattedTime } from '../../../utils/home/getFormattedTime';
import exImage from '../../../assets/images/home/notify/ex1.png';

type Props = {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
};

function NotificationList({ notification, onMarkAsRead }: Props) {
  const {
    notificationId,
    title,
    content,
    notificationTypeName,
    senderName,
    isRead,
    imageUrl,
    createdAt,
  } = notification;

  const handleClick = () => {
    if (!isRead) {
      onMarkAsRead(notificationId);
    }
  };

  return (
    <div className={S.List(isRead)} onClick={handleClick}>
      <div className={S.Item}>
        <div className={S.LeftSection}>
          <div className={S.IconTitleGroup}>
            <img
              src={typeToIcon[notificationTypeName]}
              alt="icon"
              className={S.Icon}
            />
            <div className={S.TitleContentGroup}>
              <div className={S.Title}>{title}</div>
              <div className={S.MessageGroup}>
                <div className={S.Message}>
                  <HighlightedMessage
                    message={content}
                    type={notificationTypeName}
                    senderName={senderName}
                    hasThumbnail={hasThumbnail}
                  />
                </div>
                <div className={S.DateText}>{getFormattedTime(createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={S.RightSection}>
          {hasThumbnail(notificationTypeName) && (
            <img
              src={imageUrl && imageUrl.trim() !== '' ? imageUrl : exImage}
              alt="thumbnail"
              className={S.Thumbnail}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationList;
