import type { Notification } from '../../types/home/notification';

export function isNotificationStale(notifications: Notification[]): boolean {
  if (notifications.length === 0) return true;

  const now = Date.now();

  const hasRecent = notifications.some((n) => {
    if (!n || !n.createdAt) return false;
    const created = new Date(n.createdAt).getTime();
    const diffHours = (now - created) / (1000 * 60 * 60);
    return diffHours <= 48;
  });

  return !hasRecent;
}
