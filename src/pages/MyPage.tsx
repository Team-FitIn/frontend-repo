import { motion } from "motion/react";
import { User, Heart, Sparkles, ChevronRight, LogOut, Edit2, X, Check } from "lucide-react";
import { useState } from "react";

interface MyPageProps {
  onNavigateToWishlist?: () => void;
  onNavigateToVF?: () => void;
  onLogout?: () => void;
}

const MOCK_USER = {
  name: "송인석",
  email: "inseok@fitin.com",
  joinDate: "2024.03.15",
};

const MOCK_FITTING_HISTORY = [
  { id: 1, garment: "WAFFLE HENLEY S/S T-SHIRT [GRAPHITE]", date: "2025.06.07" },
  { id: 2, garment: "백 포인트 아뜰리에 오버핏 반팔 티_4COLOR", date: "2025.06.06" },
  { id: 3, garment: "로드 스피드 반팔 티셔츠", date: "2025.06.05" },
  { id: 4, garment: "컷오프 레이어드 슬럽 티셔츠 GREY", date: "2025.06.04" },
  { id: 5, garment: "쿠어 링거 반팔티 (블랙)", date: "2025.06.03" },
];

export default function MyPage({ onNavigateToWishlist, onNavigateToVF, onLogout }: MyPageProps) {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(MOCK_USER);
  const [editForm, setEditForm] = useState(MOCK_USER);

  const displayedHistory = showAllHistory ? MOCK_FITTING_HISTORY : MOCK_FITTING_HISTORY.slice(0, 3);

  const handleSaveEdit = () => {
    // TODO: 백엔드 연동 시 api.patch("/api/member", editForm) 호출
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-5">

        {/* 프로필 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#3D1E5F]/10 flex items-center justify-center flex-shrink-0">
            <User size={24} className="text-[#3D1E5F]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-gray-800">{userInfo.name}</p>
            <p className="text-[12px] text-gray-400 mt-0.5">{userInfo.email}</p>
            <p className="text-[10px] text-gray-300 mt-0.5">가입일 {userInfo.joinDate}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            로그아웃
          </button>
        </motion.div>

        {/* 바로가기 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={onNavigateToWishlist}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-2 hover:border-[#3D1E5F]/20 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <Heart size={18} className="text-rose-400" fill="#fb7185" />
            </div>
            <p className="text-[11px] font-semibold text-gray-600">찜 목록</p>
          </button>
          <button
            onClick={onNavigateToVF}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-2 hover:border-[#3D1E5F]/20 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Sparkles size={18} className="text-[#3D1E5F]" />
            </div>
            <p className="text-[11px] font-semibold text-gray-600">가상 피팅</p>
          </button>
        </motion.div>

        {/* 피팅 히스토리 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-[#3D1E5F]" />
              <h2 className="text-[13px] font-bold text-gray-800">피팅 히스토리</h2>
            </div>
            <button
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="flex items-center gap-0.5 text-[11px] text-gray-400 hover:text-[#3D1E5F] cursor-pointer transition-colors"
            >
              {showAllHistory ? "접기" : "전체보기"}
              <ChevronRight size={13} className={`transition-transform ${showAllHistory ? "rotate-90" : ""}`} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {displayedHistory.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={14} className="text-[#3D1E5F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800 truncate">{item.garment}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 내 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <User size={15} className="text-[#3D1E5F]" />
              <h2 className="text-[13px] font-bold text-gray-800">내 정보</h2>
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button onClick={handleCancelEdit} className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                  <X size={13} /> 취소
                </button>
                <button onClick={handleSaveEdit} className="flex items-center gap-1 text-[11px] text-[#3D1E5F] font-bold hover:text-[#2D1545] cursor-pointer transition-colors">
                  <Check size={13} /> 저장
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#3D1E5F] cursor-pointer transition-colors"
              >
                <Edit2 size={13} /> 수정
              </button>
            )}
          </div>
          <div className="divide-y divide-gray-50">
            {isEditing ? (
              <>
                <div className="flex items-center justify-between px-5 py-3.5">
                  <p className="text-[11px] text-gray-400 w-16">이름</p>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="flex-1 text-[12px] text-gray-700 text-right outline-none border-b border-[#3D1E5F]/30 pb-0.5 bg-transparent"
                  />
                </div>
                <div className="flex items-center justify-between px-5 py-3.5">
                  <p className="text-[11px] text-gray-400 w-16">이메일</p>
                  <input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="flex-1 text-[12px] text-gray-700 text-right outline-none border-b border-[#3D1E5F]/30 pb-0.5 bg-transparent"
                  />
                </div>
                <div className="flex items-center justify-between px-5 py-3.5">
                  <p className="text-[11px] text-gray-400 w-16">가입일</p>
                  <p className="text-[12px] text-gray-400">{userInfo.joinDate}</p>
                </div>
              </>
            ) : (
              <>
                {[
                  { label: "이름", value: userInfo.name },
                  { label: "이메일", value: userInfo.email },
                  { label: "가입일", value: userInfo.joinDate },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                    <p className="text-[11px] text-gray-400">{row.label}</p>
                    <p className="text-[12px] font-semibold text-gray-700">{row.value}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}