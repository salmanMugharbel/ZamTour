
import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';
import ItineraryCard from '../components/ItineraryCard';

const MyPackage: React.FC = () => {
    const { t, isRTL } = useLanguage();
    const { packages, settings } = useData();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || 'coup_prem'; // Default fallback

    const pkg = packages.find(p => p.id === id);

    const location = useLocation();
    const isInquiryMode = location.state?.inquiryMode;
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

    const handleBookClick = () => {
        const details = location.state?.inquiryDetails || {};
        const phone = settings.whatsappNumber || "77477577971";

        const msg = `Hello ZamTour! I want to inquire about the ${pkgDisplay.title} package.
            
Details:
- Country: ${details.country || 'Not specified'}
- Duration: ${details.duration ? details.duration + ' days' : 'Not specified'}
- Travelers: ${details.adults || 0} Adults, ${details.children || 0} Children`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    const handleFindCost = () => {
        // Keep existing logic for fallback or direct use
        const phone = settings.whatsappNumber || "77477577971";
        const msg = `Hello ZamTour! I want to inquire about the cost of the ${pkgDisplay.title} (${pkgDisplay.subtitle}) package.`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        setIsInquiryModalOpen(false);
    };

    if (!pkg) {
        return <div className="text-white text-center pt-40">Package not found</div>;
    }

    // MERGE TRANSLATIONS FOR ALMATY PACKAGE
    let pkgDisplay = pkg;
    if (pkg.id === 'almaty_luxury_3p') {
        // @ts-ignore
        const customData = t.packages?.custom_packages?.pkg1;
        if (customData) {
            pkgDisplay = {
                ...pkg,
                title: customData.title || pkg.title,
                subtitle: customData.subtitle || pkg.subtitle,
                itinerary: pkg.itinerary.map((day, i) => {
                    // @ts-ignore
                    const tDay = customData.itinerary?.[i];
                    return tDay ? { ...day, title: tDay.title, subtitle: tDay.subtitle, desc: tDay.desc } : day;
                }),
                // @ts-ignore
                inclusions: customData.inclusions || pkg.inclusions
            };
        }
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
                                onClick={handleFindCost}
                                className="w-full bg-gold-400 text-[#1B1464] py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <span className="iconify" data-icon="solar:chat-round-bold-duotone"></span>
                                {t.my_package?.find_cost || "Inquire via WhatsApp"}
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
                    <h1 className="text-3xl md:text-5xl font-bold text-white">{pkgDisplay.title} <span className="text-gold-400">{pkgDisplay.subtitle}</span></h1>
                </div>

                {/* 1. PACKAGE SUMMARY CARD */}
                <div className="spotlight-wrapper rounded-2xl p-[1px] mb-12 animate-on-scroll">
                    <div className="spotlight-content rounded-2xl p-6 md:p-0 overflow-hidden bg-[#1B1464]/90">
                        <div className="flex flex-col md:flex-row">

                            {/* Left: Pricing & Action */}
                            <div className={`w-full md:w-1/4 bg-white/5 p-8 flex flex-col justify-center items-center border-b md:border-b-0 ${isRTL ? 'md:border-l' : 'md:border-r'} border-white/10 text-center`}>
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">{t.my_package.total_price}</span>
                                <div className="text-4xl font-extrabold text-white mb-6">${pkgDisplay.price}</div>
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
                                    {pkgDisplay.inclusions.map((inc, i) => {
                                        const isStandardPkg = ['coup_std', 'coup_prem', 'fam_std', 'fam_prem', 'fr_std', 'fr_prem', 'solo_std', 'solo_prem'].includes(pkgDisplay.id);

                                        let title = inc.title;
                                        let desc = inc.desc;
                                        let icon = inc.icon;

                                        if (isStandardPkg) {
                                            // Standard inclusions mapping
                                            const keys = ['sim', 'tours', 'transfers', 'stay'];
                                            const icons = [
                                                'solar:sim-card-bold-duotone',
                                                'solar:map-point-bold-duotone',
                                                'solar:taxi-bold-duotone',
                                                'solar:bed-bold-duotone'
                                            ];

                                            const key = keys[i];
                                            if (key) {
                                                // @ts-ignore
                                                title = t.my_package.includes[key] || title;
                                                // @ts-ignore
                                                desc = t.my_package.includes[`${key}_desc`] || desc;
                                                icon = icons[i] || icon;
                                            }
                                        }

                                        return (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    <span className="iconify w-6 h-6" data-icon={icon}></span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm">{title}</p>
                                                    <p className="text-[10px] text-gray-400">{desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right: Image */}
                            <div className="w-full md:w-1/4 h-48 md:h-auto relative">
                                <img src={pkgDisplay.image} className="w-full h-full object-cover" alt={pkgDisplay.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464] to-transparent opacity-60"></div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 2. ITINERARY */}
                <h2 className={`text-2xl font-bold text-white mb-8 ${isRTL ? 'pr-2' : 'pl-2'} animate-on-scroll`}>{t.my_package.itinerary_title}</h2>

                <div className="space-y-2 relative">
                    {pkgDisplay.itinerary.map((day, i) => {
                        // Only apply generic translations for standard packages
                        const isStandardPkg = ['coup_std', 'coup_prem', 'fam_std', 'fam_prem', 'fr_std', 'fr_prem', 'solo_std', 'solo_prem'].includes(pkgDisplay.id);

                        let dayData = day;
                        if (isStandardPkg) {
                            // @ts-ignore
                            const tTitle = t.my_package.days[`day${i + 1}_title`];
                            // @ts-ignore
                            const tSub = t.my_package.days[`day${i + 1}_sub`];
                            // @ts-ignore
                            const tDesc = t.my_package.days[`day${i + 1}_desc`];

                            if (tTitle) {
                                dayData = {
                                    ...day,
                                    title: tTitle,
                                    subtitle: tSub,
                                    desc: tDesc
                                };
                            }
                        }

                        return (
                            <ItineraryCard
                                key={i}
                                dayNumber={i + 1}
                                title={dayData.title}
                                subtitle={dayData.subtitle}
                                description={dayData.desc}
                                activities={day.activities}
                                image={day.image || pkgDisplay.image}
                            />
                        );
                    })}
                </div>

            </main>
        </div>
    );
};

export default MyPackage;
