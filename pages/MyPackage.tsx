
import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';

const MyPackage: React.FC = () => {
    const { t, isRTL } = useLanguage();
    const { packages } = useData();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || 'coup_prem'; // Default fallback

    const pkg = packages.find(p => p.id === id);

    const location = useLocation();
    const isInquiryMode = location.state?.inquiryMode;
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

    const handleBookClick = () => {
        if (isInquiryMode) {
            // Direct WhatsApp Inquiry
            const details = location.state?.inquiryDetails || {};
            const phone = "77078382129";

            const msg = `Hello ZamTour! I want to inquire about the ${pkg.title} package.
            
Details:
- Country: ${details.country || 'Not specified'}
- Duration: ${details.duration ? details.duration + ' days' : 'Not specified'}
- Travelers: ${details.adults || 0} Adults, ${details.children || 0} Children`;

            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        } else {
            navigate(`/payment?id=${pkg.id}`);
        }
    };

    const handleFindCost = () => {
        // Keep existing logic for fallback or direct use
        const phone = "77078382129";
        const msg = `Hello ZamTour! I want to inquire about the cost of the ${pkg.title} (${pkg.subtitle}) package.`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        setIsInquiryModalOpen(false);
    };

    if (!pkg) {
        return <div className="text-white text-center pt-40">Package not found</div>;
    }

    return (
        <div className="w-full">
            {/* INQUIRY MODAL */}
            {isInquiryModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsInquiryModalOpen(false)}>
                    <div className="bg-[#1B1464] border border-white/20 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setIsInquiryModalOpen(false)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <span className="iconify w-6 h-6" data-icon="solar:close-circle-bold"></span>
                        </button>

                        <div className="w-16 h-16 rounded-full bg-gold-400/20 text-gold-400 mx-auto flex items-center justify-center mb-6">
                            <span className="iconify w-8 h-8" data-icon="solar:question-circle-bold-duotone"></span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{t.my_package?.inquiry_title || "How would you like to proceed?"}</h3>
                        <p className="text-blue-200 mb-8">{t.my_package?.inquiry_desc || "You can proceed to payment directly or contact us to discuss the cost."}</p>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => navigate(`/payment?id=${pkg.id}`)}
                                className="w-full bg-gold-400 text-[#1B1464] py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <span className="iconify" data-icon="solar:card-bold-duotone"></span>
                                {t.my_package?.pay_now || "Pay Now"}
                            </button>
                            <button
                                onClick={handleFindCost}
                                className="w-full bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/10 flex items-center justify-center gap-2"
                            >
                                <span className="iconify" data-icon="solar:chat-round-bold-duotone"></span>
                                {t.my_package?.find_cost || "Find Out Cost"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                <button
                                    onClick={handleBookClick}
                                    className="w-full bg-gold-400 text-[#1B1464] py-3 rounded-xl font-bold hover:bg-white transition-all shadow-lg"
                                >
                                    {t.my_package.book_now}
                                </button>
                                <p className="text-[10px] text-gray-500 mt-3">{t.my_package.cancellation}</p>
                            </div>

                            {/* Middle: Inclusions */}
                            <div className="w-full md:w-2/4 p-8 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="iconify text-gold-400" data-icon="solar:star-bold"></span> {t.my_package.includes_title}
                                </h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    {pkg.inclusions.map((inc, i) => {
                                        // Standard inclusions mapping
                                        const keys = ['sim', 'tours', 'transfers', 'stay'];
                                        const icons = [
                                            'solar:sim-card-bold-duotone',
                                            'solar:map-point-bold-duotone',
                                            'solar:taxi-bold-duotone',
                                            'solar:bed-bold-duotone'
                                        ];

                                        const key = keys[i];
                                        // @ts-ignore
                                        const title = t.my_package.includes[key];
                                        // @ts-ignore
                                        const desc = t.my_package.includes[`${key}_desc`];

                                        // Use mapped icon if available, otherwise fallback to data
                                        const icon = icons[i] || inc.icon;

                                        return (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    <span className="iconify w-6 h-6" data-icon={icon}></span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm">{title || inc.title}</p>
                                                    <p className="text-[10px] text-gray-400">{desc || inc.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
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

                    {pkg.itinerary.map((day, i) => {
                        // @ts-ignore
                        const dayData = t.my_package.days[`day${i + 1}_title`] ? {
                            // @ts-ignore
                            title: t.my_package.days[`day${i + 1}_title`],
                            // @ts-ignore
                            sub: t.my_package.days[`day${i + 1}_sub`],
                            // @ts-ignore
                            desc: t.my_package.days[`day${i + 1}_desc`]
                        } : day;

                        return (
                            <div key={i} className={`relative ${isRTL ? 'pr-16' : 'pl-16'} pb-12 group animate-on-scroll`}>
                                <div className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-10 bottom-[-20px] w-0.5 bg-white/10 z-0`}></div>
                                <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white border-4 border-[#1B1464] z-10 shadow-lg`}>
                                    <span className="iconify w-6 h-6" data-icon="solar:calendar-mark-bold"></span>
                                </div>

                                <div className="spotlight-wrapper rounded-2xl p-[1px]">
                                    <div className="spotlight-content rounded-2xl p-6 bg-[#1B1464]/60">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-white">{dayData.title || day.title}</h3>
                                            <span className="text-xs text-gray-400">{dayData.sub || day.subtitle}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                            {dayData.desc || day.desc}
                                        </p>
                                        <div className="flex gap-4 border-t border-white/10 pt-4 text-xs text-gray-400">
                                            {day.activities.map((act, j) => {
                                                const [icon, text] = act.split('|');
                                                // Ideally translate activities too, but for now just text
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
                        );
                    })}

                </div>

            </main>
        </div>
    );
};

export default MyPackage;
