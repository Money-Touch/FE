import type { Notification } from '../../types/home/notification';

export function isNotificationStale(notifications: Notification[]): boolean {
  if (notifications.length === 0) return true;
  const latestTime = new Date(notifications[0].createdAt).getTime();
  const now = Date.now();
  const diffHours = (now - latestTime) / (1000 * 60 * 60);
  return diffHours > 48;
}
