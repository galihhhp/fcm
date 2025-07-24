import { useState, useEffect } from "react";
import { useNotificationStore } from "../components/../store/notificationStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function useGlobalUnreadBadge() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!Cookies.get("access_token"));
  }, []);
  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/login");
  };
  return {
    mounted,
    isLoggedIn,
    isOpen,
    setIsOpen,
    unreadCount,
    handleLogout,
  };
}
