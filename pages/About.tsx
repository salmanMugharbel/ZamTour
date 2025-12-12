
import React from 'react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();

    const services = [
        { icon: 'solar:plane-bold-duotone', title: t.about.services.arrival_title, desc: t.about.services.arrival_desc, color: 'text-blue-400', bg: 'bg-blue-500/20' },
        { icon: 'solar:bed-bold-duotone', title: t.about.services.stays_title, desc: t.about.services.stays_desc, color: 'text-purple-400', bg: 'bg-purple-500/20' },
        { icon: 'solar:wheel-bold-duotone', title: t.about.services.transport_title, desc: t.about.services.transport_desc, color: 'text-green-400', bg: 'bg-green-500/20' },
        { icon: 'solar:chat-round-line-bold-duotone', title: t.about.services.lang_title, desc: t.about.services.lang_desc, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
        { icon: 'solar:heart-bold-duotone', title: t.about.services.support_title, desc: t.about.services.support_desc, color: 'text-red-400', bg: 'bg-red-500/20' },
        { icon: 'solar:star-bold-duotone', title: t.about.services.unique_title, desc: t.about.services.unique_desc, color: 'text-teal-400', bg: 'bg-teal-500/20' }
    ];

    return (
        <div className="w-full">
            <section className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden w-full">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=2070&auto=format&fit=crop" 
                         alt="ZamTour Team" 
                         className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464] via-[#1B1464]/60 to-[#1B1464]/30"></div>
                </div>
                
                <div className="text-center z-10 max-w-4xl px-4 mt-20 animate-on-scroll">
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
                        {t.about.title_prefix} <span className="text-gold-400">{t.about.title_highlight}</span>
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium drop-shadow-md">
                        {t.about.subtitle}
                    </p>
                </div>
            </section>

            <main className="w-full">
                <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24 animate-on-scroll">
                        <div className="space-y-6">
                            <div className="inline-block bg-gold-400/20 text-gold-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2">{t.about.mission_tag}</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white">{t.about.mission_title}</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {t.about.mission_text_1}
                            </p>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {t.about.mission_text_2}
                            </p>
                        </div>
                        <div className="relative">
                            <div className="spotlight-wrapper rounded-[2rem] p-[1px] rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="spotlight-content rounded-[2rem] overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Travel Safe" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-24 animate-on-scroll">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.about.help_title} <span className="text-gold-400">{t.about.help_highlight}</span></h2>
                            <p className="text-blue-100">{t.about.help_subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {services.map((svc, i) => (
                                <div key={i} className="spotlight-wrapper rounded-2xl p-[1px] group">
                                    <div className="spotlight-content p-8 bg-[#1B1464]/80 flex flex-col items-start h-full">
                                        <div className={`w-14 h-14 ${svc.bg} rounded-2xl flex items-center justify-center ${svc.color} mb-6 group-hover:scale-110 transition-transform`}>
                                            <span className="iconify w-8 h-8" data-icon={svc.icon}></span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CALL TO ACTION */}
                    <div className="spotlight-wrapper rounded-[3rem] p-[1px] text-center animate-on-scroll">
                        <div className="spotlight-content rounded-[3rem] p-12 bg-gradient-to-r from-[#1B1464] to-[#0a0820] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">{t.about.cta_title}</h2>
                            <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10">
                                {t.about.cta_text}
                            </p>
                            <div className="relative z-10 flex justify-center gap-4">
                                <a href="https://wa.me/77078382129" className="bg-gold-400 text-[#1B1464] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-white transition-all flex items-center gap-2">
                                    <span className="iconify" data-icon="ic:baseline-whatsapp"></span> {t.about.cta_btn}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
