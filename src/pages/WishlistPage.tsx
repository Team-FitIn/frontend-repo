import { motion, AnimatePresence } from "motion/react";
import { Heart, X, ExternalLink } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  originalLink?: string;
}

interface WishlistPageProps {
  wishlist: Product[];
  onRemove: (id: number) => void;
}

const categoryStyle: Record<string, { bg: string; text: string; dot: string }> = {
  Knit:   { bg: "bg-rose-50",   text: "text-rose-400",   dot: "bg-rose-300"   },
  Denim:  { bg: "bg-sky-50",    text: "text-sky-400",    dot: "bg-sky-300"    },
  Shirt:  { bg: "bg-violet-50", text: "text-violet-400", dot: "bg-violet-300" },
  Pants:  { bg: "bg-blue-50",   text: "text-blue-400",   dot: "bg-blue-300"   },
  Active: { bg: "bg-amber-50",  text: "text-amber-400",  dot: "bg-amber-300"  },
  상의:   { bg: "bg-rose-50",   text: "text-rose-400",   dot: "bg-rose-300"   },
  하의:   { bg: "bg-sky-50",    text: "text-sky-400",    dot: "bg-sky-300"    },
  아우터: { bg: "bg-amber-50",  text: "text-amber-400",  dot: "bg-amber-300"  },
};

export default function WishlistPage({ wishlist, onRemove }: WishlistPageProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="flex items-center gap-2 mb-8">
          <Heart size={22} className="text-[#3D1E5F]" fill="#3D1E5F" />
          <h1 className="text-2xl font-bold text-gray-800">위시리스트</h1>
          {wishlist.length > 0 && (
            <span className="text-[12px] font-bold text-white bg-[#3D1E5F] px-2.5 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          )}
        </div>

        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
              <Heart size={36} className="text-gray-200" />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-medium text-gray-500">아직 찜한 상품이 없어요</p>
              <p className="text-[13px] text-gray-400 mt-1">검색에서 마음에 드는 상품을 찜해보세요</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {wishlist.map((product) => {
                const style = categoryStyle[product.category];
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* 이미지 - 클릭 시 무신사로 이동 */}
                    
                     <a href={product.originalLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[3/4] cursor-pointer"
                    >
                      <div className={`w-full h-full ${style?.bg || "bg-gray-50"}`}>
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(product.id); }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-gray-400 hover:text-red-400 hover:bg-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </a>

                    {/* 정보 */}
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${style?.dot || "bg-gray-300"}`} />
                        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{product.category}</p>
                      </div>
                      <p className="text-[14px] font-semibold text-gray-800 line-clamp-2 leading-snug">{product.title}</p>

                      
                       <a href={product.originalLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 w-full py-2.5 bg-[#3D1E5F] text-white text-[12px] font-bold rounded-xl hover:bg-[#2D1545] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink size={13} />
                        무신사에서 보기
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}