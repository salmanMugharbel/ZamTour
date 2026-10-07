import React from 'react';

interface PackageCardProps {
    id: string;
    title: string;
    image: string;
    fallbackImage: string;
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
    fallbackImage,
    price,
    priceLabel,
    duration,
    tier,
    onSelect
}) => {
    const badgeText = tier === 'premium' ? 'Top pick' : 'Popular';
    const [isSaved, setIsSaved] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState(
        !image || image.startsWith('https://welcome.shymbulak.com/') ? fallbackImage : image
    );

    React.useEffect(() => {
        setImageSrc(!image || image.startsWith('https://welcome.shymbulak.com/') ? fallbackImage : image);
    }, [image, fallbackImage]);

    return (
        <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-lg">
            <div className="relative aspect-[1.6/1] overflow-hidden bg-slate-100">
                <img
                    src={imageSrc}
                    alt={title}
                    onError={() => setImageSrc(fallbackImage)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                    type="button"
                    onClick={() => setIsSaved(value => !value)}
                    className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white text-slate-800 shadow-sm transition-colors hover:text-red-500"
                    aria-label={isSaved ? 'Remove saved package' : 'Save package'}
                    aria-pressed={isSaved}
                >
                    <span className="iconify text-lg" data-icon={isSaved ? 'solar:heart-bold' : 'solar:heart-linear'}></span>
                </button>

                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-[#10223f] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    {badgeText}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-3.5">
                <div className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    <span>Almaty</span>
                    <span className="text-slate-300" aria-hidden="true">•</span>
                    <span>{tier === 'premium' ? 'Premium experience' : 'Flexible booking'}</span>
                </div>

                <h2 className="min-h-[3rem] text-lg font-bold leading-snug text-slate-900 line-clamp-2">
                    {title}
                </h2>

                <div className="mt-2 flex items-center gap-1.5">
                    <div className="flex items-center text-yellow-500">
                        <span className="iconify text-sm" data-icon="solar:star-bold"></span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">4.9</span>
                    <span className="text-sm text-slate-500">(2,371)</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        <span className="iconify text-[12px] text-[#1B1464]" data-icon="solar:clock-circle-bold"></span>
                        {duration}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        <span className="iconify text-[12px] text-[#1B1464]" data-icon="solar:map-arrow-bold"></span>
                        Pickup available
                    </span>
                </div>

                <div className="mt-auto pt-3">
                    <div className="flex items-end justify-between gap-2 border-t border-slate-200 pt-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                From
                            </span>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-extrabold text-[#1B1464]">${price}</span>
                                <span className="text-xs text-slate-500">{priceLabel}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => onSelect(id)}
                            className="rounded-md bg-[#1B1464] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#2f2a7a]"
                        >
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PackageCard;
