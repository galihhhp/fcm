"use client";
import { useState } from "react";
import { useNotificationStore } from "../store/notificationStore";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";

const PushNotificationForm: React.FC = () => {
  const sendNotification = useNotificationStore((s) => s.sendNotification);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    const ok = await sendNotification(title, body);
    setLoading(false);
    if (ok) {
      setSuccess(true);
      setTitle("");
      setBody("");
      setTimeout(() => setSuccess(false), 2000);
    } else {
      setError("Gagal mengirim notifikasi");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 px-8 py-10 space-y-8 rounded-2xl"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-black">Buat Notifikasi</h2>
            <p className="text-gray-500 text-sm">
              Isi form di bawah untuk membuat notifikasi baru
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-xs font-medium text-gray-600"
              >
                Judul
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Masukkan judul notifikasi"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="body"
                className="block text-xs font-medium text-gray-600"
              >
                Pesan
              </label>
              <Textarea
                id="body"
                name="body"
                placeholder="Masukkan pesan notifikasi..."
                rows={6}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#131416] text-white rounded-lg py-2 cursor-pointer font-bold text-sm shadow-sm transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Buat Notifikasi"}
            </Button>
            {(success || error) && (
              <div
                className={`text-center text-sm mt-2 rounded-lg px-4 py-2 ${
                  success
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-600"
                }`}
              >
                {success ? "Notifikasi berhasil dikirim" : error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PushNotificationForm;
