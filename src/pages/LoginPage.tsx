import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { username, password, rememberMe });
  };

  const handleGoogleLogin = () => console.log('Google login');
  const handleKakaoLogin = () => console.log('Kakao login');

  return (
    <div className="size-full flex items-center justify-center bg-white">
      <div className="w-full max-w-[400px] px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: '#4A5B7E' }}>
            FITIN
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
          />

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-purple-900"
              />
              <span className="text-sm text-gray-700">아이디 저장</span>
            </label>
            <div className="text-sm text-gray-600">
              <a href="#" className="hover:underline">아이디 찾기</a>
              <span className="mx-1.5">|</span>
              <a href="#" className="hover:underline">비밀번호 찾기</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded font-medium text-white transition-colors"
            style={{ backgroundColor: '#3D1E5F' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2D1545'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3D1E5F'}
          >
            로그인
          </button>
        </form>

        <div className="mt-8 space-y-2.5">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
              <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
            </svg>
            구글로 계속하기
          </button>

          <button
            onClick={handleKakaoLogin}
            className="w-full py-3.5 rounded transition-opacity hover:opacity-90 flex items-center justify-center gap-2 text-sm font-medium"
            style={{ backgroundColor: '#FEE500', color: '#000000' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 0C4.032 0 0 3.281 0 7.333c0 2.613 1.729 4.906 4.335 6.198-.173.636-.619 2.356-.707 2.73-.106.446.165.44.346.32.145-.096 2.262-1.502 3.113-2.067.62.086 1.262.132 1.913.132 4.968 0 9-3.281 9-7.333S13.968 0 9 0z" fill="#000000"/>
            </svg>
            카카오톡으로 계속하기
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <button
            onClick={() => navigate('/membership')}
            className="text-[#3D1E5F] hover:underline font-medium"
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
}