import { motion } from "framer-motion";
import { Search, Heart, User, ShoppingBag } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "New Cyber-\nActive\nCollection",
    image: "/Main-page_img/1.1.png",
    align: "left",
  },
  {
    id: 2,
    title: "Minimalist\nKnitwear",
    image: "/Main-page_img/2.1.png",
    align: "left",
  },
  {
    id: 3,
    title: "Raw Denim &\nClassic White",
    image: "/Main-page_img/3.1.png",
    align: "left",
  },
  {
    id: 4,
    title: "Urban\nUtility",
    image: "/Main-page_img/4.1.png",
    align: "left",
  },
];

export default function MainHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* --- 네비게이션 바 --- */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-50">
        <div className="text-2xl font-black tracking-tighter text-[#3D1E5F]">
          FITIN
        </div>
        
        <div className="flex items-center gap-6">
          <button className="hover:text-[#3D1E5F] transition-colors"><Search size={20} /></button>
          <button className="hover:text-[#3D1E5F] transition-colors"><Heart size={20} /></button>
          <button className="hover:text-[#3D1E5F] transition-colors"><User size={20} /></button>
          <div className="relative cursor-pointer group">
            <ShoppingBag size={20} className="group-hover:text-[#3D1E5F] transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#3D1E5F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </div>
          <button className="ml-4 font-bold text-sm hover:opacity-70 transition-opacity">VF</button>
        </div>
      </nav>

      {/* --- 메인 컬렉션 섹션 (4분할) --- */}
      <main className="flex h-[calc(100vh-80px)] overflow-hidden">
        {collections.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex-1 h-full border-r border-gray-100 last:border-r-0 group cursor-pointer overflow-hidden"
          >
            {/* 배경 이미지 */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

            {/* 컬렉션 텍스트 */}
            <div className="absolute inset-0 flex items-center px-8">
              <h2 className="text-[15px] font-medium leading-tight text-gray-800 whitespace-pre-line">
                {item.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}