
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';
import PackageCard from '../components/PackageCard';

const Packages: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const { packages } = useData();
    const [activeType, setActiveType] = React.useState<'all' | 'couples' | 'family' | 'friends' | 'solo'>('all');
    const [premiumOnly, setPremiumOnly] = React.useState(false);

    // Check if we are in inquiry mode
    const isInquiryMode = location.state?.inquiryMode;

    const handleSelect = (id: string) => {
        // Pass inquiry state forward
        navigate(`/my-package?id=${id}`, {
            state: {
                inquiryMode: isInquiryMode,
                inquiryDetails: location.state?.inquiryDetails // Pass details forward
            }
        });
    };

    const typeFilters = [
        { id: 'all', label: t.packages.all_packages },
        { id: 'couples', label: t.packages.couples },
        { id: 'family', label: t.packages.family },
        { id: 'friends', label: t.packages.friends },
        ...(packages.some(pkg => pkg.type === 'solo') ? [{ id: 'solo', label: t.packages.solo }] : [])
    ] as const;
    const filteredPackages = packages.filter(pkg =>
        (activeType === 'all' || pkg.type === activeType) && (!premiumOnly || pkg.tier === 'premium')
    );
    const fallbackImages = {
        couples: '/images/kolsai-lake/image-1.jpg',
        family: '/images/shymbulak-mountains/image-1.jpg',
        friends: '/images/shymbulak-mountains/image-1.jpg',
        solo: '/images/almarasan-gorge/image-1.jpg'
    };

    return (
        <div className="w-full bg-white text-slate-900">
            {/* Inquiry Mode Banner */}
            {isInquiryMode && (
                <div className="bg-gold-400 text-[#1B1464] py-3 px-4 text-center font-bold">
                    Please complete choosing your package to proceed with your inquiry.
                </div>
            )}

            <main className="mx-auto max-w-[1440px] px-4 pb-12 pt-7 md:px-8">
                <div className="mb-5 flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        {t.packages.title} {t.packages.title_highlight}
                    </h1>
                    <p className="max-w-3xl text-sm text-slate-600 md:text-base">{t.packages.subtitle}</p>
                </div>

                <div className="mb-5 flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3" role="group" aria-label="Filter packages by traveler type">
                    {typeFilters.map(filter => (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() => setActiveType(filter.id)}
                            aria-pressed={activeType === filter.id}
                            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeType === filter.id ? 'bg-[#1B1464] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            {filter.label}
                        </button>
                    ))}
                    <span className="mx-1 h-7 w-px shrink-0 bg-slate-200" aria-hidden="true" />
                    <button
                        type="button"
                        onClick={() => setPremiumOnly(value => !value)}
                        aria-pressed={premiumOnly}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${premiumOnly ? 'bg-[#1B1464] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                        {t.packages.premium}
                    </button>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-slate-600" aria-live="polite">
                    <p className="font-semibold text-slate-900">{t.packages.package_count.replace('{count}', String(filteredPackages.length))}</p>
                    {(activeType !== 'all' || premiumOnly) && (
                        <button
                            type="button"
                            onClick={() => { setActiveType('all'); setPremiumOnly(false); }}
                            className="font-semibold text-[#1B1464] underline underline-offset-4"
                        >
                            {t.packages.clear_filters}
                        </button>
                    )}
                </div>

                {filteredPackages.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredPackages.map(pkg => {
                            // @ts-ignore
                            const translatedTitle = t.packages[`${pkg.type}_${pkg.tier === 'premium' ? 'prem_' : ''}title`] || pkg.title;
                            const duration = pkg.subtitle.includes('Days') ? pkg.subtitle : `${pkg.itinerary?.length || 5} Days`;

                            return (
                                <PackageCard
                                    key={pkg.id}
                                    id={pkg.id}
                                    title={translatedTitle}
                                    image={pkg.image}
                                    fallbackImage={fallbackImages[pkg.type] || fallbackImages.couples}
                                    price={pkg.price}
                                    priceLabel={pkg.priceLabel}
                                    duration={duration}
                                    tier={pkg.tier}
                                    onSelect={handleSelect}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p className="py-16 text-center text-slate-600">{t.packages.no_filter_results}</p>
                )}
            </main>
        </div>
    );
};

export default Packages;
