import React from 'react';
import { useLanguage } from '../LanguageContext';

interface ItineraryCardProps {
    dayNumber: number;
    title: string;
    subtitle?: string;
    description: string;
    activities: string[];
    image: string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
    dayNumber,
    title,
    subtitle,
    description,
    activities,
    image
}) => {
    const { isRTL } = useLanguage();

    return (
        <div className="bg-[#1B1464]/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden mb-8 flex flex-col md:flex-row h-auto md:h-64 animate-on-scroll group hover:border-gold-400/50 transition-all duration-300">
            {/* Image Section */}
            <div className={`w-full md:w-1/3 relative h-48 md:h-full order-1 ${isRTL ? 'md:order-1' : 'md:order-1'}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464] to-transparent opacity-60 md:opacity-30"></div>
            </div>

            {/* Content Section */}
            <div className={`w-full md:w-2/3 p-6 flex flex-col relative order-2 ${isRTL ? 'md:order-2' : 'md:order-2'}`}>
                {/* Day Header */}
                <div className={`flex justify-between items-center mb-2 border-b-2 border-dashed border-white/10 pb-2`}>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="iconify text-gold-400" data-icon="solar:calendar-mark-bold-duotone"></span>
                        {isRTL ? `اليوم ${dayNumber}` : `Day ${dayNumber}`}
                    </h3>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gold-400 mb-4">
                    {title}
                </h4>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Activities List */}
                <ul className="space-y-2 overflow-y-auto flex-1 custom-scrollbar">
                    {activities.map((act, i) => {
                        const [icon, text] = act.includes('|') ? act.split('|') : ['', act];
                        return (
                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm font-medium">
                                <span className="text-gold-400 mt-1">•</span>
                                <div>{text || act}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ItineraryCard;
