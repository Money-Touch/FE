import { useState, useEffect } from 'react';
import type { Notification } from '../../types/home/notification';
import { mockNoticeData } from '../../mocks/home/mockNoticeData'; // mock data

const userId = 11; // 테스트

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNoticeData);

  const updateNotificationsFromStorage = () => {
    try {
      const readIds: number[] = JSON.parse(
        localStorage.getItem('readNotificationIds') || '[]',
      );
      const updated = mockNoticeData
        .filter((n) => n.receiverId === userId)
        .map((n) => (readIds.includes(n.id) ? { ...n, isRead: true } : n));
      setNotifications(updated);
    } catch {
      const filtered = mockNoticeData.filter((n) => n.receiverId === userId);
      setNotifications(filtered);
    }
  };

  useEffect(() => {
    updateNotificationsFromStorage();
    window.addEventListener('focus', updateNotificationsFromStorage);
    return () =>
      window.removeEventListener('focus', updateNotificationsFromStorage);
  }, []);

  const markAsRead = (id: number) => {
    const readIds = JSON.parse(
      localStorage.getItem('readNotificationIds') || '[]',
    );
    if (!readIds.includes(id)) {
      readIds.push(id);
      localStorage.setItem('readNotificationIds', JSON.stringify(readIds));
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    }
  };

  return { notifications, markAsRead };
}
