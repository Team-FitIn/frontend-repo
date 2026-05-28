import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import axios from "axios";

// ─── 소셜 아이콘 컴포넌트 ───
export const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
    <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
  </svg>
);

export const KakaoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M9 0C4.032 0 0 3.281 0 7.333c0 2.613 1.729 4.906 4.335 6.198-.173.636-.619 2.356-.707 2.73-.106.446.165.44.346.32.145-.096 2.262-1.502 3.113-2.067.62.086 1.262.132 1.913.132 4.968 0 9-3.281 9-7.333S13.968 0 9 0z" fill="#000000"/>
  </svg>
);

interface LoginPageProps {
  onLoginSuccess?: () => void;
  onNavigateToSignUp: () => void; // 회원가입 창으로 가기 위한 가이드 함수
}

export default function LoginPage({ onLoginSuccess, onNavigateToSignUp }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const SPRING_API_URL = "https://urethane-trench-disdain.ngrok-free.dev/api/auth";

  const handleKakaoLogin = () => {
    window.location.href = "https://urethane-trench-disdain.ngrok-free.dev/oauth2/authorization/kakao";
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://urethane-trench-disdain.ngrok-free.dev/oauth2/authorization/google";
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(`${SPRING_API_URL}/login`, { username, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem("fitin_token", token);
        if (onLoginSuccess) onLoginSuccess();
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "아이디 또는 비밀번호가 일치하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 flex items-center justify-center bg-[#F8F9FB] px-4 rounded-3xl">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[460px] bg-white p-10 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-[#3D1E5F]">FITIN</h1>
          <p className="text-gray-500 text-sm font-medium">다시 만나서 반가워요!</p>
        </div>

        {errorMessage && <div className="mb-5 p-4 bg-red-50 text-xs font-semibold text-red-600 rounded-xl border border-red-100">{errorMessage}</div>}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-gray-700 ml-1">아이디</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#3D1E5F] transition-colors" />
              <input type="text" required placeholder="아이디를 입력해주세요" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-[#F1F4F9]/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D1E5F]/10 focus:border-[#3D1E5F] transition-all text-sm" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-gray-700 ml-1">비밀번호</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#3D1E5F] transition-colors" />
              <input type="password" required placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-[#F1F4F9]/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D1E5F]/10 focus:border-[#3D1E5F] transition-all text-sm" />
            </div>
          </div>

          <motion.button whileHover={{ y: -2, backgroundColor: "#2D1545" }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-4 bg-[#3D1E5F] text-white rounded-2xl font-bold shadow-xl shadow-purple-900/20 transition-all mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
            {loading ? "로그인 중..." : "로그인"} <LogIn className="size-5" />
          </motion.button>
        </form>

        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 border-t border-gray-100 top-1/2"></div>
          <span className="relative bg-white px-4 text-gray-400 text-xs font-medium">또는 소셜 계정으로 계속하기</span>
        </div>

        <div className="space-y-3">
          <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all bg-white gap-3 shadow-sm cursor-pointer"><GoogleIcon /><span className="text-sm font-semibold text-gray-700">구글로 계속하기</span></button>
          <button type="button" onClick={handleKakaoLogin} className="w-full flex items-center justify-center py-4 bg-[#FEE500] rounded-2xl hover:opacity-90 transition-all gap-3 shadow-sm cursor-pointer"><KakaoIcon /><span className="text-sm font-semibold text-[#191919]">카카오톡으로 계속하기</span></button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm">
          <span className="text-gray-400">아직 계정이 없으신가요?</span>{" "}
          {/* 💡 [수정 완료] type="button" 속성을 명시하고 onClick 시 부모 프롭스를 완벽히 타도록 세팅했습니다. */}
          <button 
            type="button" 
            onClick={onNavigateToSignUp} 
            className="text-[#3D1E5F] font-bold hover:underline ml-1 cursor-pointer"
          >
            회원가입
          </button>
        </div>
      </motion.div>
    </div>
  );
}