import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, User, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";

import LoginPage from "./LoginPage"; 
// 💡 실제 파일 이름이 'VirtualFitting.tsx'일 가능성이 높아 경로를 수정했습니다.
// 만약 파일 이름이 다르다면 이 부분을 실제 파일명(확장자 제외)으로 매칭해 주세요.
import VirtualFittingPage from "./VirtualFitting"; 

const collections = [
  { id: 1, title: "New Cyber-\nActive\nCollection", image: "/Main-page_img/1.1.png" },
  { id: 2, title: "Minimalist\nKnitwear", image: "/Main-page_img/2.1.png" },
  { id: 3, title: "Raw Denim &\nClassic White", image: "/Main-page_img/3.1.png" },
  { id: 4, title: "Urban\nUtility", image: "/Main-page_img/4.1.png" },
];

export default function MainHomePage() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 로그인 상태 관리 (true: 로그인됨, false: 로그아웃됨)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setCurrentPage("search");
      setSearchOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- 네비게이션 바 --- */}
      <nav className="bg-white border-b border-gray-50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 py-6">
          <div 
            onClick={() => setCurrentPage("home")}
            className="text-2xl font-black tracking-tighter text-[#3D1E5F] cursor-pointer select-none" 
          >
            FITIN
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`transition-colors cursor-pointer ${searchOpen ? "text-[#3D1E5F]" : "hover:text-[#3D1E5F]"}`}
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={() => setCurrentPage("wishlist")}
              className={`transition-colors cursor-pointer ${currentPage === "wishlist" ? "text-[#3D1E5F]" : "hover:text-[#3D1E5F]"}`}
            >
              <Heart size={20} />
            </button>

            <button 
              onClick={() => setCurrentPage("mypage")}
              className={`transition-colors cursor-pointer ${currentPage === "mypage" ? "text-[#3D1E5F]" : "hover:text-[#3D1E5F]"}`}
            >
              <User size={20} />
            </button>

            <div 
              onClick={() => setCurrentPage("cart")}
              className="relative cursor-pointer group"
            >
              <ShoppingBag size={20} className={`transition-colors ${currentPage === "cart" ? "text-[#3D1E5F]" : "group-hover:text-[#3D1E5F]"}`} />
              <span className="absolute -top-2 -right-2 bg-[#3D1E5F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </div>

            <button 
              onClick={() => setCurrentPage("vf")}
              className={`ml-4 font-bold text-sm transition-all cursor-pointer ${currentPage === "vf" ? "text-[#3D1E5F] scale-110" : "hover:opacity-70"}`}
            >
              VF
            </button>
          </div>
        </div>

        {/* --- 검색창 --- */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="flex items-center gap-3 px-8 py-4">
                <Search size={18} className="text-[#3D1E5F] shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit} 
                  placeholder="검색어를 입력하세요 후 Enter..."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400 text-gray-800"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <X size={16} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- 컨텐츠 영역 --- */}
      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex h-[calc(100vh-80px)] overflow-hidden"
          >
            {collections.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                className="relative flex-1 h-full border-r border-gray-100 last:border-r-0 group cursor-pointer overflow-hidden"
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center px-8">
                  <h2 className="text-[15px] font-medium leading-tight text-gray-800 whitespace-pre-line">{item.title}</h2>
                </div>
              </motion.div>
            ))}
          </motion.main>
        )}

        {currentPage === "search" && (
          <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
            <h2 className="text-xl font-bold mb-4">" <span className="text-[#3D1E5F]">{searchQuery}</span> " 에 대한 검색 결과</h2>
          </motion.div>
        )}

        {currentPage === "wishlist" && (
          <motion.div key="wishlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
            <h2 className="text-xl font-bold mb-4">찜한 의류</h2>
          </motion.div>
        )}

        {currentPage === "cart" && (
          <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
            <h2 className="text-xl font-bold mb-4">장바구니</h2>
          </motion.div>
        )}

        {/* 가상 피팅룸 컴포넌트 렌더링 */}
        {currentPage === "vf" && (
          <motion.div key="vf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VirtualFittingPage />
          </motion.div>
        )}

        {/* 마이페이지 진입 시 로그인 체크 및 컴포넌트 분기 */}
        {currentPage === "mypage" && (
          <motion.div key="mypage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {isLoggedIn ? (
              <div className="p-8">
                <h2 className="text-xl font-bold mb-4">마이페이지</h2>
                <p className="text-gray-500">회원님 환영합니다! FITIN 가상 피팅룸 서비스를 마음껏 이용해 보세요.</p>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded cursor-pointer hover:bg-red-600 transition-colors"
                >
                  로그아웃 하기
                </button>
              </div>
            ) : (
              <div className="p-8 relative">
                {/* 💡 임시로 로그인을 성공시킬 수 있는 마스터 버튼을 상단에 살짝 배치했습니다. */}
                {/* 나중에 진짜 로그인이 작동하면 이 버튼 영역만 지우시면 됩니다. */}
                <div className="text-center mb-4">
                  <button 
                    onClick={() => { setIsLoggedIn(true); setCurrentPage("mypage"); }}
                    className="px-3 py-1 bg-[#3D1E5F] text-white text-xs rounded opacity-40 hover:opacity-100 cursor-pointer"
                  >
                    개발용 로그인 성공 패스 버튼
                  </button>
                </div>
                
                {/* 💡 에러 방지를 위해 속성(Prop)을 주지 않고 순수하게 호출합니다 */}
                <LoginPage />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}