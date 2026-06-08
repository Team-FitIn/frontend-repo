import { motion, AnimatePresence } from "motion/react";
import { Search, X, ShoppingBag, Heart, Camera, RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

interface Garment {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  sizes: string[];
  imageUrl?: string;
}

interface FitItem {
  garment: Garment;
  selectedSize: string;
}

const MOCK_GARMENTS: Garment[] = [
  { id: 1, name: "클래식 화이트 셔츠", brand: "무신사 스탠다드", price: 89000, category: "상의", sizes: ["S", "M", "L", "XL"] },
  { id: 2, name: "슬림핏 블랙 팬츠", brand: "아더에러", price: 79000, category: "하의", sizes: ["S", "M", "L"] },
  { id: 3, name: "데님 재킷", brand: "리바이스", price: 129000, category: "아우터", sizes: ["S", "M", "L", "XL"] },
  { id: 4, name: "니트 스웨터", brand: "마르디 메크르디", price: 95000, category: "상의", sizes: ["S", "M", "L"] },
  { id: 5, name: "롱 울 코트", brand: "코스", price: 189000, category: "아우터", sizes: ["S", "M", "L"] },
  { id: 6, name: "캐주얼 티셔츠", brand: "반스", price: 39000, category: "상의", sizes: ["S", "M", "L", "XL"] },
  { id: 7, name: "와이드 데님", brand: "리바이스", price: 99000, category: "하의", sizes: ["S", "M", "L"] },
  { id: 8, name: "후드 집업", brand: "나이키", price: 85000, category: "아우터", sizes: ["M", "L", "XL"] },
  { id: 9, name: "린넨 셔츠", brand: "무신사 스탠다드", price: 55000, category: "상의", sizes: ["S", "M", "L", "XL"] },
  { id: 10, name: "슬랙스 팬츠", brand: "폴로", price: 119000, category: "하의", sizes: ["S", "M", "L", "XL"] },
  { id: 11, name: "오버핏 셔츠", brand: "커버낫", price: 69000, category: "상의", sizes: ["M", "L", "XL"] },
  { id: 12, name: "패딩 점퍼", brand: "노스페이스", price: 259000, category: "아우터", sizes: ["S", "M", "L", "XL"] },
];

const CATEGORIES = ["전체", "상의", "하의", "아우터"];
const formatPrice = (price: number) => price.toLocaleString("ko-KR") + "원";

const categoryStyle: Record<string, { bg: string; text: string; dot: string }> = {
  상의: { bg: "bg-rose-50", text: "text-rose-400", dot: "bg-rose-300" },
  하의: { bg: "bg-sky-50", text: "text-sky-400", dot: "bg-sky-300" },
  아우터: { bg: "bg-amber-50", text: "text-amber-400", dot: "bg-amber-300" },
};

export default function VirtualFittingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [fitList, setFitList] = useState<FitItem[]>([]);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [isFitting, setIsFitting] = useState(false);
  const [fitResult, setFitResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredGarments = MOCK_GARMENTS.filter((g) => {
    const matchCat = activeCategory === "전체" || g.category === activeCategory;
    const matchSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFitList = (garment: Garment) => {
    const exists = fitList.find((f) => f.garment.id === garment.id);
    if (exists) {
      setFitList((prev) => prev.filter((f) => f.garment.id !== garment.id));
    } else {
      setFitList((prev) => [...prev, { garment, selectedSize: garment.sizes[0] }]);
    }
  };

  const isInFitList = (id: number) => fitList.some((f) => f.garment.id === id);

  const handleCardClick = (garment: Garment) => {
    setSelectedGarment(garment);
    setSelectedSize(
      fitList.find((f) => f.garment.id === garment.id)?.selectedSize || garment.sizes[0]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    if (selectedGarment) {
      setFitList((prev) =>
        prev.map((f) =>
          f.garment.id === selectedGarment.id ? { ...f, selectedSize: size } : f
        )
      );
    }
  };

  const handleFaceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFaceImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleTryOn = async () => {
    if (!faceImage || fitList.length === 0) return;
    setIsFitting(true);
    setFitResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setFitResult(faceImage);
    setIsFitting(false);
  };

  const handleReset = () => {
    setFitResult(null);
    setFaceImage(null);
    setFitList([]);
    setSelectedGarment(null);
  };

  const canFit = !!faceImage && fitList.length > 0 && !isFitting;

  return (
    // 전체 비율: 왼쪽 0.3 : 가운데 1 : 오른쪽 0.7 → flex + basis로 구현
    <div className="flex h-[calc(100vh-73px)] overflow-hidden bg-[#FAFAFA]" style={{ fontFamily: "inherit" }}>

      {/* ── 왼쪽: Fitting List (30%) ── */}
      <aside style={{ flexBasis: "15%", minWidth: 0 }} className="bg-white border-r border-gray-100 flex flex-col overflow-hidden">
        <div className="px-3 pt-3 pb-2 border-b border-gray-50">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D1E5F]" />
            <p className="text-[10px] font-bold text-[#3D1E5F] tracking-widest uppercase">Fitting List</p>
          </div>
          <p className="text-[9px] text-gray-400 pl-3">선택한 의류 목록</p>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1.5">
          <AnimatePresence>
            {fitList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full gap-2"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <ShoppingBag size={16} className="text-gray-300" />
                </div>
                <p className="text-[9px] text-center leading-relaxed text-gray-400">
                  + 버튼을 눌러<br />피팅을 시작하세요
                </p>
              </motion.div>
            ) : (
              fitList.map((item) => {
                const style = categoryStyle[item.garment.category];
                return (
                  <motion.div
                    key={item.garment.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    onClick={() => handleCardClick(item.garment)}
                    className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all border ${
                      selectedGarment?.id === item.garment.id
                        ? "border-[#3D1E5F]/20 bg-violet-50/60"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${style?.bg || "bg-gray-100"}`}>
                      <span className={`text-[8px] font-bold ${style?.text || "text-gray-400"}`}>{item.garment.category}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold text-gray-700 truncate">{item.garment.name}</p>
                      <p className="text-[9px] text-gray-400">{item.selectedSize}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFitList(item.garment); }}
                      className="w-4 h-4 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <X size={8} className="text-gray-400" />
                    </button>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {fitList.length > 0 && (
          <div className="px-2 py-1.5 border-t border-gray-50">
            <p className="text-[9px] text-gray-400 text-center">{fitList.length}개 선택됨</p>
          </div>
        )}
      </aside>

      {/* ── 가운데: 의류 그리드 (50%) ── */}
      <main style={{ flexBasis: "50%", minWidth: 0 }} className="flex flex-col overflow-hidden border-r border-gray-100">

        <div className="bg-white border-b border-gray-100 px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="flex-1 flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 focus-within:border-[#3D1E5F]/30 transition-all">
            <Search size={11} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="브랜드, 상품명 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-[11px] bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}><X size={10} className="text-gray-400" /></button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  activeCategory === cat ? "bg-[#3D1E5F] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-[#3D1E5F] bg-gray-50 border border-gray-100 rounded-xl px-2 py-1.5 transition-colors cursor-pointer">
            <SlidersHorizontal size={10} /> 필터
          </button>
        </div>

        <div className="px-3 pt-2 pb-1 flex-shrink-0">
          <p className="text-[9px] text-gray-400">
            <span className="font-semibold text-gray-600">{filteredGarments.length}</span>개의 상품
          </p>
        </div>

        {/* 3열 그리드 */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <div className="grid grid-cols-3 gap-2">
            {filteredGarments.map((garment, i) => {
              const inFit = isInFitList(garment.id);
              const isSelected = selectedGarment?.id === garment.id;
              const style = categoryStyle[garment.category];
              return (
                <motion.div
                  key={garment.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => handleCardClick(garment)}
                  className={`group relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                    isSelected
                      ? "ring-1 ring-[#3D1E5F] shadow-sm shadow-violet-100/60"
                      : "border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  {/* 정사각형 이미지 */}
                  <div className={`aspect-square relative flex items-center justify-center ${style?.bg || "bg-gray-50"}`}>
                    {garment.imageUrl ? (
                      <img src={garment.imageUrl} alt={garment.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className={`text-xl font-black opacity-20 ${style?.text || "text-gray-400"}`}>
                        {garment.category[0]}
                      </span>
                    )}
                    <div className={`absolute top-1.5 left-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${style?.bg || "bg-gray-100"} border border-white/60`}>
                      <span className={`w-1 h-1 rounded-full ${style?.dot || "bg-gray-400"}`} />
                      <span className={`text-[8px] font-bold ${style?.text || "text-gray-500"}`}>{garment.category}</span>
                    </div>
                    {inFit && (
                      <div className="absolute top-1.5 right-1.5 bg-[#3D1E5F] text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">✓</div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFitList(garment); }}
                      className={`absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all shadow cursor-pointer ${
                        inFit
                          ? "bg-[#3D1E5F] text-white"
                          : "bg-white text-[#3D1E5F] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                      }`}
                    >
                      {inFit ? <X size={10} /> : <span className="text-sm font-light">+</span>}
                    </button>
                  </div>

                  <div className="px-2 py-1.5">
                    <p className="text-[9px] text-gray-400">{garment.brand}</p>
                    <p className="text-[10px] font-semibold text-gray-800 truncate">{garment.name}</p>
                    <p className="text-[10px] font-bold text-[#3D1E5F]">{formatPrice(garment.price)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredGarments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <Search size={22} className="text-gray-300" />
              <p className="text-sm text-gray-400">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      </main>

      {/* ── 오른쪽: 마네킹 + 상세정보 (35%) ── */}
      <aside style={{ flexBasis: "35%", minWidth: 0 }} className="bg-white flex flex-col overflow-hidden">

        <div className="flex flex-col items-center gap-2 p-3 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 relative flex-shrink-0">
          {(faceImage || fitList.length > 0) && (
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <RotateCcw size={10} className="text-gray-500" />
            </button>
          )}

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFaceUpload} className="hidden" />

          <button
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] rounded-lg transition-all cursor-pointer font-medium ${
              faceImage
                ? "bg-[#3D1E5F]/10 text-[#3D1E5F] border border-[#3D1E5F]/20"
                : "bg-white border border-dashed border-gray-300 text-gray-500 hover:border-[#3D1E5F] hover:text-[#3D1E5F]"
            }`}
          >
            <Camera size={11} />
            {faceImage ? "사진 변경" : "얼굴 사진 업로드"}
          </button>

          <div className="w-28 h-52 rounded-[32px] bg-white border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm">
            {isFitting ? (
              <div className="flex flex-col items-center gap-1.5">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} className="text-[#3D1E5F]">
                  <Sparkles size={18} />
                </motion.div>
                <p className="text-[9px] text-gray-400">피팅 중...</p>
              </div>
            ) : fitResult ? (
              <img src={fitResult} alt="피팅 결과" className="w-full h-full object-cover" />
            ) : faceImage ? (
              <img src={faceImage} alt="내 얼굴" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1.5 opacity-20">
                <div className="w-9 h-9 rounded-full bg-gray-400" />
                <div className="w-16 h-20 bg-gray-400 rounded-xl" />
                <div className="w-12 h-14 bg-gray-400 rounded-b-xl" />
              </div>
            )}
          </div>

          <motion.button
            whileHover={canFit ? { y: -1 } : {}}
            whileTap={canFit ? { scale: 0.97 } : {}}
            onClick={handleTryOn}
            disabled={!canFit}
            className={`w-full py-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              canFit
                ? "bg-[#3D1E5F] text-white shadow-md shadow-violet-200 cursor-pointer"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            <Sparkles size={11} />
            {isFitting ? "피팅 중..." : "가상 피팅 시작"}
          </motion.button>

          {!faceImage && (
            <p className="text-[9px] text-gray-400 text-center leading-relaxed">
              얼굴 사진 + 의류 선택 후<br />피팅을 시작할 수 있어요
            </p>
          )}
        </div>

        {/* 상세 정보 */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {selectedGarment ? (
              <motion.div
                key={selectedGarment.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle[selectedGarment.category]?.dot || "bg-gray-300"}`} />
                    <p className="text-[10px] text-gray-400 font-medium">{selectedGarment.brand}</p>
                  </div>
                  <p className="text-[14px] font-bold text-gray-800 leading-snug">{selectedGarment.name}</p>
                  <p className="text-[18px] font-black text-[#3D1E5F] mt-1.5">{formatPrice(selectedGarment.price)}</p>
                </div>

                <div>
                  <p className="text-[9px] text-gray-400 font-bold mb-2 uppercase tracking-wide">Size</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {selectedGarment.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSizeChange(s)}
                        className={`min-w-[30px] h-7 px-2 text-[11px] rounded-lg border font-semibold transition-all cursor-pointer ${
                          selectedSize === s
                            ? "border-[#3D1E5F] text-[#3D1E5F] bg-violet-50"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleFitList(selectedGarment)}
                    className={`w-full py-2.5 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isInFitList(selectedGarment.id)
                        ? "bg-red-50 text-red-400 border border-red-200"
                        : "bg-[#3D1E5F] text-white hover:bg-[#2D1545]"
                    }`}
                  >
                    {isInFitList(selectedGarment.id) ? <><X size={12} /> 피팅 제거</> : <>+ 피팅에 추가</>}
                  </button>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button className="py-2 rounded-xl text-[11px] border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-1 cursor-pointer">
                      <Heart size={11} /> 찜하기
                    </button>
                    <button className="py-2 rounded-xl text-[11px] border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-1 cursor-pointer">
                      <ShoppingBag size={11} /> 담기
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 py-8"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <ShoppingBag size={18} className="text-gray-300" />
                </div>
                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                  카드를 클릭하면<br />상세 정보가 표시됩니다
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </div>
  );
}
