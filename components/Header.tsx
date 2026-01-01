
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, Language } from '../LanguageContext';
import { useData } from '../DataContext';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const location = useLocation();
    const { t, setLanguage, language, isRTL } = useLanguage();
    const { settings } = useData();

    const languages: { code: Language; name: string; flag: string }[] = [
        { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ru', name: 'Russian', flag: '🇷🇺' },
        { code: 'kk', name: 'Kazakh', flag: '🇰🇿' }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsLangOpen(false);
    };

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setIsLangOpen(false);
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
                        <a
                            href={`https://wa.me/${settings?.whatsappNumber || "77477577971"}?text=${encodeURIComponent("Hello ZamTour! I want to inquire about booking a tour.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex bg-gold-400 text-[#1B1464] px-4 md:px-6 py-2 rounded-full font-bold hover:bg-white transition-colors shadow-lg text-xs md:text-sm items-center gap-2 whitespace-nowrap"
                        >
                            <span>{t.nav.book}</span>
                            <span className="iconify" data-icon="solar:arrow-right-linear"></span>
                        </a>

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
                <nav className="flex flex-col items-center justify-between h-full py-12 w-full max-w-xs px-6">
                    {/* Empty spacer for top */}
                    <div></div>

                    {/* Custom Dropdown Selector */}
                    <div className="w-full flex flex-col items-start">
                        <label className="text-white/60 text-sm font-bold mb-2 px-1 uppercase tracking-widest">{t.tips.language}</label>
                        <div className="relative w-full">
                            {/* Dropdown Header */}
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`w-full bg-white text-gray-700 px-5 py-4 flex items-center justify-between shadow-2xl transition-all duration-300 ${isLangOpen ? 'rounded-t-[20px] border-b border-gray-100' : 'rounded-[20px]'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{currentLang.flag}</span>
                                    <span className="font-bold text-lg">{currentLang.name}</span>
                                </div>
                                <span className={`iconify w-6 h-6 text-gray-400 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} data-icon="solar:alt-arrow-down-linear"></span>
                            </button>

                            {/* Dropdown Items */}
                            {isLangOpen && (
                                <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-b-[20px] overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                handleLanguageChange(lang.code);
                                                // Optional: toggleMenu() after selection if desired
                                                setTimeout(toggleMenu, 300);
                                            }}
                                            className={`w-full px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${language === lang.code ? 'bg-blue-50 text-[#1B1464]' : 'text-gray-600'}`}
                                        >
                                            <span className="text-2xl">{lang.flag}</span>
                                            <span className="font-bold text-lg flex-1">{lang.name}</span>
                                            {language === lang.code && (
                                                <span className="iconify text-brand-light w-5 h-5" data-icon="solar:check-circle-bold"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Spacer */}
                    <div className="h-20"></div>
                </nav>
            </div>
        </>
    );
};

export default Header;
