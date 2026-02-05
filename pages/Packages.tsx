
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

    // Group packages by type to maintain layout structure
    const couplesPackages = packages.filter(p => p.type === 'couples');
    const familyPackages = packages.filter(p => p.type === 'family');
    const friendsPackages = packages.filter(p => p.type === 'friends');

    const renderPackageSection = (title: string, icon: string, iconColorClass: string, items: typeof packages) => {
        if (items.length === 0) return null;

        return (
            <section className="mb-16 animate-on-scroll">
                <div className="flex items-center gap-3 mb-8 px-2">
                    {/* <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColorClass.replace('text-', 'bg-').replace('400', '500/10')} ${iconColorClass}`}>
                        <span className="iconify w-5 h-5" data-icon={icon}></span>
                    </div> */}
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1B1464]">{title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((pkg) => {
                        // Resolve dynamic translation for title
                        // @ts-ignore
                        const translatedTitle = t.packages[`${pkg.type}_${pkg.tier === 'premium' ? 'prem_' : ''}title`] || pkg.title;

                        // Determine duration text (using subtitle as it often contains duration, or fallback)
                        // The existing subtitles in translations are like "Standard", "Premium", "7 Days" etc.
                        // We might need a better source for duration if it's not consistent. 
                        // For custom packages, it's correct. For standard ones, let's use a generic string or mapped value if available.
                        // But for now, we'll try to use the subtitle if it looks like a duration, or fallback to the itinerary length.
                        const duration = pkg.subtitle.includes('Days') ? pkg.subtitle : `${pkg.itinerary?.length || 5} Days`;

                        return (
                            <PackageCard
                                key={pkg.id}
                                id={pkg.id}
                                title={translatedTitle}
                                image={pkg.image}
                                price={pkg.price}
                                priceLabel={pkg.priceLabel}
                                duration={duration}
                                tier={pkg.tier}
                                onSelect={handleSelect}
                            />
                        );
                    })}
                </div>
            </section>
        );
    };

    return (
        <div className="w-full">
            {/* Hero Section - Reduced height for better flow */}
            <section className="relative h-[40vh] md:h-[50vh] flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg"
                        alt="Shymbulak Packages"
                        className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="text-center z-10 max-w-4xl px-4 mt-10 animate-on-scroll">
                    <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
                        {t.packages.title} <span className="text-gold-400">{t.packages.title_highlight}</span>
                    </h1>
                    <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        {t.packages.subtitle}
                    </p>
                </div>
            </section>

            {/* Inquiry Mode Banner */}
            {isInquiryMode && (
                <div className="bg-gold-400 text-[#1B1464] py-3 px-4 text-center font-bold sticky top-16 z-40 shadow-md">
                    Please complete choosing your package to proceed with your inquiry.
                </div>
            )}

            <main className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                {renderPackageSection(t.packages.couples, "solar:heart-angle-bold-duotone", "text-pink-500", couplesPackages)}
                {renderPackageSection(t.packages.family, "solar:users-group-rounded-bold-duotone", "text-green-500", familyPackages)}
                {renderPackageSection(t.packages.friends, "solar:glass-cheers-bold-duotone", "text-blue-500", friendsPackages)}
            </main>
        </div>
    );
};

export default Packages;
