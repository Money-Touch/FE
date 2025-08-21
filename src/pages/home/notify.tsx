import * as S from '../../styles/home/notify.style';
import Header from '../../components/header/header';
import NotificationList from '../../components/home/notify/notificationList';
import { useNotifications } from '../../hooks/home/notify/useNotifications';
import { isNotificationStale } from '../../utils/home/notificationCheck';
import { useInfiniteScroll } from '../../hooks/home/routine/useInfiniteScroll';

function Notify() {
  const {
    notifications,
    markAsRead,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications();

  const bottomRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage,
  );

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className={S.Container}>
      <Header title="알림" />
      <div className={S.SectionContainer}>
        {isNotificationStale(notifications) && (
          <div className={S.NoNewNotice}>새로운 알림이 없어요.</div>
        )}
        {sortedNotifications.map((item) => (
          <NotificationList
            key={item.notificationId}
            notification={item}
            onMarkAsRead={markAsRead}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default Notify;
