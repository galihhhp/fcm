"use client";
import { useLogin } from "../hooks/useLogin";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 px-8 py-10 space-y-6 rounded-2xl"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-black">Masuk</h1>
            <p className="text-gray-500 text-sm">
              Masukkan username dan password untuk mengakses akun Anda
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-xs font-medium text-gray-600"
              >
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-600"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#131416] cursor-pointer text-white rounded-lg py-2 font-bold text-sm shadow-sm transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-2 text-center text-sm mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
