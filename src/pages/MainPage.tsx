import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, User, X } from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";

import LoginPage from "./LoginPage";
import SearchPage from "./SearchPage";
import SignUpPage from "./SignUpPage";
import VirtualFittingPage from "./VirtualFittingPage";
import WishlistPage from "./WishlistPage";
import MyPage from "./MyPage";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  originalLink?: string;
}

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("fitin_token")
  );
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setCurrentPage("search");
      setSearchOpen(false);
    }
  };

  const handleToggleWish = (product: Product) => {
    setWishlistItems(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleRemoveWish = (id: number) => {
    setWishlistItems(prev => prev.filter(p => p.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("fitin_token");
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 py-6">
          <div
            onClick={() => { setCurrentPage("home"); setSearchQuery(""); }}
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
              className={`transition-colors cursor-pointer relative ${currentPage === "wishlist" ? "text-[#3D1E5F]" : "hover:text-[#3D1E5F]"}`}
            >
              <Heart size={20} fill={currentPage === "wishlist" ? "#3D1E5F" : "none"} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-400 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentPage("mypage")}
              className={`transition-colors cursor-pointer ${currentPage === "mypage" ? "text-[#3D1E5F]" : "hover:text-[#3D1E5F]"}`}
            >
              <User size={20} />
            </button>

            <button
              onClick={() => setCurrentPage("vf")}
              className={`ml-4 font-bold text-sm transition-all cursor-pointer ${currentPage === "vf" ? "text-[#3D1E5F] scale-110" : "hover:opacity-70"}`}
            >
              VF
            </button>
          </div>
        </div>

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
          <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SearchPage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              wishlist={wishlistItems.map(p => p.id)}
              onToggleWish={handleToggleWish}
            />
          </motion.div>
        )}

        {currentPage === "wishlist" && (
          <motion.div key="wishlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WishlistPage
              wishlist={wishlistItems}
              onRemove={handleRemoveWish}
            />
          </motion.div>
        )}

        {currentPage === "vf" && (
          <motion.div key="vf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VirtualFittingPage />
          </motion.div>
        )}

        {currentPage === "mypage" && (
          <motion.div key="mypage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {isLoggedIn ? (
              <MyPage
                onNavigateToWishlist={() => setCurrentPage("wishlist")}
                onNavigateToVF={() => setCurrentPage("vf")}
                onLogout={handleLogout}
              />
            ) : (
              <div className="p-8">
                <LoginPage
                  onLoginSuccess={() => { setIsLoggedIn(true); setCurrentPage("mypage"); }}
                  onNavigateToSignUp={() => setCurrentPage("signup")}
                />
              </div>
            )}
          </motion.div>
        )}

        {currentPage === "signup" && (
          <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="p-8">
              <SignUpPage onNavigateToLogin={() => setCurrentPage("mypage")} />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}