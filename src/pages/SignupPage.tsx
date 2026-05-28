import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowLeft, ShieldCheck, User, Calendar, Phone } from "lucide-react";
import { useState } from "react";
import axios from "axios";
// 💡 깔끔함을 위해 LoginPage에 구현된 소셜 아이콘 컴포넌트를 그대로 빌려옵니다.
import { GoogleIcon, KakaoIcon } from "./LoginPage";

interface SignUpPageProps {
  onNavigateToLogin: () => void; // 다시 로그인 창으로 돌아가게 해주는 함수
}

export default function SignUpPage({ onNavigateToLogin }: SignUpPageProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: 약관동의 단계, 2: 정보입력 단계

  // ─── 회원가입 전송용 상태 변수 ───
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState<'M' | 'F' | 'N'>('N');
  const [phone, setPhone] = useState('');

  // ─── 약관 체크 박스 상태 ───
  const [termAll, setTermAll] = useState(false);
  const [termRequired, setTermRequired] = useState(false);
  const [termChoice1, setTermChoice1] = useState(false);
  const [termChoice2, setTermChoice2] = useState(false);
  const [termChoice3, setTermChoice3] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const SPRING_API_URL = "https://urethane-trench-disdain.ngrok-free.dev/api/auth";

  const handleAllCheck = (checked: boolean) => {
    setTermAll(checked); setTermRequired(checked); setTermChoice1(checked); setTermChoice2(checked); setTermChoice3(checked);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      // 스프링 부트 ngrok 서버망으로 원격 POST 요청
      await axios.post(`${SPRING_API_URL}/signup`, {
        username, password, email, name, birthdate, gender, phone
      });
      alert("FITIN 회원가입이 완료되었습니다! 로그인해 주세요.");
      onNavigateToLogin();
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      setErrorMessage(error.response?.data?.message || "이미 존재하는 아이디이거나 회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 flex items-center justify-center bg-[#F8F9FB] px-4 rounded-3xl">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[460px] bg-white p-10 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
        <button 
          onClick={() => { if (step === 2) setStep(1); else onNavigateToLogin(); }}
          className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-[#3D1E5F] mb-4 cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} /> {step === 2 ? "이전 단계로" : "로그인으로"}
        </button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-[#3D1E5F]">FITIN</h1>
          <p className="text-gray-500 text-sm font-medium">{step === 1 ? "이용약관에 동의해주세요." : "가입 정보를 입력해주세요."}</p>
        </div>

        {errorMessage && <div className="mb-5 p-4 bg-red-50 text-xs font-semibold text-red-600 rounded-xl border border-red-100">{errorMessage}</div>}

        {/* ─── 1단계: 약관 동의 구역 ─── */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="p-5 bg-[#F8F9FB] rounded-2xl border border-gray-100 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer pb-3 border-b border-gray-200 group">
                <input type="checkbox" checked={termAll} onChange={(e) => handleAllCheck(e.target.checked)} className="mt-0.5 w-5 h-5 rounded-full border-gray-300 accent-[#3D1E5F]" />
                <div><span className="text-sm font-bold text-gray-800">전체 동의하기</span><p className="text-[11px] text-gray-400 mt-0.5">실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트·혜택 정보 수신(선택) 동의를 포함합니다.</p></div>
              </label>

              <div className="flex items-center justify-between text-sm pt-1"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={termRequired} onChange={(e) => setTermRequired(e.target.checked)} className="w-4 h-4 accent-[#3D1E5F]" /><span className="text-gray-600"><span className="text-green-500 font-bold">[필수]</span> 네이버 이용약관</span></label><button className="text-xs text-gray-400 hover:underline">보기</button></div>
              <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={termChoice1} onChange={(e) => setTermChoice1(e.target.checked)} className="w-4 h-4 accent-[#3D1E5F]" /><span className="text-gray-500">[선택] 실명 인증된 아이디로 가입</span></label></div>
              <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={termChoice2} onChange={(e) => setTermChoice2(e.target.checked)} className="w-4 h-4 accent-[#3D1E5F]" /><span className="text-gray-500">[선택] 위치기반서비스 이용약관</span></label><button className="text-xs text-gray-400 hover:underline">보기</button></div>
              <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={termChoice3} onChange={(e) => setTermChoice3(e.target.checked)} className="w-4 h-4 accent-[#3D1E5F]" /><span className="text-gray-500">[선택] 개인정보 수집 및 이용</span></label><button className="text-xs text-gray-400 hover:underline">보기</button></div>
            </div>

            <button
              onClick={() => { if (termRequired) setStep(2); else alert("필수 이용약관에 동의하셔야 합니다."); }}
              className="w-full py-4 bg-[#3D1E5F] text-white rounded-2xl font-bold shadow-md hover:bg-[#2A1442] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              다음 단계로 <ShieldCheck size={18} />
            </button>

            <div className="relative my-8 flex items-center justify-center"><div className="absolute inset-0 border-t border-gray-100 top-1/2"></div><span className="relative bg-white px-4 text-gray-400 text-xs font-medium">또는 소셜 간편 가입</span></div>
            <div className="space-y-3">
              <button type="button" onClick={() => window.location.href = "https://urethane-trench-disdain.ngrok-free.dev/oauth2/authorization/google"} className="w-full flex items-center justify-center py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 bg-white gap-3 shadow-sm cursor-pointer"><GoogleIcon /><span className="text-sm font-semibold text-gray-700">구글로 가입</span></button>
              <button type="button" onClick={() => window.location.href = "https://urethane-trench-disdain.ngrok-free.dev/oauth2/authorization/kakao"} className="w-full flex items-center justify-center py-4 bg-[#FEE500] rounded-2xl hover:opacity-90 gap-3 shadow-sm cursor-pointer"><KakaoIcon /><span className="text-sm font-semibold text-[#191919]">카카오로 가입</span></button>
            </div>
          </div>
        )}

        {/* ─── 2단계: 상세 인적 사항 입력 구역 ─── */}
        {step === 2 && (
          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/30 divide-y divide-gray-100">
              <div className="relative p-3 flex items-center bg-white"><Mail className="text-gray-400 mx-2 size-5 shrink-0" /><input type="text" required placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-2 py-2 outline-none text-sm bg-transparent" /><span className="text-xs font-medium text-gray-400 pr-2 whitespace-nowrap">@fitin.com</span></div>
              <div className="relative p-3 flex items-center bg-white"><Lock className="text-gray-400 mx-2 size-5 shrink-0" /><input type="password" required placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-2 py-2 outline-none text-sm bg-transparent" /></div>
              <div className="relative p-3 flex items-center bg-white"><Mail className="text-gray-300 mx-2 size-5 shrink-0" /><input type="email" placeholder="[선택] 이메일주소 (본인 확인용)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-2 py-2 outline-none text-sm bg-transparent placeholder:text-gray-400" /></div>
            </div>

            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white divide-y divide-gray-100">
              <div className="p-3 flex items-center"><User className="text-gray-400 mx-2 size-5 shrink-0" /><input type="text" required placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-2 py-2 outline-none text-sm bg-transparent" /></div>
              <div className="p-3 flex items-center"><Calendar className="text-gray-400 mx-2 size-5 shrink-0" /><input type="text" required maxLength={8} placeholder="생년월일 8자리 (ex: 20020417)" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full px-2 py-2 outline-none text-sm bg-transparent" /></div>
              <div className="flex h-12 text-sm text-gray-500 font-medium bg-gray-50/50">
                <button type="button" onClick={() => setGender('M')} className={`flex-1 transition-all ${gender === 'M' ? 'bg-[#3D1E5F] text-white font-bold' : 'hover:bg-gray-100'}`}>남자</button>
                <button type="button" onClick={() => setGender('F')} className={`flex-1 border-x border-gray-100 transition-all ${gender === 'F' ? 'bg-[#3D1E5F] text-white font-bold' : 'hover:bg-gray-100'}`}>여자</button>
                <button type="button" onClick={() => setGender('N')} className={`flex-1 transition-all ${gender === 'N' ? 'bg-[#3D1E5F] text-white font-bold' : 'hover:bg-gray-100'}`}>선택안함</button>
              </div>
            </div>
            
            <p className="text-[11px] text-green-600 font-medium ml-1">※ 신분증 상의 정보와 정확히 일치해야 실명인증이 가능합니다.</p>

            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white divide-y divide-gray-100 mt-2">
              <div className="p-3 bg-gray-50/40 text-gray-600 text-sm font-semibold px-5 flex justify-between items-center"><span>대한민국 +82</span><span className="text-xs text-gray-400">▼</span></div>
              <div className="p-3 flex items-center"><Phone className="text-gray-400 mx-2 size-5 shrink-0" /><input type="tel" required placeholder="휴대전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-2 py-2 outline-none text-sm bg-transparent" /></div>
            </div>

            <motion.button whileHover={{ y: -2, backgroundColor: "#2D1545" }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-4 bg-[#3D1E5F] text-white rounded-2xl font-bold shadow-xl shadow-purple-900/20 transition-all mt-6 flex items-center justify-center gap-2 cursor-pointer">
              {loading ? "가입 처리 중..." : "회원가입 완료"} <UserPlus size={18} />
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}