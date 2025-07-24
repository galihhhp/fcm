"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "../firebase";
import Cookies from "js-cookie";
import { useNotificationStore } from "../store/notificationStore";

const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY!;

const API_BASE = "http://173.249.59.138/api";
const getTokenFromCookie = () => Cookies.get("access_token") || "";

export const useFCM = (): void => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const authToken = getTokenFromCookie();
    if (!authToken) return;

    const messaging = getMessaging(firebaseApp);
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey });
        if (token) {
          await fetch(`${API_BASE}/fcm/save-token`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ token }),
          });
        }
      }
    });

    const unsubscribe = onMessage(messaging, (_payload: any) => {
      useNotificationStore.getState().fetchNotifications();
    });
    return () => {
      unsubscribe();
    };
  }, [mounted]);
};

const FCMInitializer: React.FC = () => {
  useFCM();
  return null;
};

export default FCMInitializer;
