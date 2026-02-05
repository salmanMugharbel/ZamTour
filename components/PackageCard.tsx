import React from 'react';

interface PackageCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    priceLabel: string;
    duration: string;
    tier: 'standard' | 'premium';
    onSelect: (id: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
    id,
    title,
    image,
    price,
    priceLabel,
    duration,
    tier,
    onSelect
}) => {
    return (
        <div className="bg-[#1B1464]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-gold-400/50 transition-all duration-300 flex flex-col h-full group">
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464] to-transparent opacity-60"></div>
                <button className="absolute top-3 right-3 text-white/80 hover:text-red-500 transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm">
                    <span className="iconify text-xl" data-icon="solar:heart-bold"></span>
                </button>
                {tier === 'premium' && (
                    <div className="absolute top-3 left-3 bg-gold-400 text-[#1B1464] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <span className="iconify" data-icon="solar:crown-star-bold"></span>
                        PREMIUM
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1 relative">
                <h3 className="text-white font-bold text-xl leading-tight mb-3 line-clamp-2 min-h-[3.5rem]">
                    {title}
                </h3>

                {/* Reviews Placeholder */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-gold-400 text-sm">
                        <span className="iconify" data-icon="solar:star-bold"></span>
                        <span className="iconify" data-icon="solar:star-bold"></span>
                        <span className="iconify" data-icon="solar:star-bold"></span>
                        <span className="iconify" data-icon="solar:star-bold"></span>
                        <span className="iconify" data-icon="solar:star-bold"></span>
                    </div>
                    <span className="text-gray-400 text-xs">(0 reviews)</span>
                </div>

                <div className="mt-auto border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-gray-300 text-sm mb-3">
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                            <span className="iconify text-gold-400" data-icon="solar:clock-circle-bold"></span>
                            <span>{duration}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400">Starting from</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-gold-400">${price}</span>
                                <span className="text-xs text-gray-400">{priceLabel}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => onSelect(id)}
                            className={`
                                px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg
                                ${tier === 'premium'
                                    ? 'bg-gold-400 text-[#1B1464] hover:bg-white hover:scale-105'
                                    : 'bg-white/10 text-white hover:bg-gold-400 hover:text-[#1B1464]'}
                            `}
                        >
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
