
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';

const Explore: React.FC = () => {
    const navigate = useNavigate();
    const { t, isRTL } = useLanguage();
    const { destinations } = useData();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDestinations = destinations.filter(place => {
        // @ts-ignore
        const placeName = t.places_data[place.id]?.name || place.name;
        const matchesSearch = placeName.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedCategory === "All") return matchesSearch;
        if (selectedCategory === "Essentials") return matchesSearch && place.rating >= 4.8;
        return matchesSearch && place.cat.includes(selectedCategory);
    });

    const categories = [
        { id: 'All', name: t.explore.all_places, icon: 'solar:stars-minimalistic-bold' },
        { id: 'Essentials', name: t.explore.essentials, icon: 'solar:star-bold' },
        { id: 'Nature', name: t.explore.outdoors, icon: 'solar:mountains-bold' },
        { id: 'Shopping', name: t.explore.shopping, icon: 'solar:bag-heart-bold' },
        { id: 'Culture', name: t.explore.culture, icon: 'solar:gallery-bold' },
    ];

    const currentCategoryName = categories.find(c => c.id === selectedCategory)?.name || t.explore.all_places;

    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-10 md:pb-20 min-h-screen flex flex-col justify-center items-center overflow-visible z-40">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src="https://wallpapercrafter.com/desktop4/1173867-forest-mountains-lake-Kazakhstan-Kolsay-Lake-Tien.jpg"
                        alt="Almaty Nature"
                        className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1B1464]"></div>
                </div>

                {/* Floating Weather Card */}
                <div className={`absolute top-32 ${isRTL ? 'left-6 md:left-20' : 'right-6 md:right-20'} animate-float z-10 hidden sm:block`}>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
                        <div className="bg-gold-400/20 p-2 rounded-full text-gold-400">
                            <span className="iconify w-8 h-8" data-icon="solar:cloud-sun-bold-duotone"></span>
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg">12°C</p>
                            <p className="text-blue-100 text-xs">{t.hero.weather_label}</p>
                        </div>
                    </div>
                </div>

                <div className="text-center z-10 max-w-4xl px-4 mb-12 mt-16 animate-on-scroll">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-2xl shadow-black text-white">
                        {t.explore.title} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 filter drop-shadow-lg">{t.explore.title_highlight}</span>
                    </h1>
                    <p className="text-white text-lg md:text-xl font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] max-w-2xl mx-auto">
                        {t.explore.subtitle}
                    </p>
                </div>
            </section>

            <main className="pb-20 px-4 md:px-8 max-w-7xl mx-auto -mt-20 relative z-50">
                {/* FILTER & SEARCH SECTION */}
                <section className="mb-12 animate-on-scroll relative z-30">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">{t.explore.filter_title} <span className="text-gold-400">{t.explore.filter_highlight}</span></h2>
                            <p className="text-gray-400 text-sm">{t.explore.filter_desc}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Search Bar */}
                            <div className="relative w-full sm:w-72">
                                <input
                                    type="text"
                                    placeholder={t.explore.search_placeholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#1B1464]/80 backdrop-blur border border-white/20 text-white px-5 py-3 rounded-xl focus:outline-none focus:border-gold-400 transition-colors placeholder-gray-400 text-sm"
                                />
                                <span className={`absolute top-1/2 -translate-y-1/2 text-gold-400 iconify w-5 h-5 ${isRTL ? 'left-4' : 'right-4'}`} data-icon="solar:magnifer-linear"></span>
                            </div>

                            {/* Category Dropdown */}
                            <div className="relative w-full sm:w-72">
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-[#1B1464] border border-gold-400 text-white px-5 py-3 rounded-xl flex items-center justify-between font-bold hover:bg-[#241a7a] transition-all shadow-lg group text-sm">
                                    <span>{currentCategoryName}</span>
                                    <span className="iconify w-4 h-4 text-gold-400 transform group-hover:rotate-180 transition-transform duration-300" data-icon="solar:alt-arrow-down-bold"></span>
                                </button>

                                {/* Dropdown - z-[999] */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[#0F0C29] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[999] text-sm">
                                        <ul className="text-gray-300">
                                            {categories.map(cat => (
                                                <li key={cat.id}>
                                                    <button
                                                        className="w-full text-left px-5 py-3 hover:bg-[#1B1464] hover:text-gold-400 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                                                        onClick={() => { setSelectedCategory(cat.id); setIsDropdownOpen(false); }}
                                                    >
                                                        <span className="iconify" data-icon={cat.icon}></span> {cat.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* GRID SECTION */}
                <section className="mb-20 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDestinations.map(place => {
                            // @ts-ignore
                            const placeName = t.places_data[place.id]?.name || place.name;
                            const catKey = place.cat.toLowerCase() === 'nature' ? 'outdoors' : place.cat.toLowerCase();

                            return (
                                <div key={place.id} onClick={() => navigate(`/place-details?id=${place.id}`)} className="spotlight-wrapper rounded-[1.5rem] p-[1px] group cursor-pointer h-full animate-on-scroll">
                                    <div className="spotlight-content rounded-[1.5rem] overflow-hidden bg-[#1B1464]/90 h-full flex flex-col">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={place.img}
                                                alt={placeName}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition text-white hover:text-red-500">
                                                <span className="iconify" data-icon="solar:heart-linear"></span>
                                            </button>
                                            <div className="absolute bottom-3 left-3 bg-[#1B1464]/80 backdrop-blur px-2 py-1 rounded text-[10px] text-gold-400 font-bold uppercase tracking-wider border border-gold-400/20">
                                                {/* @ts-ignore */}
                                                {t.explore[catKey] || place.cat}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">{placeName}</h4>
                                                <div className="flex items-center gap-1 mb-2">
                                                    <div className="flex text-green-500 text-xs">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className="iconify" data-icon={i < Math.floor(place.rating) ? "solar:star-bold" : "solar:star-bold-duotone"}></span>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-gray-400">({place.reviews})</span>
                                                </div>
                                            </div>
                                            <div className="text-xs text-blue-200/60 mt-2 flex items-center gap-1">
                                                <span className="iconify" data-icon="solar:map-point-linear"></span> {t.explore.region}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Explore;
