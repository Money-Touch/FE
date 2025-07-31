export type NotificationType =
  // 댓글, 현명해요, 낭비에요, 무지출 달성, 지출 경고, 확인 알림, 오늘의 예산(총 7개)
  'COMMENT' | 'WISE' | 'WASTE' | 'GOAL' | 'COFFEE' | 'FIXED_COST' | 'BUDGET';

export interface Notification {
  notificationId: number;
  title: string;
  content: string;
  notificationTypeName: NotificationType;
  imgUrl?: string;
  senderName?: string;
  targetId: number;
  isRead: boolean;
  imageUrl: string | null;
  createdAt: string;
}

export type NotificationResponse = {
  notificationList: Notification[];
  notificationListSize: number;
  hasNext: boolean;
  nextCursorId: number | null;
  first: boolean;
  last: boolean;
};
