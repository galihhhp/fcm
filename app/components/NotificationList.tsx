"use client";
import { useEffect, useState } from "react";
import NotificationItem, { Notification } from "./NotificationItem";
import { useNotificationStore } from "../store/notificationStore";

const ErrorCard = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-6 text-red-600">
    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
    <span className="text-sm font-medium text-center mb-2">{message}</span>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
      >
        Coba lagi
      </button>
    )}
  </div>
);

const EmptyCard = () => (
  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 17h5l-5 5v-5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17h6m-6-4h6m-6-4h6M5 17h4m-4-4h4m-4-4h4"
        />
      </svg>
    </div>
    <span className="text-sm font-medium">Belum ada notifikasi</span>
    <span className="text-xs mt-1">Notifikasi baru akan muncul di sini</span>
  </div>
);

const SkeletonNotif = () => (
  <li className="px-5 py-4 rounded-2xl border flex items-center gap-3 bg-gray-100 animate-pulse mb-2">
    <div className="flex-1 min-w-0">
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-2" />
      <div className="h-3 w-2/3 bg-gray-200 rounded mb-1" />
      <div className="h-3 w-1/4 bg-gray-200 rounded" />
    </div>
  </li>
);

const NotificationList: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;
  const { notifications, loading, error, fetchNotifications } =
    useNotificationStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) fetchNotifications(page, limit);
  }, [mounted, page]);

  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead
  ).length;
  console.log(notifications);
  if (!mounted) return null;
  if (loading)
    return (
      <ul className="flex flex-col gap-2" aria-label="Skeleton notifikasi">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonNotif key={i} />
        ))}
      </ul>
    );
  if (error)
    return (
      <ErrorCard
        message={error}
        onRetry={() => fetchNotifications(page, limit)}
      />
    );
  if (!notifications.length) return <EmptyCard />;

  return (
    <>
      <ul className="flex flex-col gap-2" aria-label="Daftar notifikasi">
        {notifications.map((notif: Notification) => (
          <NotificationItem key={notif.id} notification={notif} />
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4 gap-2">
        <button
          className="px-4 py-1 rounded-lg border text-sm font-semibold bg-[#131416] text-white disabled:opacity-60"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Sebelumnya
        </button>
        <span className="text-xs text-gray-500">Halaman {page}</span>
        <button
          className="px-4 py-1 rounded-lg border text-sm font-semibold bg-[#131416] text-white disabled:opacity-60"
          onClick={() => setPage(page + 1)}
          disabled={notifications.length < limit}
        >
          Berikutnya
        </button>
      </div>
    </>
  );
};

export default NotificationList;
