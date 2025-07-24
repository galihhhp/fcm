import { create } from "zustand";
import { Notification } from "../components/NotificationItem";
import Cookies from "js-cookie";

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string;
  fetchNotifications: (page?: number, limit?: number) => Promise<void>;
  updateNotification: (id: string) => void;
  sendNotification: (title: string, body: string) => Promise<boolean>;
  unreadCount: number;
}

const API_BASE = "http://173.249.59.138/api";
const getToken = () => {
  const token = Cookies.get("access_token");
  return token || "";
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  loading: false,
  error: "",
  fetchNotifications: async (page = 1, limit = 20) => {
    set({ loading: true, error: "" });
    try {
      const token = getToken();
      if (!token) {
        set({ error: "Token tidak ditemukan" });
        return;
      }
      const res = await fetch(
        `${API_BASE}/notification?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (res.status === 401) {
        set({ error: "Sesi login kamu sudah habis, silakan login ulang." });
        return;
      }
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      const result = await res.json();
      if (!result) {
        set({ notifications: [], error: "" });
        return;
      }
      const notifs = result.data.notification || [];
      set({ notifications: notifs, error: "" });
    } catch (err: any) {
      set({ error: `Gagal mengambil notifikasi: ${err.message}` });
    } finally {
      set({ loading: false });
    }
  },
  updateNotification: (id: string) => {
    fetch(`${API_BASE}/notification/mark-read/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(() => {
      set((state) => ({
        notifications: state.notifications.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        ),
      }));
    });
  },
  sendNotification: async (title: string, body: string) => {
    try {
      const res = await fetch(`${API_BASE}/notification/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, body }),
      });
      if (!res.ok) throw new Error("Gagal mengirim notifikasi");
      await get().fetchNotifications();
      return true;
    } catch {
      return false;
    }
  },
  get unreadCount() {
    console.log(get().notifications);
    return get().notifications.filter((n) => !n.isRead).length;
  },
}));
