import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="pb-8">
            {/* Banner Section */}
            <div className="relative w-full bg-stone-900 aspect-[4/3] md:aspect-[21/9] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&q=80&w=2000"
                    alt="Wine Collection"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12">
                    <span className="text-wine-400 font-serif italic text-lg mb-2">Since 2012</span>
                    <h2 className="text-white text-3xl md:text-5xl font-serif font-bold leading-tight mb-2">
                        선도하는 <br /> 프리미엄 컬렉션
                    </h2>
                    <p className="text-stone-300 text-sm md:text-base">1/23(금) ~ 2/13(금) 한정 혜택</p>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    1 / 5 | 전체보기
                </div>
            </div>

            {/* Quick Menu */}
            <div className="grid grid-cols-4 gap-4 px-4 py-8 bg-white border-b border-stone-100 mb-2">
                <Link to="/cellar" className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-100">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="text-xs font-semibold text-stone-700">파트너</span>
                    <span className="text-[10px] text-stone-400">예약픽업</span>
                </Link>
                <Link to="/bucket-list" className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="text-xs font-semibold text-stone-700">스토어</span>
                    <span className="text-[10px] text-stone-400">오늘픽업</span>
                </Link>
                <Link to="/notes" className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-violet-500 flex items-center justify-center text-white shadow-lg shadow-violet-100">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <span className="text-xs font-semibold text-stone-700">해외직구</span>
                    <span className="text-[10px] text-stone-400">집으로 배송</span>
                </Link>
                <Link to="/statistics" className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-stone-600 flex items-center justify-center text-white shadow-lg shadow-stone-200">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="text-xs font-semibold text-stone-700">택배</span>
                    <span className="text-[10px] text-stone-400">집으로 배송</span>
                </Link>
            </div>

            {/* Brand/Category List */}
            <div className="bg-white py-6 overflow-x-auto no-scrollbar border-b border-stone-100 mb-2">
                <div className="flex px-4 gap-6 min-w-max">
                    {['CU', '이마트24', '세븐일레븐', 'GS25', '와인앤모어', '보틀벙커', '신라면세점', '롯데면세점'].map((brand, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="w-16 h-16 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-400 group-hover:border-wine-200 group-hover:bg-wine-50 group-hover:text-wine-600 transition-colors">
                                {brand[0]}
                            </div>
                            <span className="text-xs text-stone-600">{brand}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banner 2 */}
            <div className="bg-blue-500 mx-4 rounded-xl p-4 flex items-center justify-between text-white shadow-lg shadow-blue-200 my-6">
                <div>
                    <h3 className="font-bold text-lg">원하는 카테고리를 선택해보세요!</h3>
                    <p className="text-white/80 text-xs mt-1">취향에 맞는 와인을 찾아드립니다</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <ChevronRight className="w-6 h-6" />
                </div>
            </div>

            {/* Recommendation Section */}
            <div className="bg-white py-8">
                <div className="px-4 mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-stone-800">이달의 추천 와인</h3>
                    <Link to="/cellar" className="text-sm text-stone-400 flex items-center">
                        더보기 <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="min-w-[160px] md:min-w-[200px] bg-white border border-stone-100 rounded-xl overflow-hidden shadow-sm">
                            <div className="aspect-[3/4] bg-stone-100 relative">
                                {/* Placeholder for Wine Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="text-xs text-wine-600 font-bold mb-1">BEST {item}</div>
                                <h4 className="font-bold text-stone-800 text-sm truncate">Château Margaux 2015</h4>
                                <div className="text-xs text-stone-500 mt-1">France</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
