import { motion } from "motion/react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useState } from "react";

interface SignUpPageProps {
  onNavigateToLogin?: () => void;
}

export default function SignUpPage({ onNavigateToLogin }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px] bg-white p-10 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
      >
        <div className="mb-10 text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">시작하기</h1>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            간편하게 가입하고 FITIN의 모든 서비스를 이용해보세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">이름</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#3D1E5F] transition-colors" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#F1F4F9]/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D1E5F]/10 focus:border-[#3D1E5F] transition-all placeholder:text-gray-400 text-sm"
                  placeholder="이름"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">이메일</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#3D1E5F] transition-colors" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#F1F4F9]/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D1E5F]/10 focus:border-[#3D1E5F] transition-all placeholder:text-gray-400 text-sm"
                  placeholder="example@fitin.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">비밀번호</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#3D1E5F] transition-colors" />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#F1F4F9]/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D1E5F]/10 focus:border-[#3D1E5F] transition-all placeholder:text-gray-400 text-sm"
                  placeholder="8자 이상의 영문/숫자 조합"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">비밀번호 확인</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#3D1E5F] transition-colors" />
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#F1F4F9]/50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3D1E5F]/10 focus:border-[#3D1E5F] transition-all placeholder:text-gray-400 text-sm"
                  placeholder="비밀번호 재입력"
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ y: -2, backgroundColor: "#2D1545" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-[#3D1E5F] text-white rounded-2xl font-bold shadow-xl shadow-purple-900/20 transition-all mt-12 flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            가입 완료하기
            <ArrowRight className="size-5" />
          </motion.button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-100 text-center text-sm">
          <span className="text-gray-400">이미 계정이 있으신가요?</span>{" "}
          <button
            onClick={onNavigateToLogin}
            className="text-[#3D1E5F] font-bold hover:underline ml-1.5 cursor-pointer"
          >
            로그인
          </button>
        </div>
      </motion.div>
    </div>
  );
}
