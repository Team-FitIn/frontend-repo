import { motion } from "motion/react";
import { Heart, ShoppingBag, Sparkles, Flame } from "lucide-react";

const dummyProducts = [
  { id: 1, title: "Minimalist Knitwear Sweater", image: "/Main-page_img/2.1.png", category: "Knit" },
  { id: 2, title: "Raw Denim Casual Jacket", image: "/Main-page_img/3.1.png", category: "Denim" },
  { id: 3, title: "Classic White Overfit Shirt", image: "/Main-page_img/3.1.png", category: "Shirt" },
  { id: 4, title: "Urban Utility Cargo Pants", image: "/Main-page_img/4.1.png", category: "Pants" },
  { id: 5, title: "Cyber-Active Windbreaker", image: "/Main-page_img/1.1.png", category: "Active" },
  { id: 6, title: "Premium Knit Oversized Cardigan", image: "/Main-page_img/2.1.png", category: "Knit" },
];

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
}

interface SearchPageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlist: number[];
  onToggleWish: (product: Product) => void;
}

export default function SearchPage({ searchQuery, setSearchQuery, wishlist, onToggleWish }: SearchPageProps) {
  const filteredProducts = dummyProducts.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    return product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
  });

  const isWished = (id: number) => wishlist.includes(id);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-8 max-w-7xl mx-auto space-y-16">
      <div>
        <div className="mb-10 border-b border-gray-100 pb-5 flex items-baseline justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-gray-800">
            "<span className="text-[#3D1E5F] font-black"> {searchQuery.trim() || "전체"} </span>" 결과
          </h2>
          <span className="text-sm text-gray-400 font-medium">총 {filteredProducts.length}개의 아이템</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group cursor-pointer bg-white">
                <div className="relative aspect-[3/4] bg-[#F8F9FB] rounded-2xl overflow-hidden mb-4">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button onClick={() => onToggleWish(product)} className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-full shadow-sm transition-all cursor-pointer ${isWished(product.id) ? "bg-[#3D1E5F] text-white" : "bg-white/80 text-gray-400 hover:text-red-400"}`}>
                    <Heart size={16} fill={isWished(product.id) ? "white" : "none"} />
                  </button>
                </div>
                <div className="px-1">
                  <span className="text-[11px] font-bold text-[#3D1E5F] uppercase tracking-wider">{product.category}</span>
                  <h3 className="text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-[#3D1E5F] transition-colors mt-0.5">{product.title}</h3>
                  <div className="mt-2 flex items-center justify-end">
                    <button className="p-2 text-gray-400 hover:text-[#3D1E5F] transition-colors cursor-pointer"><ShoppingBag size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F8F9FB] rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-base font-medium">찾으시는 상품의 검색 결과가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-1">아래의 추천 키워드나 FITIN이 제안하는 트렌드를 둘러보세요!</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Knit", "Denim", "Active", "Shirt", "Pants"].map((tag) => (
                <button key={tag} onClick={() => setSearchQuery(tag)} className="px-4 py-2 bg-white border border-gray-200 text-xs font-semibold text-gray-600 rounded-full hover:border-[#3D1E5F] hover:text-[#3D1E5F] transition-all cursor-pointer shadow-sm">
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-[#3D1E5F]" />
              실시간 인기 가상 피팅 아이템
            </h3>
            <p className="text-xs text-gray-400">현재 유저들이 가장 많이 입혀본 베스트 의류입니다.</p>
          </div>
          <span className="text-xs font-bold text-[#3D1E5F] cursor-pointer hover:underline">전체보기 +</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {[...dummyProducts].reverse().slice(0, 4).map((product) => (
            <motion.div key={`hot-${product.id}`} whileHover={{ y: -4 }} className="group cursor-pointer bg-white">
              <div className="relative aspect-[3/4] bg-[#F8F9FB] rounded-2xl overflow-hidden mb-4">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Flame size={10} className="text-orange-500 fill-orange-500" /> HOT
                </div>
                <button onClick={() => onToggleWish(product)} className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-full shadow-sm transition-all cursor-pointer ${isWished(product.id) ? "bg-[#3D1E5F] text-white" : "bg-white/80 text-gray-400 hover:text-red-400"}`}>
                  <Heart size={16} fill={isWished(product.id) ? "white" : "none"} />
                </button>
              </div>
              <div className="px-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-sm font-medium text-gray-600 line-clamp-1 mt-0.5">{product.title}</h3>
                <div className="mt-2 flex items-center justify-end">
                  <button className="p-2 text-gray-400 hover:text-[#3D1E5F] transition-colors cursor-pointer"><ShoppingBag size={16} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}