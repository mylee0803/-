import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "text-wine-900 font-bold" : "text-stone-500 hover:text-wine-700 font-medium";
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-wine-100 selection:text-wine-900">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 decoration-0">
                            <div className="w-8 h-8 rounded-full bg-wine-600 flex items-center justify-center">
                                <span className="text-white font-serif italic text-lg pr-0.5">W</span>
                            </div>
                            <span className="font-serif text-2xl font-semibold tracking-tight text-wine-950">
                                Wine Diary
                            </span>
                        </Link>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link to="/" className={`${isActive('/')} transition-colors`}>홈</Link>
                                <Link to="/cellar" className={`${isActive('/cellar')} transition-colors`}>내 셀러</Link>
                                <Link to="/notes" className={`${isActive('/notes')} transition-colors`}>테이스팅 노트</Link>
                                <Link to="/statistics" className={`${isActive('/statistics')} transition-colors`}>통계</Link>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <Link to="/add">
                                <button className="bg-wine-600 text-white px-6 py-2.5 rounded-full hover:bg-wine-700 transition-all shadow-sm hover:shadow-md active:scale-95 font-medium">
                                    와인 등록
                                </button>
                            </Link>
                        </div>

                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-wine-600 focus:outline-none"
                            >
                                <span className="sr-only">메뉴 열기</span>
                                {!isMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-stone-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-wine-900 block px-3 py-2 rounded-md text-base font-medium">홈</Link>
                            <Link to="/cellar" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-wine-600 block px-3 py-2 rounded-md text-base font-medium">내 셀러</Link>
                            <Link to="/notes" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-wine-600 block px-3 py-2 rounded-md text-base font-medium">테이스팅 노트</Link>
                            <Link to="/statistics" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-wine-600 block px-3 py-2 rounded-md text-base font-medium">통계</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Info */}
            <div className="pt-20">
                <Outlet />
            </div>
        </div>
    );
}
