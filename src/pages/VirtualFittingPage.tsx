import { motion, AnimatePresence } from "motion/react";
import { Search, X, ShoppingBag, Heart, Camera, RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import api from "../api/axios";

interface Garment {
  id: number;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  originalLink?: string;
  sizes: string[];
}

interface FitItem {
  garment: Garment;
  selectedSize: string;
}

const SIZES = ["S", "M", "L", "XL"];
const CATEGORIES = ["전체", "상의", "하의", "아우터"];

const categoryStyle: Record<string, { bg: string; text: string; dot: string }> = {
  상의: { bg: "bg-rose-50", text: "text-rose-400", dot: "bg-rose-300" },
  하의: { bg: "bg-sky-50", text: "text-sky-400", dot: "bg-sky-300" },
  아우터: { bg: "bg-amber-50", text: "text-amber-400", dot: "bg-amber-300" },
};

export default function VirtualFittingPage() {
  const [garments, setGarments] = useState<Garment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [fitList, setFitList] = useState<FitItem[]>([]);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [isFitting, setIsFitting] = useState(false);
  const [fitResult, setFitResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          name: g.name,
          brand: g.brand,
          category: g.categoryMain,
          imageUrl: g.imageUrl,
          originalLink: g.originalLink,
          sizes: SIZES,
        }));
        setGarments(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredGarments = garments.filter((g) => {
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
    setFaceFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setFaceImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleTryOn = async () => {
    if (!faceFile || fitList.length === 0) return;
    setIsFitting(true);
    setFitResult(null);

    try {
      const garmentId = fitList[0].garment.id;
      const formData = new FormData();
      formData.append("user_face", faceFile);

      const response = await api.post(
        `/api/v1/fitting/try-on/${garmentId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setFitResult(imageUrl);
    } catch (err) {
      console.error("피팅 실패:", err);
      alert("피팅에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsFitting(false);
    }
  };

  const handleReset = () => {
    setFitResult(null);
    setFaceImage(null);
    setFaceFile(null);
    setFitList([]);
    setSelectedGarment(null);
  };

  const canFit = !!faceFile && fitList.length > 0 && !isFitting;

  return (
    <div className="flex h-[calc(100vh-73px)] overflow-hidden bg-[#FAFAFA]">

      {/* ── 왼쪽: Fitting List + 의류 그리드 + 상세정보 ── */}
      <div style={{ flexBasis: "55%", minWidth: 0 }} className="flex flex-col overflow-hidden border-r border-gray-100">

        {/* 검색 + 필터 */}
        <div className="bg-white border-b border-gray-100 px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="flex-1 flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 focus-within:border-[#3D1E5F]/30 transition-all">
            <Search size={11} className="text-gray-400 flex-shrink-0" />
            <input type="text" placeholder="브랜드, 상품명 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 text-[11px] bg-transparent outline-none text-gray-700 placeholder:text-gray-400" />
            {searchQuery && <button onClick={() => setSearchQuery("")}><X size={10} className="text-gray-400" /></button>}
          </div>
          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${activeCategory === cat ? "bg-[#3D1E5F] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-[#3D1E5F] bg-gray-50 border border-gray-100 rounded-xl px-2 py-1.5 transition-colors cursor-pointer">
            <SlidersHorizontal size={10} /> 필터
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* Fitting List */}
          <aside className="w-[160px] min-w-[160px] border-r border-gray-100 bg-white flex flex-col overflow-hidden">
            <div className="px-3 pt-3 pb-2 border-b border-gray-50">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D1E5F]" />
                <p className="text-[10px] font-bold text-[#3D1E5F] tracking-widest uppercase">Fitting List</p>
              </div>
              <p className="text-[9px] text-gray-400 pl-3">선택한 의류</p>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1.5">
              <AnimatePresence>
                {fitList.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                      <ShoppingBag size={16} className="text-gray-300" />
                    </div>
                    <p className="text-[9px] text-center leading-relaxed text-gray-400">+ 버튼을 눌러<br />피팅을 시작하세요</p>
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
                          selectedGarment?.id === item.garment.id ? "border-[#3D1E5F]/20 bg-violet-50/60" : "border-transparent hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${style?.bg || "bg-gray-100"}`}>
                          <span className={`text-[8px] font-bold ${style?.text || "text-gray-400"}`}>{item.garment.category}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-gray-700 truncate">{item.garment.name}</p>
                          <p className="text-[9px] text-gray-400">{item.selectedSize}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleFitList(item.garment); }} className="w-4 h-4 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0">
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

          {/* 의류 그리드 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-3 pt-2 pb-1 flex-shrink-0">
              <p className="text-[9px] text-gray-400"><span className="font-semibold text-gray-600">{filteredGarments.length}</span>개의 상품</p>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-3">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 border-4 border-[#3D1E5F] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
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
                        className={`group relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${isSelected ? "ring-1 ring-[#3D1E5F] shadow-sm" : "border border-gray-100 hover:border-gray-200 hover:shadow-sm"}`}
                      >
                        <div className={`aspect-square relative flex items-center justify-center ${style?.bg || "bg-gray-50"}`}>
                          {garment.imageUrl ? (
                            <img src={garment.imageUrl} alt={garment.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className={`text-xl font-black opacity-20 ${style?.text || "text-gray-400"}`}>{garment.category[0]}</span>
                          )}
                          <div className={`absolute top-1.5 left-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${style?.bg || "bg-gray-100"} border border-white/60`}>
                            <span className={`w-1 h-1 rounded-full ${style?.dot || "bg-gray-400"}`} />
                            <span className={`text-[8px] font-bold ${style?.text || "text-gray-500"}`}>{garment.category}</span>
                          </div>
                          {inFit && <div className="absolute top-1.5 right-1.5 bg-[#3D1E5F] text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">✓</div>}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFitList(garment); }}
                            className={`absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all shadow cursor-pointer ${inFit ? "bg-[#3D1E5F] text-white" : "bg-white text-[#3D1E5F] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"}`}
                          >
                            {inFit ? <X size={10} /> : <span className="text-sm font-light">+</span>}
                          </button>
                        </div>
                        <div className="px-2 py-1.5">
                          <p className="text-[9px] text-gray-400">{garment.brand}</p>
                          <p className="text-[10px] font-semibold text-gray-800 truncate">{garment.name}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                  {filteredGarments.length === 0 && !loading && (
                    <div className="col-span-3 flex flex-col items-center justify-center py-16 gap-2">
                      <Search size={22} className="text-gray-300" />
                      <p className="text-sm text-gray-400">검색 결과가 없습니다</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 상세정보 */}
        <div className="border-t border-gray-100 bg-white p-3 flex-shrink-0">
          <AnimatePresence mode="wait">
            {selectedGarment ? (
              <motion.div key={selectedGarment.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle[selectedGarment.category]?.dot || "bg-gray-300"}`} />
                    <p className="text-[10px] text-gray-400">{selectedGarment.brand}</p>
                  </div>
                  <p className="text-[12px] font-bold text-gray-800 truncate">{selectedGarment.name}</p>
                  {selectedGarment.originalLink && (
                    <a href={selectedGarment.originalLink} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#3D1E5F] hover:underline">
                      무신사에서 보기 →
                    </a>
                  )}
                </div>
                {/* 사이즈 */}
                <div className="flex gap-1">
                  {selectedGarment.sizes.map((s) => (
                    <button key={s} onClick={() => handleSizeChange(s)} className={`w-7 h-7 text-[10px] rounded-lg border font-semibold transition-all cursor-pointer ${selectedSize === s ? "border-[#3D1E5F] text-[#3D1E5F] bg-violet-50" : "border-gray-200 text-gray-500"}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {/* 버튼 */}
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toggleFitList(selectedGarment)} className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${isInFitList(selectedGarment.id) ? "bg-red-50 text-red-400 border border-red-200" : "bg-[#3D1E5F] text-white"}`}>
                    {isInFitList(selectedGarment.id) ? "제거" : "+ 피팅"}
                  </button>
                  <button className="px-3 py-1.5 rounded-xl text-[11px] border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer flex items-center gap-1">
                    <Heart size={11} />
                  </button>
                  <button className="px-3 py-1.5 rounded-xl text-[11px] border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer flex items-center gap-1">
                    <ShoppingBag size={11} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-gray-400 text-center py-1">
                의류 카드를 클릭하면 상세 정보가 표시됩니다
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── 오른쪽: 아바타 크게 ── */}
      <aside style={{ flexBasis: "45%", minWidth: 0 }} className="bg-white flex flex-col overflow-hidden">

        {/* 업로드 + 피팅 버튼 */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFaceUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] rounded-xl transition-all cursor-pointer font-medium ${faceImage ? "bg-[#3D1E5F]/10 text-[#3D1E5F] border border-[#3D1E5F]/20" : "bg-white border border-dashed border-gray-300 text-gray-500 hover:border-[#3D1E5F] hover:text-[#3D1E5F]"}`}
            >
              <Camera size={12} />
              {faceImage ? "사진 변경" : "얼굴 사진 업로드 (필수)"}
            </button>
            {(faceImage || fitList.length > 0) && (
              <button onClick={handleReset} className="w-7 h-7 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer">
                <RotateCcw size={11} className="text-gray-500" />
              </button>
            )}
          </div>
          <motion.button
            whileHover={canFit ? { y: -1 } : {}}
            whileTap={canFit ? { scale: 0.97 } : {}}
            onClick={handleTryOn}
            disabled={!canFit}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[12px] font-bold transition-all ${canFit ? "bg-[#3D1E5F] text-white shadow-md shadow-violet-200 cursor-pointer" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
          >
            <Sparkles size={13} />
            {isFitting ? "피팅 중..." : "가상 피팅 시작"}
          </motion.button>
        </div>

        {/* 아바타 크게 */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="w-full h-full max-w-[340px] rounded-[32px] bg-white border border-gray-200 overflow-hidden flex items-center justify-center shadow-md">
            {isFitting ? (
              <div className="flex flex-col items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} className="text-[#3D1E5F]">
                  <Sparkles size={32} />
                </motion.div>
                <p className="text-[12px] text-gray-400 font-medium">피팅 중...</p>
                <p className="text-[10px] text-gray-300">잠시만 기다려주세요</p>
              </div>
            ) : fitResult ? (
              <img src={fitResult} alt="피팅 결과" className="w-full h-full object-cover" />
            ) : faceImage ? (
              <img src={faceImage} alt="내 얼굴" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 opacity-20">
                <div className="w-20 h-20 rounded-full bg-gray-400" />
                <div className="w-36 h-48 bg-gray-400 rounded-xl" />
                <div className="w-28 h-32 bg-gray-400 rounded-b-xl" />
              </div>
            )}
          </div>
        </div>

        {(!faceFile || fitList.length === 0) && (
          <div className="px-4 py-3 text-center flex-shrink-0">
            <p className="text-[11px] text-gray-400">
              {!faceFile ? "👆 얼굴 사진을 업로드해주세요" : "👈 의류를 선택해주세요"}
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}