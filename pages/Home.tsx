
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Home: React.FC = () => {
    const { t, isRTL } = useLanguage();

    const COUNTRIES = {
        arab: [
            { code: 'SA', name: t.countries.saudi_arabia, flag: '🇸🇦' },
            { code: 'AE', name: t.countries.uae, flag: '🇦🇪' },
            { code: 'QA', name: t.countries.qatar, flag: '🇶🇦' },
            { code: 'KW', name: t.countries.kuwait, flag: '🇰🇼' },
            { code: 'OM', name: t.countries.oman, flag: '🇴🇲' },
            { code: 'BH', name: t.countries.bahrain, flag: '🇧🇭' },
            { code: 'EG', name: t.countries.egypt, flag: '🇪🇬' },
            { code: 'JO', name: t.countries.jordan, flag: '🇯🇴' },
            { code: 'LB', name: t.countries.lebanon, flag: '🇱🇧' },
            { code: 'IQ', name: t.countries.iraq, flag: '🇮🇶' },
            { code: 'MA', name: t.countries.morocco, flag: '🇲🇦' },
            { code: 'DZ', name: t.countries.algeria, flag: '🇩🇿' },
            { code: 'TN', name: t.countries.tunisia, flag: '🇹🇳' },
            { code: 'LY', name: t.countries.libya, flag: '🇱🇾' },
            { code: 'YE', name: t.countries.yemen, flag: '🇾🇪' },
            { code: 'PS', name: t.countries.palestine, flag: '🇵🇸' },
            { code: 'SY', name: t.countries.syria, flag: '🇸🇾' },
            { code: 'SD', name: t.countries.sudan, flag: '🇸🇩' },
            { code: 'MR', name: t.countries.mauritania, flag: '🇲🇷' },
        ],
        other: [
            { code: 'US', name: t.countries.usa, flag: '🇺🇸' },
            { code: 'GB', name: t.countries.uk, flag: '🇬🇧' },
            { code: 'IN', name: t.countries.india, flag: '🇮🇳' },
            { code: 'CN', name: t.countries.china, flag: '🇨🇳' },
            { code: 'RU', name: t.countries.russia, flag: '🇷🇺' },
            { code: 'OT', name: t.countries.other, flag: '🌍' },
        ]
    };

    // Weather State
    const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);

    // Country Logic
    const [country, setCountry] = useState('');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    // Duration Logic
    const [duration, setDuration] = useState<number | ''>('');
    const durationText = duration ? `${duration} Days` : '';

    // Travelers Logic
    const [isTravelerDropdownOpen, setIsTravelerDropdownOpen] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const travelerDropdownRef = useRef<HTMLDivElement>(null);

    // Carousel Logic
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);

    const tips = [
        { icon: 'solar:dollar-minimalistic-bold-duotone', title: t.tips.currency, text: t.tips.currency_desc },
        { icon: 'solar:chat-round-bold-duotone', title: t.tips.language, text: t.tips.language_desc },
        { icon: 'solar:plug-circle-bold-duotone', title: t.tips.electricity, text: t.tips.electricity_desc },
        { icon: 'solar:ambulance-bold-duotone', title: t.tips.emergency, text: t.tips.emergency_desc },
        { icon: 'solar:taxi-bold-duotone', title: t.tips.taxi, text: t.tips.taxi_desc },
        { icon: 'solar:card-bold-duotone', title: t.tips.transport_card, text: t.tips.transport_card_desc },
        { icon: 'solar:sim-card-bold-duotone', title: t.tips.sim, text: t.tips.sim_desc },
    ];

    useEffect(() => {
        // Fetch Almaty weather (coordinates: 43.2220, 76.8512)
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=43.2220&longitude=76.8512&current=temperature_2m,weather_code&timezone=Asia/Almaty'
                );
                const data = await response.json();

                if (data.current) {
                    const temp = Math.round(data.current.temperature_2m);
                    const weatherCode = data.current.weather_code;

                    // Simple weather condition mapping
                    let condition = 'Clear';
                    if (weatherCode >= 61 && weatherCode <= 67) condition = 'Rainy';
                    else if (weatherCode >= 71 && weatherCode <= 77) condition = 'Snowy';
                    else if (weatherCode >= 80 && weatherCode <= 82) condition = 'Rainy';
                    else if (weatherCode >= 51 && weatherCode <= 55) condition = 'Drizzle';
                    else if (weatherCode >= 1 && weatherCode <= 3) condition = 'Cloudy';

                    setWeather({ temp, condition });
                }
            } catch (error) {
                console.error('Failed to fetch weather:', error);
                // Fallback to default
                setWeather({ temp: 12, condition: 'Clear' });
            }
        };

        fetchWeather();

        const handleResize = () => {
            setItemsToShow(window.innerWidth >= 768 ? 2 : 1);
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);

        // Click outside handler
        const handleClickOutside = (event: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
            if (travelerDropdownRef.current && !travelerDropdownRef.current.contains(event.target as Node)) {
                setIsTravelerDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const maxIndex = Math.max(0, tips.length - itemsToShow);
    const nextTip = () => setCurrentTipIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    const prevTip = () => setCurrentTipIndex(prev => (prev > 0 ? prev - 1 : maxIndex));

    const handleCountrySelect = (name: string, flag: string) => {
        setCountry(`${name} ${flag}`);
        setIsCountryDropdownOpen(false);
    };

    const handleInquire = () => {
        const phone = "77078382129";
        const msg = `Hello ZamTour! I'm planning a trip to Almaty.
        
Country: ${country || 'Not specified'}
Duration: ${duration ? duration + ' days' : 'Not specified'}
Travelers: ${adults} Adults, ${children} Children`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="w-full">
            {/* HERO SECTION - Updated z-40 to stay above info section */}
            <section id="explore" className="relative pt-32 pb-10 md:pb-20 min-h-screen flex flex-col justify-center items-center overflow-visible z-40">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src="https://wallpapercrafter.com/desktop4/1173867-forest-mountains-lake-Kazakhstan-Kolsay-Lake-Tien.jpg"
                        alt="Kolsay Lake Kazakhstan"
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
                            <p className="text-white font-bold text-lg">
                                {weather ? `${weather.temp}°C` : '...'}
                            </p>
                            <p className="text-blue-100 text-xs">{t.hero.weather_label}</p>
                        </div>
                    </div>
                </div>

                <div className="text-center z-10 max-w-4xl px-4 mb-12 mt-16 animate-on-scroll">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-2xl shadow-black text-white">
                        {t.hero.title_prefix} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 filter drop-shadow-lg">{t.hero.title_highlight}</span>
                    </h1>
                    <p className="text-white text-lg md:text-xl font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] max-w-2xl mx-auto">
                        {t.hero.subtitle}
                    </p>
                </div>

                {/* INPUT BAR - INCREASED z-index to 60, dropdowns to 999 */}
                <div className="relative w-full max-w-5xl px-4 z-[60] animate-on-scroll" style={{ animationDelay: '200ms' }}>
                    <div className="bg-white rounded-[2rem] p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center gap-4">

                        {/* 1. Country Selection */}
                        <div
                            className="relative flex-1 w-full bg-blue-50 rounded-2xl px-4 py-3 border border-transparent hover:border-brand-light/30 transition-colors group cursor-pointer"
                            ref={countryDropdownRef}
                        >
                            <div className="flex items-center gap-3" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}>
                                <span className="iconify text-brand-light w-5 h-5" data-icon="solar:earth-bold-duotone"></span>
                                <input
                                    type="text"
                                    value={country}
                                    readOnly
                                    placeholder={t.search.country_placeholder}
                                    className="bg-transparent w-full outline-none text-brand-dark font-bold placeholder-gray-400 cursor-pointer"
                                />
                                <span className={`iconify text-gray-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} data-icon="solar:alt-arrow-down-linear"></span>
                            </div>

                            {/* Country Dropdown - z-[999] */}
                            {isCountryDropdownOpen && (
                                <div className={`absolute top-full mt-2 w-full bg-white text-gray-900 rounded-2xl shadow-2xl py-2 z-[999] border border-gray-100 max-h-80 overflow-y-auto custom-scrollbar ${isRTL ? 'right-0' : 'left-0'}`}>
                                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.search.arab_countries}</div>
                                    {COUNTRIES.arab.map((c) => (
                                        <div
                                            key={c.code}
                                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors"
                                            onClick={() => handleCountrySelect(c.name, c.flag)}
                                        >
                                            <span className="text-lg">{c.flag}</span>
                                            <span className="font-semibold text-brand-dark">{c.name}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t.search.other_countries}</div>
                                    {COUNTRIES.other.map((c) => (
                                        <div
                                            key={c.code}
                                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors"
                                            onClick={() => handleCountrySelect(c.name, c.flag)}
                                        >
                                            <span className="text-lg">{c.flag}</span>
                                            <span className="font-semibold text-brand-dark">{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

                        {/* 2. Duration */}
                        <div className="flex-1 w-full bg-blue-50 rounded-2xl px-4 py-3 border border-transparent hover:border-brand-light/30 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="iconify text-brand-light w-5 h-5" data-icon="solar:calendar-date-bold-duotone"></span>
                                <div className="flex flex-col justify-center w-full">
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.search.duration_label}</span>
                                    <input
                                        type="number"
                                        placeholder="e.g. 5"
                                        className="bg-transparent w-full outline-none text-brand-dark font-bold placeholder-gray-400 cursor-pointer"
                                        min="1"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value ? parseInt(e.target.value) : '')}
                                    />
                                    <span className="text-[10px] text-brand-light font-semibold h-3 block">{durationText}</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

                        {/* 3. Travelers */}
                        <div
                            className="relative flex-1 w-full bg-blue-50 rounded-2xl px-4 py-3 border border-transparent hover:border-brand-light/30 transition-colors group cursor-pointer"
                            ref={travelerDropdownRef}
                        >
                            <div className="flex items-center gap-3" onClick={() => setIsTravelerDropdownOpen(!isTravelerDropdownOpen)}>
                                <span className="iconify text-brand-light w-5 h-5" data-icon="solar:users-group-rounded-bold-duotone"></span>
                                <div className="flex flex-col justify-center w-full">
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.search.travelers_label}</span>
                                    <input type="text" value={`${adults} ${t.search.adults}, ${children} ${t.search.children}`} readOnly className="bg-transparent w-full outline-none text-brand-dark font-bold cursor-pointer select-none" />
                                </div>
                                <span className={`iconify text-gray-400 transition-transform ${isTravelerDropdownOpen ? 'rotate-180' : ''}`} data-icon="solar:alt-arrow-down-linear"></span>
                            </div>

                            {/* Travelers Dropdown - z-[999] */}
                            {isTravelerDropdownOpen && (
                                <div
                                    className={`absolute top-full mt-2 w-72 bg-white text-gray-900 rounded-2xl shadow-xl p-6 z-[999] border border-gray-100 ${isRTL ? 'right-0' : 'left-0'}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h4 className="font-bold text-lg mb-4 text-[#1B1464]">{t.search.travelers_label}</h4>

                                    {/* Adults */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <p className="font-bold text-[#1B1464] text-base">{t.search.adults}</p>
                                        </div>
                                        <div className="flex items-center gap-3" dir="ltr">
                                            <button
                                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-[#1B1464] font-bold transition-colors"
                                            >-</button>
                                            <span className="font-bold w-6 text-center text-lg">{adults}</span>
                                            <button
                                                onClick={() => setAdults(adults + 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-[#1B1464] font-bold transition-colors"
                                            >+</button>
                                        </div>
                                    </div>

                                    {/* Children */}
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <p className="font-bold text-[#1B1464] text-base">{t.search.children}</p>
                                        </div>
                                        <div className="flex items-center gap-3" dir="ltr">
                                            <button
                                                onClick={() => setChildren(Math.max(0, children - 1))}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-[#1B1464] font-bold transition-colors"
                                            >-</button>
                                            <span className="font-bold w-6 text-center text-lg">{children}</span>
                                            <button
                                                onClick={() => setChildren(children + 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-[#1B1464] font-bold transition-colors"
                                            >+</button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsTravelerDropdownOpen(false)}
                                        className="w-full bg-[#1B1464] text-white py-3 rounded-xl font-bold hover:bg-[#241a7a] transition-colors shadow-lg"
                                    >
                                        {t.search.apply}
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleInquire}
                            className="bg-gold-500 hover:bg-gold-600 text-white w-full lg:w-auto px-8 py-4 rounded-xl font-extrabold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <span className="iconify text-white" data-icon="solar:letter-bold-duotone"></span>
                            {t.search.inquire}
                        </button>
                    </div>
                </div>
            </section>

            {/* Explore CTA Section - Moved OUT of Hero Section */}
            <section className="relative z-30 mt-10 mb-20 px-4 flex justify-center w-full">
                <div className="w-full max-w-2xl">
                    <Link to="/explore" className="block group relative overflow-hidden rounded-3xl bg-[#1B1464] border border-white/20 hover:border-gold-400/50 transition-all duration-300 shadow-2xl hover:shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/20 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none group-hover:bg-gold-400/30 transition-colors"></div>

                        <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {/* Rotating Ring */}
                                <div className="absolute inset-0 border-2 border-dashed border-gold-400/50 rounded-full animate-[spin_10s_linear_infinite]"></div>

                                {/* Pulse Glow */}
                                <div className="absolute inset-0 bg-gold-400/20 rounded-full animate-pulse blur-md"></div>

                                {/* Main Icon Circle */}
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-lg flex items-center justify-center relative z-10">
                                    <span className="iconify text-[#1B1464] w-10 h-10" data-icon="solar:compass-bold-duotone"></span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                                    {t.explore.title} {t.explore.title_highlight}
                                </h3>
                                <p className="text-blue-100/80 text-sm md:text-base leading-relaxed mb-6">
                                    {t.explore.subtitle}
                                </p>
                                <span className="inline-flex items-center gap-2 text-gold-400 font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all">
                                    {t.nav.explore}
                                    <span className="iconify" data-icon="solar:arrow-right-linear"></span>
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* INFO & TIPS CAROUSEL */}
            <section className="relative py-24 z-30 max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12 animate-on-scroll">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{t.tips.title} <span className="text-gold-400">{t.tips.title_highlight}</span></h2>
                        <p className="text-blue-100/70 text-sm">{t.tips.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={isRTL ? nextTip : prevTip} className="p-3 rounded-full border border-white/20 hover:bg-gold-500 hover:text-brand-dark text-white transition backdrop-blur-sm"><span className="iconify" data-icon={isRTL ? "solar:arrow-right-linear" : "solar:arrow-left-linear"}></span></button>
                        <button onClick={isRTL ? prevTip : nextTip} className="p-3 rounded-full border border-white/20 hover:bg-gold-500 hover:text-brand-dark text-white transition backdrop-blur-sm"><span className="iconify" data-icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"}></span></button>
                    </div>
                </div>

                <div className="overflow-hidden w-full">
                    <div
                        className="flex gap-6 transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(${isRTL ? '' : '-'}${currentTipIndex * (100 / itemsToShow)}%)` }}
                    >
                        {tips.map((tip, idx) => (
                            <div key={idx} className="flex-shrink-0" style={{ width: itemsToShow === 2 ? 'calc(50% - 12px)' : '100%' }}>
                                <div className="spotlight-wrapper rounded-2xl p-[1px] h-full">
                                    <div className="spotlight-content rounded-2xl p-6 flex flex-col h-full bg-[#1B1464]/90">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gold-400">
                                            <span className="iconify w-7 h-7" data-icon={tip.icon}></span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                                        <p className="text-blue-100/70 text-sm leading-relaxed">{tip.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages CTA Card */}
            <div className="flex justify-center pb-20 relative z-30 animate-on-scroll px-4">
                <Link to="/packages" className="block group relative overflow-hidden rounded-3xl bg-[#1B1464] border border-gold-400/30 hover:border-gold-400 transition-all duration-300 shadow-2xl w-full max-w-4xl hover:shadow-[0_0_60px_rgba(212,175,55,0.2)]">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/20 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[80px]"></div>

                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {t.packages.title} <span className="text-gold-400">{t.packages.title_highlight}</span>
                            </h2>
                            <p className="text-blue-100/80 text-lg mb-8 max-w-2xl">
                                {t.packages.subtitle}
                            </p>
                            <span className="inline-block bg-gold-400 text-[#1B1464] px-8 py-3 rounded-full font-bold text-lg shadow-lg group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                                {t.nav.packages}
                            </span>
                        </div>

                        {/* Visual Icon Group */}
                        <div className="relative w-40 h-40 shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-[#1B1464] rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute inset-2 border-2 border-dashed border-gold-400/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="iconify text-gold-400 w-20 h-20 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" data-icon="solar:box-minimalistic-bold-duotone"></span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
