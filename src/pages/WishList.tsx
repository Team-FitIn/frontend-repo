import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

// =========================================================================
// 💡 [테스트용 더미 데이터] 유저가 하트를 눌러 위시리스트에 담아둔 상품들
// =========================================================================
const dummyWishItems = [
  { id: 1, title: "Minimalist Knitwear Sweater", price: "₩89,000", image: "/Main-page_img/2.1.png", category: "Knit" },
  { id: 4, title: "Urban Utility Cargo Pants", price: "₩98,000", image: "/Main-page_img/4.1.png", category: "Pants" },
];

export default function WishListPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      className="p-8 max-w-7xl mx-auto"
    >
      {/* 상단 헤더 구역 */}
      <div className="mb-10 border-b border-gray-100 pb-5 flex items-baseline justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-gray-800">
          위시리스트 <span className="text-[#3D1E5F] font-black">보관함</span>
        </h2>
        <span className="text-sm text-gray-400 font-medium">총 {dummyWishItems.length}개의 관심 상품</span>
      </div>

      {/* [케이스 A] 찜한 상품이 존재할 때 격자 뷰 */}
      {dummyWishItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {dummyWishItems.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -4 }}
              className="group cursor-pointer bg-white relative"
            >
              {/* 이미지 카드 영역 */}
              <div className="relative aspect-[3/4] bg-[#F8F9FB] rounded-2xl overflow-hidden mb-4">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                ></img>
                
                {/* 찜 해제 (삭제) 버튼 */}
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-red-500 hover:bg-white transition-all cursor-pointer">
                  <Heart size={16} className="fill-red-500" />
                </button>
              </div>

              {/* 상품 정보 영역 */}
              <div className="px-1 flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-[#3D1E5F] transition-colors mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-base font-bold text-gray-900 mt-1.5">{item.price}</p>
                </div>

                {/* 장바구니로 바로 이동시키는 쇼핑백 버튼 */}
                <button className="p-2.5 text-gray-400 hover:text-[#3D1E5F] border border-gray-100 group-hover:border-[#3D1E5F]/30 rounded-xl transition-all cursor-pointer ml-2 bg-white">
                  <ShoppingBag size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* [케이스 B] 위시리스트가 텅 비었을 때 예외 UI */}
      {dummyWishItems.length === 0 && (
        <div className="text-center py-32 bg-[#F8F9FB] rounded-3xl border border-dashed border-gray-200">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Heart size={20} />
          </div>
          <p className="text-gray-500 text-base font-medium">위시리스트가 비어 있습니다.</p>
          <p className="text-gray-400 text-sm mt-1">마음에 드는 상품의 하트를 눌러 보관함에 담아보세요!</p>
          <button className="mt-6 px-6 py-2.5 bg-[#3D1E5F] text-white text-xs font-bold rounded-full hover:bg-[#2A1442] transition-colors shadow-sm cursor-pointer">
            쇼핑하러 가기
          </button>
        </div>
      )}
    </motion.div>
  );
}