
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
                <div className="bg-[#0F0C29]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 w-full max-w-6xl flex items-center justify-between shadow-2xl relative">

                    {/* Left: Empty (Hidden placeholder to balance flex if needed, or just use absolute centering) */}
                    <div className="flex-1 hidden md:flex"></div>

                    {/* Center: Logo */}
                    <div className="flex-initial flex justify-center z-[60] absolute left-1/2 transform -translate-x-1/2">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 relative">
                                <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                                    <path d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors">ZamTour</span>
                        </Link>
                    </div>

                    {/* Right: Hamburger Menu */}
                    <div className="flex-1 flex justify-end gap-4 z-50">
                        {/* Book Now - Hidden on mobile */}
                        <Link to="/payment" className="hidden md:flex bg-gold-400 text-[#1B1464] px-4 md:px-6 py-2 rounded-full font-bold hover:bg-white transition-colors shadow-lg text-xs md:text-sm items-center gap-2 whitespace-nowrap">
                            <span>{t.nav.book}</span>
                            <span className="iconify" data-icon="solar:arrow-right-linear"></span>
                        </Link>

                        <button onClick={toggleMenu} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold-400 hover:text-[#1B1464] transition-colors shadow-lg">
                            <span className="iconify w-6 h-6" data-icon="solar:hamburger-menu-linear"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`${isMenuOpen ? 'visible-menu' : 'hidden-menu'} fixed inset-0 z-[1000] bg-[#1B1464]/95 backdrop-blur-xl flex flex-col items-center justify-center`}>
                <button onClick={toggleMenu} className={`absolute top-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all ${isRTL ? 'left-8' : 'right-8'}`}>
                    <span className="iconify w-6 h-6" data-icon="solar:close-circle-bold"></span>
                </button>
                <nav className="flex flex-col items-center gap-8 w-full max-w-xs px-6">
                    {/* Language List */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Select Language</p>
                        <div className="flex flex-col w-full gap-3">
                            <button onClick={() => { handleLanguageChange('ar'); toggleMenu(); }} className={`flex items-center gap-4 w-full p-4 rounded-xl border transition-all ${language === 'ar' ? 'bg-gold-400 text-[#1B1464] border-gold-400' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
                                <span className="text-2xl">🇸🇦</span>
                                <span className="text-lg font-bold">Arabic</span>
                                {language === 'ar' && <span className="iconify ml-auto w-6 h-6" data-icon="solar:check-circle-bold"></span>}
                            </button>
                            <button onClick={() => { handleLanguageChange('en'); toggleMenu(); }} className={`flex items-center gap-4 w-full p-4 rounded-xl border transition-all ${language === 'en' ? 'bg-gold-400 text-[#1B1464] border-gold-400' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
                                <span className="text-2xl">🇺🇸</span>
                                <span className="text-lg font-bold">English</span>
                                {language === 'en' && <span className="iconify ml-auto w-6 h-6" data-icon="solar:check-circle-bold"></span>}
                            </button>
                            <button onClick={() => { handleLanguageChange('ru'); toggleMenu(); }} className={`flex items-center gap-4 w-full p-4 rounded-xl border transition-all ${language === 'ru' ? 'bg-gold-400 text-[#1B1464] border-gold-400' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
                                <span className="text-2xl">🇷🇺</span>
                                <span className="text-lg font-bold">Russian</span>
                                {language === 'ru' && <span className="iconify ml-auto w-6 h-6" data-icon="solar:check-circle-bold"></span>}
                            </button>
                            <button onClick={() => { handleLanguageChange('kk'); toggleMenu(); }} className={`flex items-center gap-4 w-full p-4 rounded-xl border transition-all ${language === 'kk' ? 'bg-gold-400 text-[#1B1464] border-gold-400' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
                                <span className="text-2xl">🇰🇿</span>
                                <span className="text-lg font-bold">Kazakh</span>
                                {language === 'kk' && <span className="iconify ml-auto w-6 h-6" data-icon="solar:check-circle-bold"></span>}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
