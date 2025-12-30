import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';

import { HIGHLIGHT_ICONS } from '../constants';

const PlaceDetails: React.FC = () => {
    const { t, isRTL } = useLanguage();
    const { destinations, galleries } = useData();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '10'; // Default to Kolsai if no ID

    // Find basic info from dynamic context (so edits appear here)
    const basicInfo = destinations.find(d => d.id === id);

    // Find detailed translations
    // @ts-ignore
    const placeData = t.places_data[id];

    // Find gallery - use the potentially updated main image from DataContext as fallback
    const galleryImages = id ? galleries[id] || [placeData?.img || ''] : [];

    // Get specific icons for this place
    const icons = HIGHLIGHT_ICONS[id] || {
        h1: 'solar:star-bold-duotone',
        h2: 'solar:star-bold-duotone',
        h3: 'solar:star-bold-duotone',
        h4: 'solar:star-bold-duotone'
    };

    if (!basicInfo || !placeData) {
        return <div className="text-white text-center pt-40">{t.explore.place_not_found}</div>;
    }

    return (
        <div className="w-full">
            <div className="relative h-[60vh] w-full overflow-hidden">
                <img src={basicInfo.img} className="w-full h-full object-cover" alt={basicInfo.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464] via-[#1B1464]/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full px-4 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 text-sm text-gold-400 mb-2 font-semibold tracking-wide">
                            <Link to="/explore" className="hover:underline flex items-center gap-1">
                                {isRTL && <span className="iconify" data-icon="solar:arrow-right-linear"></span>}
                                {t.place.back}
                                {!isRTL && <span className="iconify" data-icon="solar:arrow-right-linear"></span>}
                            </Link>
                            <span className="text-gray-400">/</span>
                            {/* @ts-ignore */}
                            <span>{t.explore[basicInfo.cat.toLowerCase()] || basicInfo.cat}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl">{placeData.name}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90">
                            <span className="flex items-center gap-2"><span className="iconify text-gold-400" data-icon="solar:map-point-bold"></span> {t.explore.region}</span>
                            <span className="flex items-center gap-2"><span className="iconify text-yellow-400" data-icon="solar:star-bold"></span> {basicInfo.rating} ({basicInfo.reviews} {t.place.reviews_suffix})</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-12">
                    <section className="animate-on-scroll">
                        <h2 className="text-2xl font-bold text-white mb-4">{t.place.about_title}</h2>
                        <p className="text-blue-100/80 leading-relaxed text-lg">
                            {placeData.desc}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                            {[
                                { icon: icons.h1, label: placeData.highlights.h1 },
                                { icon: icons.h2, label: placeData.highlights.h2 },
                                { icon: icons.h3, label: placeData.highlights.h3 },
                                { icon: icons.h4, label: placeData.highlights.h4 }
                            ].map((h, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                                    <span className="iconify w-8 h-8 text-gold-400 mx-auto mb-2" data-icon={h.icon}></span>
                                    <span className="text-sm text-white font-medium">{h.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="animate-on-scroll">
                        <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
                            {galleryImages.map((img: string, i: number) => (
                                <div key={i} className={`rounded-2xl overflow-hidden group relative ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''} shadow-lg`}>
                                    <img src={img} alt={`${placeData.name} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-[#1B1464]/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-white shadow-2xl">
                            <h3 className="font-bold mb-4">{t.place.facts_title}</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">{t.place.facts_labels.distance}</span><span className="font-semibold">{placeData.facts.dist}</span></li>
                                <li className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">{t.place.facts_labels.altitude}</span><span className="font-semibold">{placeData.facts.alt}</span></li>
                                <li className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">{t.place.facts_labels.duration}</span><span className="font-semibold">{placeData.facts.dur}</span></li>
                                <li className="flex justify-between"><span className="text-gray-400">{t.place.facts_labels.season}</span><span className="font-semibold">{placeData.facts.seas}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlaceDetails;
