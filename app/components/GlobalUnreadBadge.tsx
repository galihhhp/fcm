"use client";
import { useGlobalUnreadBadge } from "../hooks/useGlobalUnreadBadge";
import NotificationList from "./NotificationList";

const GlobalUnreadBadge: React.FC = () => {
  const { mounted, isLoggedIn, isOpen, setIsOpen, unreadCount, handleLogout } =
    useGlobalUnreadBadge();

  if (!mounted || !isLoggedIn) return null;

  return (
    <nav className="fixed top-6 right-8 z-50 flex items-center gap-3">
      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm shadow-sm border border-gray-200 transition"
        aria-label="Logout"
      >
        Logout
      </button>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-lg bg-[#131416] text-white transition-all duration-150 border border-gray-200 flex items-center justify-center"
          aria-label="Buka notifikasi"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div
              className="absolute right-0 mt-4 w-[380px] bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[480px] overflow-hidden transform transition-all duration-150 z-50 flex flex-col animate-fadein"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-100 bg-white flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  Notifikasi
                </h3>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 max-h-80 overflow-y-auto px-2 py-2">
                <NotificationList />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default GlobalUnreadBadge;
