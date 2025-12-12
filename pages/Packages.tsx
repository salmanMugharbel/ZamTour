
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';

const Packages: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { packages } = useData();

    const handleSelect = (id: string) => {
        navigate(`/my-package?id=${id}`);
    };

    // Group packages by type to maintain layout structure
    const couplesPackages = packages.filter(p => p.type === 'couples');
    const familyPackages = packages.filter(p => p.type === 'family');
    const friendsPackages = packages.filter(p => p.type === 'friends');

    const renderPackageSection = (title: string, icon: string, iconColorClass: string, items: typeof packages) => {
        if (items.length === 0) return null;

        return (
            <section className="mb-20 animate-on-scroll">
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColorClass.replace('text-', 'bg-').replace('400', '500/20')} ${iconColorClass}`}>
                        <span className="iconify w-6 h-6" data-icon={icon}></span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {items.map((pkg) => (
                        <div key={pkg.id} className={`spotlight-wrapper rounded-3xl p-[1px] ${pkg.tier === 'premium' ? 'premium-border' : ''}`}>
                            <div className={`spotlight-content p-8 flex flex-col h-full ${pkg.tier === 'premium' ? 'bg-gradient-to-b from-[#2a2455] to-[#1B1464]' : 'bg-[#1B1464]/90'}`}>
                                <div className={`mb-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${pkg.tier === 'premium' ? 'text-gold-400' : 'text-gray-400'}`}>
                                    {pkg.tier === 'premium' && <span className="iconify" data-icon="solar:crown-star-bold"></span>}
                                    {pkg.subtitle}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-6">{pkg.title}</h3>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {pkg.features.map((feat, i) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm ${pkg.tier === 'premium' ? 'text-white' : 'text-gray-300'}`}>
                                            <span className={`iconify mt-0.5 text-lg ${pkg.tier === 'premium' ? 'text-gold-400' : 'text-gold-400'}`} data-icon={pkg.tier === 'premium' ? "solar:star-bold-duotone" : "solar:check-circle-bold-duotone"}></span> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                                    <div>
                                        <span className="text-sm text-gray-400">{t.packages.starting_from}</span>
                                        <div className={`text-2xl font-bold ${pkg.tier === 'premium' ? 'text-gold-400' : 'text-white'}`}>
                                            ${pkg.price}<span className="text-xs font-normal text-gray-300">{pkg.priceLabel}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleSelect(pkg.id)}
                                        className={`${pkg.tier === 'premium'
                                            ? 'bg-gold-400 text-[#1B1464] hover:bg-white shadow-lg'
                                            : 'bg-white/10 hover:bg-gold-400 hover:text-[#1B1464] text-white'} 
                                            px-6 py-2 rounded-full font-bold transition-colors`}
                                    >
                                        {t.packages.select}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    return (
        <div className="w-full">
            <section className="relative h-[60vh] md:h-[70vh] flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg"
                        alt="Shymbulak Packages"
                        className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464] via-[#1B1464]/30 to-transparent"></div>
                </div>

                <div className="text-center z-10 max-w-4xl px-4 mt-20 animate-on-scroll">
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
                        {t.packages.title} <span className="text-gold-400">{t.packages.title_highlight}</span>
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium drop-shadow-md">
                        {t.packages.subtitle}
                    </p>
                </div>
            </section>

            <main className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
                {renderPackageSection(t.packages.couples, "solar:heart-angle-bold-duotone", "text-pink-400", couplesPackages)}
                {renderPackageSection(t.packages.family, "solar:users-group-rounded-bold-duotone", "text-green-400", familyPackages)}
                {renderPackageSection(t.packages.friends, "solar:glass-cheers-bold-duotone", "text-blue-400", friendsPackages)}
            </main>
        </div>
    );
};

export default Packages;
