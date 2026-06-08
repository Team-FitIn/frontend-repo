import { motion, AnimatePresence } from "motion/react";
import { Heart, ShoppingBag, X } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
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
};

export default function WishlistPage({ wishlist, onRemove }: WishlistPageProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#3D1E5F]" fill="#3D1E5F" />
            <h1 className="text-xl font-bold text-gray-800">위시리스트</h1>
            {wishlist.length > 0 && (
              <span className="text-[11px] font-bold text-white bg-[#3D1E5F] px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
              <Heart size={28} className="text-gray-200" />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-medium text-gray-500">아직 찜한 상품이 없어요</p>
              <p className="text-[12px] text-gray-400 mt-1">검색에서 마음에 드는 상품을 찜해보세요</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {wishlist.map((product) => {
                const style = categoryStyle[product.category];
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden ${style?.bg || "bg-gray-50"}`}>
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style?.dot || "bg-gray-300"}`} />
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{product.category}</p>
                      </div>
                      <p className="text-[13px] font-semibold text-gray-800 truncate">{product.title}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => console.log("장바구니 담기:", product)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#3D1E5F] text-white text-[11px] font-bold rounded-xl hover:bg-[#2D1545] transition-colors cursor-pointer"
                      >
                        <ShoppingBag size={13} />
                        담기
                      </button>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
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