export type NotificationType =
  // 댓글, 현명해요, 낭비에요, 무지출 달성, 지출 경고, 확인 알림, 오늘의 예산(총 7개)
  | 'COMMENT'
  | 'REACTION_UP'
  | 'REACTION_DOWN'
  | 'ACHIEVEMENT'
  | 'WARNING'
  | 'REMINDER'
  | 'TODAY';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  imageUrl?: string;
  isRead: boolean;
  senderId: number;
  receiverId: number;
  createdAt: string;
}
