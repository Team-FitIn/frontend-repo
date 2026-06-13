import { motion, AnimatePresence } from "motion/react";
import { Heart, ShoppingBag, Sparkles, Flame, Search } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api/axios";

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  brand: string;
  originalLink?: string;
}

interface SearchPageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlist: number[];
  onToggleWish: (product: Product) => void;
}

export default function SearchPage({ searchQuery, setSearchQuery, wishlist, onToggleWish }: SearchPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/garments")
      .then((res) => {
        const data = res.data.map((g: {
          id: number;
          name: string;
          brand: string;
          categoryMain: string;
          imageUrl: string;
          originalLink?: string;
        }) => ({
          id: g.id,
          title: g.name,
          image: g.imageUrl,
          category: g.categoryMain,
          brand: g.brand,
          originalLink: g.originalLink,
        }));
        setProducts(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    );
  });

  const isWished = (id: number) => wishlist.includes(id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-8 max-w-7xl mx-auto space-y-16"
    >
      {/* 검색 결과 */}
      <div>
        <div className="mb-10 border-b border-gray-100 pb-5 flex items-baseline justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-gray-800">
            "<span className="text-[#3D1E5F] font-black"> {searchQuery.trim() || "전체"} </span>" 결과
          </h2>
          <span className="text-sm text-gray-400 font-medium">총 {filteredProducts.length}개의 아이템</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#3D1E5F] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group cursor-pointer bg-white"
              >
                <div className="relative aspect-[3/4] bg-[#F8F9FB] rounded-2xl overflow-hidden mb-4">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button
                    onClick={() => onToggleWish(product)}
                    className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-full shadow-sm transition-all cursor-pointer ${
                      isWished(product.id) ? "bg-[#3D1E5F] text-white" : "bg-white/80 text-gray-400 hover:text-red-400"
                    }`}
                  >
                    <Heart size={16} fill={isWished(product.id) ? "white" : "none"} />
                  </button>
                </div>
                <div className="px-1">
                  <span className="text-[11px] font-bold text-[#3D1E5F] uppercase tracking-wider">{product.brand}</span>
                  <h3 className="text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-[#3D1E5F] transition-colors mt-0.5">{product.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    {product.originalLink && (
                      <a href={product.originalLink} target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-400 hover:text-[#3D1E5F] transition-colors">
                        무신사에서 보기 →
                      </a>
                    )}
                    <button className="p-2 text-gray-400 hover:text-[#3D1E5F] transition-colors cursor-pointer ml-auto">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F8F9FB] rounded-3xl border border-dashed border-gray-200">
            <Search size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-base font-medium">찾으시는 상품의 검색 결과가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-1">다른 키워드로 검색해보세요!</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["상의", "하의", "아우터", "티셔츠"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-white border border-gray-200 text-xs font-semibold text-gray-600 rounded-full hover:border-[#3D1E5F] hover:text-[#3D1E5F] transition-all cursor-pointer shadow-sm"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 인기 추천 */}
      {!loading && products.length > 0 && (
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
            {products.slice(0, 4).map((product) => (
              <motion.div
                key={`hot-${product.id}`}
                whileHover={{ y: -4 }}
                className="group cursor-pointer bg-white"
              >
                <div className="relative aspect-[3/4] bg-[#F8F9FB] rounded-2xl overflow-hidden mb-4">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Flame size={10} className="text-orange-500 fill-orange-500" /> HOT
                  </div>
                  <button
                    onClick={() => onToggleWish(product)}
                    className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-full shadow-sm transition-all cursor-pointer ${
                      isWished(product.id) ? "bg-[#3D1E5F] text-white" : "bg-white/80 text-gray-400 hover:text-red-400"
                    }`}
                  >
                    <Heart size={16} fill={isWished(product.id) ? "white" : "none"} />
                  </button>
                </div>
                <div className="px-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{product.brand}</span>
                  <h3 className="text-sm font-medium text-gray-600 line-clamp-1 mt-0.5">{product.title}</h3>
                  <div className="mt-2 flex items-center justify-end">
                    <button className="p-2 text-gray-400 hover:text-[#3D1E5F] transition-colors cursor-pointer">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}