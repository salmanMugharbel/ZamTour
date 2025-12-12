
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';

const MyPackage: React.FC = () => {
    const { t, isRTL } = useLanguage();
    const { packages } = useData();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || 'coup_prem'; // Default fallback

    const pkg = packages.find(p => p.id === id);

    if (!pkg) {
        return <div className="text-white text-center pt-40">Package not found</div>;
    }

    return (
        <div className="w-full">
            <main className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">

                {/* PACKAGE TITLE HERO */}
                <div className="mb-8 animate-on-scroll">
                    <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 mb-4 transition-colors">
                        <span className={`iconify ${isRTL ? 'rotate-180' : ''}`} data-icon="solar:arrow-left-linear"></span> {t.my_package.back}
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold text-white">{pkg.title} <span className="text-gold-400">{pkg.subtitle}</span></h1>
                </div>

                {/* 1. PACKAGE SUMMARY CARD */}
                <div className="spotlight-wrapper rounded-2xl p-[1px] mb-12 animate-on-scroll">
                    <div className="spotlight-content rounded-2xl p-6 md:p-0 overflow-hidden bg-[#1B1464]/90">
                        <div className="flex flex-col md:flex-row">

                            {/* Left: Pricing & Action */}
                            <div className={`w-full md:w-1/4 bg-white/5 p-8 flex flex-col justify-center items-center border-b md:border-b-0 ${isRTL ? 'md:border-l' : 'md:border-r'} border-white/10 text-center`}>
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">{t.my_package.total_price}</span>
                                <div className="text-4xl font-extrabold text-white mb-6">${pkg.price}</div>
                                <button className="w-full bg-gold-400 text-[#1B1464] py-3 rounded-xl font-bold hover:bg-white transition-all shadow-lg">
                                    {t.my_package.book_now}
                                </button>
                                <p className="text-[10px] text-gray-500 mt-3">{pkg.cancellationPolicy}</p>
                            </div>

                            {/* Middle: Inclusions */}
                            <div className="w-full md:w-2/4 p-8 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="iconify text-gold-400" data-icon="solar:star-bold"></span> {t.my_package.includes_title}
                                </h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    {pkg.inclusions.map((inc, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <span className="iconify w-6 h-6" data-icon={inc.icon}></span>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{inc.title}</p>
                                                <p className="text-[10px] text-gray-400">{inc.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Image */}
                            <div className="w-full md:w-1/4 h-48 md:h-auto relative">
                                <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464] to-transparent opacity-60"></div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 2. ITINERARY */}
                <h2 className={`text-2xl font-bold text-white mb-8 ${isRTL ? 'pr-2' : 'pl-2'} animate-on-scroll`}>{t.my_package.itinerary_title}</h2>

                <div className="space-y-0 relative">

                    {pkg.itinerary.map((day, i) => (
                        <div key={i} className={`relative ${isRTL ? 'pr-16' : 'pl-16'} pb-12 group animate-on-scroll`}>
                            <div className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-10 bottom-[-20px] w-0.5 bg-white/10 z-0`}></div>
                            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white border-4 border-[#1B1464] z-10 shadow-lg`}>
                                <span className="iconify w-6 h-6" data-icon="solar:calendar-mark-bold"></span>
                            </div>

                            <div className="spotlight-wrapper rounded-2xl p-[1px]">
                                <div className="spotlight-content rounded-2xl p-6 bg-[#1B1464]/60">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-white">{day.title}</h3>
                                        <span className="text-xs text-gray-400">{day.subtitle}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                        {day.desc}
                                    </p>
                                    <div className="flex gap-4 border-t border-white/10 pt-4 text-xs text-gray-400">
                                        {day.activities.map((act, j) => {
                                            const [icon, text] = act.split('|');
                                            return (
                                                <div key={j} className="flex items-center gap-1">
                                                    {icon && <span className="iconify text-green-400" data-icon={icon}></span>}
                                                    {text}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </main>
        </div>
    );
};

export default MyPackage;
