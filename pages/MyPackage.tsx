
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

        const msg = `Hello Al-Morshid! I want to inquire about the ${pkgDisplay.title} package.
            
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
        const msg = `Hello Al-Morshid! I want to inquire about the cost of the ${pkgDisplay.title} (${pkgDisplay.subtitle}) package.`;
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

                <div className="mb-8 animate-on-scroll">
                    <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-gold-400 mb-4 transition-colors">
                        <span className={`iconify ${isRTL ? 'rotate-180' : ''}`} data-icon="solar:arrow-left-linear"></span> {t.my_package.back}
                    </Link>
                </div>

                <div className="mb-12 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] animate-on-scroll">
                    <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                        <div className="relative min-h-[280px] md:min-h-[360px]">
                            <img src={pkgDisplay.image} alt={pkgDisplay.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                            <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B1464] shadow-sm">
                                <span className="iconify text-[11px]" data-icon="solar:star-bold"></span>
                                Top pick
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                                <div className="flex items-center gap-2 text-white/90">
                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={index} className="iconify text-sm" data-icon="solar:star-bold"></span>
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold">4.9</span>
                                    <span className="text-sm text-white/75">(2,371)</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col p-6 md:p-8">
                            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                                <span>Almaty</span>
                                <span className="text-slate-300">•</span>
                                <span>{pkgDisplay.subtitle}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">{pkgDisplay.title}</h1>

                            <p className="mt-4 text-base text-slate-600">
                                A premium Almaty escape designed for comfort, adventure, and seamless hospitality from arrival to departure.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1.5 text-[11px] font-medium text-slate-700">
                                    <span className="iconify text-[12px] text-[#1B1464]" data-icon="solar:clock-circle-bold"></span>
                                    {pkgDisplay.subtitle}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1.5 text-[11px] font-medium text-slate-700">
                                    <span className="iconify text-[12px] text-[#1B1464]" data-icon="solar:map-arrow-bold"></span>
                                    Pickup available
                                </span>
                            </div>

                            <div className="mt-6 grid gap-3 md:grid-cols-2">
                                {pkgDisplay.inclusions.slice(0, 4).map((inc, i) => {
                                    const isStandardPkg = ['coup_std', 'coup_prem', 'fam_std', 'fam_prem', 'fr_std', 'fr_prem', 'solo_std', 'solo_prem'].includes(pkgDisplay.id);

                                    let title = inc.title;
                                    let desc = inc.desc;
                                    let icon = inc.icon;

                                    if (isStandardPkg) {
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
                                        <div key={i} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B1464]/8 text-[#1B1464]">
                                                <span className="iconify text-lg" data-icon={icon}></span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{title}</p>
                                                <p className="text-[11px] text-slate-500">{desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-auto border-t border-slate-200 pt-5">
                                <div className="flex items-end justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">From</span>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-4xl font-extrabold tracking-tight text-[#1B1464]">${pkgDisplay.price}</span>
                                            <span className="text-sm text-slate-500">{pkgDisplay.priceLabel}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBookClick}
                                        className="rounded-xl bg-[#1B1464] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_25px_rgba(27,20,100,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2d287a]"
                                    >
                                        {t.my_package.book_now}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 animate-on-scroll">
                    <h2 className="text-2xl font-bold text-white mb-5">{t.my_package.includes_title}</h2>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {pkgDisplay.inclusions.map((inc, i) => {
                            const isStandardPkg = ['coup_std', 'coup_prem', 'fam_std', 'fam_prem', 'fr_std', 'fr_prem', 'solo_std', 'solo_prem'].includes(pkgDisplay.id);

                            let title = inc.title;
                            let desc = inc.desc;
                            let icon = inc.icon;

                            if (isStandardPkg) {
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
                                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gold-400/15 text-gold-400">
                                        <span className="iconify text-xl" data-icon={icon}></span>
                                    </div>
                                    <p className="text-base font-bold text-white">{title}</p>
                                    <p className="mt-1 text-sm text-slate-300">{desc}</p>
                                </div>
                            );
                        })}
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
