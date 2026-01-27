import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Heart, MessageCircle, User, Bell, ShoppingCart, Search } from 'lucide-react';

export default function Layout() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "text-wine-900" : "text-stone-400 hover:text-wine-700";
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-20 md:pb-0 selection:bg-wine-100 selection:text-wine-900">
            {/* Mobile Header (Page Specific) */}
            <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 h-14 px-4 flex items-center justify-between md:hidden">
                <Link to="/" className="font-serif text-xl font-bold text-wine-950 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-wine-600 flex items-center justify-center text-white text-xs italic">W</span>
                    Wine Diary
                </Link>
                <div className="flex items-center gap-3">
                    <button className="p-1 text-stone-600 hover:text-wine-600">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-1 text-stone-600 hover:text-wine-600 relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="p-1 text-stone-600 hover:text-wine-600">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Desktop Navigation (Classic) */}
            <nav className="hidden md:block fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
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
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="text-stone-500 hover:text-wine-700 font-medium transition-colors">홈</Link>
                            <Link to="/cellar" className="text-stone-500 hover:text-wine-700 font-medium transition-colors">다이어리</Link>
                            <Link to="/bucket-list" className="text-stone-500 hover:text-wine-700 font-medium transition-colors">버킷리스트</Link>
                            <Link to="/notes" className="text-stone-500 hover:text-wine-700 font-medium transition-colors">커뮤니티</Link>
                            <Link to="/statistics" className="text-stone-500 hover:text-wine-700 font-medium transition-colors">마이페이지</Link>
                        </div>
                        <div>
                            <Link to="/add">
                                <button className="bg-wine-600 text-white px-6 py-2.5 rounded-full hover:bg-wine-700 transition-all shadow-sm hover:shadow-md active:scale-95 font-medium">
                                    와인 등록
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-14 md:pt-20">
                <Outlet />
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-stone-200 z-50 pb-safe">
                <div className="grid grid-cols-5 h-16">
                    <Link to="/" className={`flex flex-col items-center justify-center gap-1 ${isActive('/')}`}>
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-medium">홈</span>
                    </Link>
                    <Link to="/cellar" className={`flex flex-col items-center justify-center gap-1 ${isActive('/cellar')}`}>
                        <BookOpen className="w-6 h-6" />
                        <span className="text-[10px] font-medium">다이어리</span>
                    </Link>
                    <Link to="/bucket-list" className={`flex flex-col items-center justify-center gap-1 ${isActive('/bucket-list')}`}>
                        <Heart className="w-6 h-6" />
                        <span className="text-[10px] font-medium">버킷리스트</span>
                    </Link>
                    <Link to="/notes" className={`flex flex-col items-center justify-center gap-1 ${isActive('/notes')}`}>
                        <MessageCircle className="w-6 h-6" />
                        <span className="text-[10px] font-medium">커뮤니티</span>
                    </Link>
                    <Link to="/statistics" className={`flex flex-col items-center justify-center gap-1 ${isActive('/statistics')}`}>
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-medium">마이페이지</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
