import { useState } from "react";

interface LoginPageProps {
  onLoginSuccess?: () => void;
  onNavigateToSignUp?: () => void;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
    <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
  </svg>
);

const KakaoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 0C4.032 0 0 3.281 0 7.333c0 2.613 1.729 4.906 4.335 6.198-.173.636-.619 2.356-.707 2.73-.106.446.165.44.346.32.145-.096 2.262-1.502 3.113-2.067.62.086 1.262.132 1.913.132 4.968 0 9-3.281 9-7.333S13.968 0 9 0z" fill="#000000"/>
  </svg>
);

export default function LoginPage({ onLoginSuccess, onNavigateToSignUp }: LoginPageProps) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = "https://explore-arrival-headgear.ngrok-free.dev/oauth2/authorization/google";
  };

  const handleKakaoLogin = () => {
    window.location.href = "https://explore-arrival-headgear.ngrok-free.dev/oauth2/authorization/kakao";
  };

  return (
    <div className="py-6 flex items-center justify-center bg-[#F8F9FB] px-4 rounded-3xl">
      <div className="w-full max-w-[440px] bg-white p-10 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-[#3D1E5F]">FITIN</h1>
          <p className="text-gray-500 text-sm font-medium">다시 만나서 반가워요!</p>
        </div>

        {/* 아이디 저장 */}
        <div className="flex items-center justify-between py-2 px-1 mb-6">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[#3D1E5F]"
            />
            <span className="text-[13px] text-gray-600">아이디 저장</span>
          </label>
          <div className="text-[13px] text-gray-400">
            <button type="button" className="hover:text-[#3D1E5F] transition-all cursor-pointer">아이디 찾기</button>
            <span className="mx-2 opacity-30">|</span>
            <button type="button" className="hover:text-[#3D1E5F] transition-all cursor-pointer">비밀번호 찾기</button>
          </div>
        </div>

        {/* 소셜 로그인 */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all bg-white gap-3 shadow-sm cursor-pointer"
          >
            <GoogleIcon />
            <span className="text-sm font-semibold text-gray-700">구글로 계속하기</span>
          </button>
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center py-4 bg-[#FEE500] rounded-2xl hover:opacity-90 transition-all gap-3 shadow-sm cursor-pointer"
          >
            <KakaoIcon />
            <span className="text-sm font-semibold text-[#191919]">카카오톡으로 계속하기</span>
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center text-sm">
          <span className="text-gray-400">아직 계정이 없으신가요?</span>{" "}
          <button
            onClick={onNavigateToSignUp}
            className="text-[#3D1E5F] font-bold hover:underline ml-1 cursor-pointer"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}