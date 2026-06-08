import { motion } from "motion/react";
import { User, Heart, ShoppingBag, Package, Sparkles, ChevronRight, LogOut } from "lucide-react";

interface MyPageProps {
  onNavigateToWishlist?: () => void;
  onLogout?: () => void;
}

const MOCK_USER = {
  name: "송인석",
  email: "inseok@fitin.com",
  joinDate: "2024.03.15",
};

const MOCK_ORDERS = [
  { id: 1, title: "Minimalist Knitwear Sweater", price: "89,000", date: "2025.05.20", status: "배송완료" },
  { id: 2, title: "Raw Denim Casual Jacket", price: "129,000", date: "2025.06.01", status: "배송중" },
  { id: 3, title: "Urban Utility Cargo Pants", price: "98,000", date: "2025.06.05", status: "주문확인" },
];

const MOCK_FITTING_HISTORY = [
  { id: 1, garment: "Minimalist Knitwear Sweater", date: "2025.06.07" },
  { id: 2, garment: "Raw Denim Casual Jacket", date: "2025.06.06" },
  { id: 3, garment: "Classic White Overfit Shirt", date: "2025.06.05" },
];

const statusStyle: Record<string, string> = {
  "배송완료": "bg-green-50 text-green-500",
  "배송중":   "bg-blue-50 text-blue-500",
  "주문확인": "bg-amber-50 text-amber-500",
};

export default function MyPage({ onNavigateToWishlist, onLogout }: MyPageProps) {
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
            <p className="text-[15px] font-bold text-gray-800">{MOCK_USER.name}</p>
            <p className="text-[12px] text-gray-400 mt-0.5">{MOCK_USER.email}</p>
            <p className="text-[10px] text-gray-300 mt-0.5">가입일 {MOCK_USER.joinDate}</p>
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
          className="grid grid-cols-3 gap-3"
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
          <button className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-2 hover:border-[#3D1E5F]/20 hover:shadow-sm transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <ShoppingBag size={18} className="text-[#3D1E5F]" />
            </div>
            <p className="text-[11px] font-semibold text-gray-600">장바구니</p>
          </button>
          <button className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-2 hover:border-[#3D1E5F]/20 hover:shadow-sm transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Sparkles size={18} className="text-amber-400" />
            </div>
            <p className="text-[11px] font-semibold text-gray-600">피팅 기록</p>
          </button>
        </motion.div>

        {/* 주문 내역 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Package size={15} className="text-[#3D1E5F]" />
              <h2 className="text-[13px] font-bold text-gray-800">주문 내역</h2>
            </div>
            <button className="flex items-center gap-0.5 text-[11px] text-gray-400 hover:text-[#3D1E5F] cursor-pointer transition-colors">
              전체보기 <ChevronRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800 truncate">{order.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{order.date} · ₩{order.price}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusStyle[order.status] || "bg-gray-50 text-gray-400"}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 피팅 히스토리 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-[#3D1E5F]" />
              <h2 className="text-[13px] font-bold text-gray-800">피팅 히스토리</h2>
            </div>
            <button className="flex items-center gap-0.5 text-[11px] text-gray-400 hover:text-[#3D1E5F] cursor-pointer transition-colors">
              전체보기 <ChevronRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_FITTING_HISTORY.map((item) => (
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
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
            <User size={15} className="text-[#3D1E5F]" />
            <h2 className="text-[13px] font-bold text-gray-800">내 정보</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: "이름", value: MOCK_USER.name },
              { label: "이메일", value: MOCK_USER.email },
              { label: "가입일", value: MOCK_USER.joinDate },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                <p className="text-[11px] text-gray-400">{row.label}</p>
                <p className="text-[12px] font-semibold text-gray-700">{row.value}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-4">
            <button className="w-full py-2.5 border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-600 hover:border-[#3D1E5F]/30 hover:text-[#3D1E5F] transition-all cursor-pointer">
              정보 수정
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}