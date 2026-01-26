
export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-wine-950 mb-6 tracking-tight">
                            와인의 <span className="text-wine-600 italic">모든 순간</span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-stone-600 font-light leading-relaxed">
                            나만의 디지털 소믈리에. 테이스팅 여정을 기록하고, 취향의 패턴을 발견하며, 꿈의 셀러를 완성해보세요.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <button className="bg-wine-600 text-white px-8 py-3.5 rounded-full hover:bg-wine-700 transition-all shadow-lg hover:shadow-wine-200/50 text-lg font-medium">
                                테이스팅 시작하기
                            </button>
                            <button className="bg-white text-wine-700 border border-stone-200 px-8 py-3.5 rounded-full hover:bg-stone-50 transition-all shadow-sm hover:shadow text-lg font-medium">
                                컬렉션 둘러보기
                            </button>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wine-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Recent Entries Section Preview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif font-bold text-wine-950">최근 테이스팅 노트</h2>
                    <a href="#" className="text-wine-600 hover:text-wine-800 font-medium flex items-center gap-1">
                        전체 보기 <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-stone-100 cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-wine-50 text-wine-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">레드</div>
                            <span className="text-stone-400 text-sm">2일 전</span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-wine-700 transition-colors">Château Margaux 2015</h3>
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-5 h-5 text-gold-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-stone-600 line-clamp-3 mb-4 text-sm leading-relaxed">
                            놀라울 정도의 깊이와 복합미. 블랙커런트와 제비꽃의 향, 미묘한 흙 내음이 어우러짐. 타닌은 비단처럼 부드러움.
                        </p>
                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-sm text-stone-500 font-medium">Bordeaux, France</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-stone-100 cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">화이트</div>
                            <span className="text-stone-400 text-sm">5일 전</span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-wine-700 transition-colors">Cloudy Bay Sauvignon Blanc</h3>
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4].map((star) => (
                                <svg key={star} className="w-5 h-5 text-gold-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                            <svg className="w-5 h-5 text-stone-300 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </div>
                        <p className="text-stone-600 line-clamp-3 mb-4 text-sm leading-relaxed">
                            라임과 자몽의 풍미가 감도는 향. 매우 상쾌한 산미와 긴 미네랄 피니시. 여름 오후에 완벽한 와인.
                        </p>
                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-sm text-stone-500 font-medium">Marlborough, NZ</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-stone-100 cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">로제</div>
                            <span className="text-stone-400 text-sm">1주 전</span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-wine-700 transition-colors">Whispering Angel</h3>
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4].map((star) => (
                                <svg key={star} className="w-5 h-5 text-gold-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                            <svg className="w-5 h-5 text-gold-500 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </div>
                        <p className="text-stone-600 line-clamp-3 mb-4 text-sm leading-relaxed">
                            연한 핑크빛. 딸기와 크림의 향에 말린 허브의 뉘앙스. 마시기 편하지만 구조감은 약간 부족함.
                        </p>
                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-sm text-stone-500 font-medium">Provence, France</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
