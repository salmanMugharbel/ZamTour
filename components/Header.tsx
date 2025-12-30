
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, Language } from '../LanguageContext';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { t, setLanguage, language, isRTL } = useLanguage();

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const isActive = (path: string) => location.pathname === path ? "text-white" : "text-gray-300 hover:text-white";

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <>
            {/* Header z-index increased to 999 to stay above page content */}
            <header className="fixed top-6 left-0 right-0 z-[999] flex justify-center px-4 animate-on-scroll">
                <div className="bg-[#0F0C29]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 w-full max-w-6xl flex items-center shadow-2xl relative">

                    {/* Left: Hamburger Menu */}
                    <div className="flex-1 flex justify-start">
                        <button onClick={toggleMenu} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold-400 hover:text-[#1B1464] transition-colors shadow-lg z-50">
                            <span className="iconify w-6 h-6" data-icon="solar:hamburger-menu-linear"></span>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <Link to="/" className="flex items-center gap-3 group z-50 shrink-0">
                        <div className="w-8 h-8 relative">
                            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                                <path d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors hidden md:block">ZamTour</span>
                    </Link>

                    {/* Right: Book Now Button */}
                    <div className="flex-1 flex justify-end z-50">
                        <Link to="/payment" className="bg-gold-400 text-[#1B1464] px-4 md:px-6 py-2 rounded-full font-bold hover:bg-white transition-colors shadow-lg text-xs md:text-sm flex items-center gap-2 whitespace-nowrap">
                            <span>{t.nav.book}</span>
                            <span className="iconify" data-icon="solar:arrow-right-linear"></span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`${isMenuOpen ? 'visible-menu' : 'hidden-menu'} fixed inset-0 z-[1000] bg-[#1B1464]/95 backdrop-blur-xl flex flex-col items-center justify-center`}>
                <button onClick={toggleMenu} className={`absolute top-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all ${isRTL ? 'left-8' : 'right-8'}`}>
                    <span className="iconify w-6 h-6" data-icon="solar:close-circle-bold"></span>
                </button>
                <nav className="flex flex-col items-center gap-8">
                    {/* Only Language Flags */}
                    <div className="flex flex-col items-center gap-6">
                        <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Select Language</p>
                        <div className="flex flex-wrap justify-center gap-8">
                            <button onClick={() => { handleLanguageChange('ar'); toggleMenu(); }} className="flex flex-col items-center gap-2 group">
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-200">🇸🇦</span>
                                <span className={`text-sm font-bold ${language === 'ar' ? 'text-gold-400' : 'text-white/50 group-hover:text-white'}`}>Arabic</span>
                            </button>
                            <button onClick={() => { handleLanguageChange('en'); toggleMenu(); }} className="flex flex-col items-center gap-2 group">
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-200">🇺🇸</span>
                                <span className={`text-sm font-bold ${language === 'en' ? 'text-gold-400' : 'text-white/50 group-hover:text-white'}`}>English</span>
                            </button>
                            <button onClick={() => { handleLanguageChange('ru'); toggleMenu(); }} className="flex flex-col items-center gap-2 group">
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-200">🇷🇺</span>
                                <span className={`text-sm font-bold ${language === 'ru' ? 'text-gold-400' : 'text-white/50 group-hover:text-white'}`}>Russian</span>
                            </button>
                            <button onClick={() => { handleLanguageChange('kk'); toggleMenu(); }} className="flex flex-col items-center gap-2 group">
                                <span className="text-5xl transform group-hover:scale-110 transition-transform duration-200">🇰🇿</span>
                                <span className={`text-sm font-bold ${language === 'kk' ? 'text-gold-400' : 'text-white/50 group-hover:text-white'}`}>Kazakh</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
