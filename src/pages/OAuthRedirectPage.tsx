import { useEffect } from "react";

interface OAuthRedirectPageProps {
  onLoginSuccess: () => void;
}

export default function OAuthRedirectPage({ onLoginSuccess }: OAuthRedirectPageProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("fitin_token", token);
      onLoginSuccess();
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#3D1E5F] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">로그인 처리 중...</p>
      </div>
    </div>
  );
}