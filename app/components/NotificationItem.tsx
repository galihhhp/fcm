"use client";
import { useNotificationStore } from "../store/notificationStore";

export type Notification = {
  id: string | number;
  title: string;
  body: string;
  isRead: boolean;
  timestamp?: string;
  createdAt?: string;
};

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const updateNotification = useNotificationStore((s) => s.updateNotification);

  const handleClick = async () => {
    if (notification.isRead) return;
    updateNotification(notification.id as string);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <li
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-pressed={!notification.isRead}
      className={`group cursor-pointer px-5 py-4 rounded-2xl border flex items-center justify-between gap-3 transition-all duration-150 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        notification.isRead
          ? "opacity-70 border-gray-100"
          : "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
      }`}
      aria-label={notification.title}
      role="listitem"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900 truncate">
            {notification.title}
          </span>
          {!notification.isRead && (
            <button
              type="button"
              onClick={() => updateNotification(notification.id as string)}
              className="mt-1 cursor-pointer px-3 py-1 rounded-md bg-[#131416] text-white text-xs font-semibold"
            >
              Tandai sudah dibaca
            </button>
          )}
        </div>
        <div className="text-xs text-gray-600 truncate mb-1">
          {notification.body}
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1 mb-2">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {new Date(
            notification.timestamp || notification.createdAt || ""
          ).toLocaleString()}
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
