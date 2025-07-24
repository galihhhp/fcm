import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const API_BASE = "http://173.249.59.138/api";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login gagal");
      const data = await res.json();
      const token = data.data.accessToken;
      if (token) {
        Cookies.set("access_token", token, { path: "/", expires: 10 / 24 });
        router.push("/");
        setTimeout(() => window.location.reload(), 200);
      }
    } catch (err) {
      setError("Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
}
