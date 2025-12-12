
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
            {/* Header z-index increased to 999 to stay above page content (like the z-60 search bar) */}
            <header className="fixed top-6 left-0 right-0 z-[999] flex justify-center px-4 animate-on-scroll">
                <div className="bg-[#0F0C29]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 w-full max-w-6xl flex items-center justify-between shadow-2xl relative">
                    <Link to="/" className={`flex items-center gap-3 group z-50 relative ${isRTL ? 'pl-0 pr-2' : 'pl-2 pr-0'}`}>
                        <div className="w-8 h-8 relative">
                            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                                <path d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors">ZamTour</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>{t.nav.home}</Link>
                        <Link to="/explore" className={`text-sm font-medium transition-colors ${isActive('/explore')}`}>{t.nav.explore}</Link>
                        <Link to="/packages" className={`text-sm font-medium transition-colors ${isActive('/packages')}`}>{t.nav.packages}</Link>
                        <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about')}`}>{t.nav.about}</Link>
                    </nav>

                    <div className="flex items-center gap-3 z-50 relative">
                        {/* Language Dropdown */}
                        <div className="relative group hidden sm:block">
                            <button className="flex items-center gap-1 text-gray-300 hover:text-white text-xs font-medium transition-colors uppercase">
                                <span>{language}</span><span className="iconify w-3 h-3" data-icon="solar:alt-arrow-down-bold"></span>
                            </button>
                            <div className={`absolute top-full mt-4 w-32 bg-[#1B1464] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform ${isRTL ? 'left-0 origin-top-left' : 'right-0 origin-top-right'}`}>
                                <button onClick={() => handleLanguageChange('en')} className="block w-full text-start px-4 py-2 text-sm text-white hover:text-gold-400 hover:bg-white/5 first:rounded-t-xl">English</button>
                                <button onClick={() => handleLanguageChange('ru')} className="block w-full text-start px-4 py-2 text-sm text-white hover:text-gold-400 hover:bg-white/5">Russian</button>
                                <button onClick={() => handleLanguageChange('ar')} className="block w-full text-start px-4 py-2 text-sm text-white hover:text-gold-400 font-arabic hover:bg-white/5 last:rounded-b-xl">العربية</button>
                            </div>
                        </div>

                        <Link to="/packages" className="hidden sm:block border border-gold-400/50 bg-transparent text-white hover:bg-gold-400 hover:text-[#1B1464] px-5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                            {t.nav.book}
                        </Link>

                        <button onClick={toggleMenu} className="lg:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B1464] hover:bg-gold-400 transition-colors shadow-lg">
                            <span className="iconify w-6 h-6" data-icon="solar:hamburger-menu-linear"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu z-index increased to 1000 to cover the header */}
            <div id="mobile-menu" className={`${isMenuOpen ? 'visible-menu' : 'hidden-menu'} fixed inset-0 z-[1000] bg-[#1B1464]/95 backdrop-blur-xl flex flex-col items-center justify-center`}>
                <button onClick={toggleMenu} className={`absolute top-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all ${isRTL ? 'left-8' : 'right-8'}`}>
                    <span className="iconify w-6 h-6" data-icon="solar:close-circle-bold"></span>
                </button>
                <nav className="flex flex-col items-center gap-8">
                    <Link to="/" onClick={toggleMenu} className="text-3xl font-bold text-white hover:text-gold-400 transition-colors">{t.nav.home}</Link>
                    <Link to="/explore" onClick={toggleMenu} className="text-3xl font-bold text-white hover:text-gold-400 transition-colors">{t.nav.explore}</Link>
                    <Link to="/packages" onClick={toggleMenu} className="text-3xl font-bold text-white hover:text-gold-400 transition-colors">{t.nav.packages}</Link>
                    <Link to="/about" onClick={toggleMenu} className="text-3xl font-bold text-white hover:text-gold-400 transition-colors">{t.nav.about}</Link>

                    {/* Mobile Lang Switch */}
                    <div className="flex gap-4 mt-4">
                        <button onClick={() => { handleLanguageChange('en'); toggleMenu(); }} className={`px-4 py-2 rounded-full border ${language === 'en' ? 'bg-gold-400 text-[#1B1464] border-gold-400' : 'text-white border-white/20'}`}>EN</button>
                        <button onClick={() => { handleLanguageChange('ru'); toggleMenu(); }} className={`px-4 py-2 rounded-full border ${language === 'ru' ? 'bg-gold-400 text-[#1B1464] border-gold-400' : 'text-white border-white/20'}`}>RU</button>
                        <button onClick={() => { handleLanguageChange('ar'); toggleMenu(); }} className={`px-4 py-2 rounded-full border font-arabic ${language === 'ar' ? 'bg-gold-400 text-[#1B1464] border-gold-400' : 'text-white border-white/20'}`}>عربي</button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
