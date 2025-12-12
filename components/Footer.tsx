
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="w-full border-t border-white/10 bg-[#1B1464] pt-20 pb-10 mt-auto animate-on-scroll">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <svg viewBox="0 0 100 60" fill="none" className="w-8 h-8">
                            <path d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-lg font-bold text-white">ZamTour</span>
                    </div>
                    <p className="text-blue-200 text-sm leading-relaxed pr-0 md:pr-12">
                        “{t.footer.desc}”
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">{t.nav.explore}</h4>
                    <ul className="space-y-2 text-sm text-blue-200">
                        <li><Link to="/explore" className="hover:text-gold-400 transition">{t.footer.destinations}</Link></li>
                        <li><Link to="/packages" className="hover:text-gold-400 transition">{t.nav.packages}</Link></li>
                        <li><Link to="/about" className="hover:text-gold-400 transition">{t.footer.services}</Link></li>
                        <li><Link to="/admin" className="text-gray-500 hover:text-gold-400 transition-colors text-xs mt-2 block">Admin Panel</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">{t.footer.social}</h4>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-pink-500 hover:bg-gold-500 hover:text-brand-dark transition"><span className="iconify" data-icon="ri:instagram-fill"></span></a>
                        <a href="https://wa.me/77078382129" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-green-500 hover:bg-gold-500 hover:text-brand-dark transition"><span className="iconify" data-icon="ic:baseline-whatsapp"></span></a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300/60">
                <p>{t.footer.rights}</p>
                <div className="flex gap-1 items-center">
                    <span>{t.footer.made_by}</span>
                    <a href="https://wa.me/77075257841" className="hover:text-gold-400 transition-colors font-bold underline flex items-center gap-1">
                        {t.footer.write_me}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
