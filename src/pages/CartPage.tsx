import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, X, Plus, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: number;
  title: string;
  image: string;
  category: string;
  selectedSize: string;
  quantity: number;
  sizes: string[];
}

const INITIAL_CART: CartItem[] = [
  { id: 1, title: "Minimalist Knitwear Sweater", image: "/Main-page_img/2.1.png", category: "Knit", selectedSize: "M", quantity: 1, sizes: ["S", "M", "L", "XL"] },
  { id: 2, title: "Raw Denim Casual Jacket", image: "/Main-page_img/3.1.png", category: "Denim", selectedSize: "L", quantity: 1, sizes: ["S", "M", "L", "XL"] },
];

const categoryStyle: Record<string, { bg: string; text: string }> = {
  Knit:   { bg: "bg-rose-50",   text: "text-rose-400"   },
  Denim:  { bg: "bg-sky-50",    text: "text-sky-400"    },
  Shirt:  { bg: "bg-violet-50", text: "text-violet-400" },
  Pants:  { bg: "bg-blue-50",   text: "text-blue-400"   },
  Active: { bg: "bg-amber-50",  text: "text-amber-400"  },
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [openSize, setOpenSize] = useState<number | null>(null);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const updateSize = (id: number, size: string) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, selectedSize: size } : item));
    setOpenSize(null);
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingBag size={20} className="text-[#3D1E5F]" />
          <h1 className="text-xl font-bold text-gray-800">장바구니</h1>
          {cartItems.length > 0 && (
            <span className="text-[11px] font-bold text-white bg-[#3D1E5F] px-2 py-0.5 rounded-full">{totalCount}</span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
              <ShoppingBag size={28} className="text-gray-200" />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-medium text-gray-500">장바구니가 비어있어요</p>
              <p className="text-[12px] text-gray-400 mt-1">마음에 드는 상품을 담아보세요</p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {cartItems.map((item) => {
                  const style = categoryStyle[item.category];
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className={`w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden ${style?.bg || "bg-gray-50"}`}>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className={`text-[10px] font-bold uppercase tracking-wide ${style?.text || "text-gray-400"}`}>{item.category}</span>
                            <p className="text-[13px] font-semibold text-gray-800 truncate mt-0.5">{item.title}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0">
                            <X size={12} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 mt-2.5">
                          <div className="relative">
                            <button onClick={() => setOpenSize(openSize === item.id ? null : item.id)} className="flex items-center gap-1 px-2.5 py-1 border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-600 hover:border-[#3D1E5F]/40 transition-colors cursor-pointer">
                              {item.selectedSize}
                              <ChevronDown size={11} className={`transition-transform ${openSize === item.id ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {openSize === item.id && (
                                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-8 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
                                  {item.sizes.map(size => (
                                    <button key={size} onClick={() => updateSize(item.id, size)} className={`block w-full px-4 py-1.5 text-[11px] font-semibold text-left hover:bg-violet-50 hover:text-[#3D1E5F] transition-colors cursor-pointer ${item.selectedSize === size ? "bg-violet-50 text-[#3D1E5F]" : "text-gray-600"}`}>
                                      {size}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                              <Minus size={11} />
                            </button>
                            <span className="text-[12px] font-bold text-gray-700 w-5 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            <div className="mt-6 p-4 bg-white rounded-2xl border border-gray-100">
              <button className="w-full py-3 bg-[#3D1E5F] text-white text-[13px] font-bold rounded-xl hover:bg-[#2D1545] transition-colors cursor-pointer flex items-center justify-center gap-2">
                <ShoppingBag size={15} />
                주문하기 ({totalCount}개)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}