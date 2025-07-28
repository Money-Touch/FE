import * as S from '../../styles/home/notify.style';
import Header from '../../components/header/header';
import NotificationList from '../../components/home/notify/notificationList';
import { useNotifications } from '../../hooks/home/useNotifications';
import { isNotificationStale } from '../../utils/home/notificationCheck';

function Notify() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className={`pageContainer ${S.Container}`}>
      <Header title="알림" />
      {isNotificationStale(notifications) && (
        <div className={S.NoNewNotice}>새로운 알림이 없어요.</div>
      )}
      {notifications.map((item) => (
        <NotificationList
          key={item.id}
          notification={item}
          onMarkAsRead={markAsRead}
        />
      ))}
    </div>
  );
}

export default Notify;
