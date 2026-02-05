import React, { useEffect, useState } from 'react';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [startFill, setStartFill] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Timeline of animation
        // 0s: Start drawing stroke
        // 2s: Start filling color and fading in text
        // 3.5s: Fade out entire screen
        // 4s: Complete

        const fillTimer = setTimeout(() => setStartFill(true), 2000);
        const fadeTimer = setTimeout(() => setFadeOut(true), 3500);
        const completeTimer = setTimeout(onComplete, 4000);

        return () => {
            clearTimeout(fillTimer);
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#0F0C29] flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className="relative w-40 h-40 md:w-64 md:h-64">
                <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-2xl"
                >
                    {/* Animated Path */}
                    <path
                        d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55"
                        stroke="#D4AF37"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="logo-path"
                        style={{
                            strokeDasharray: 300,
                            strokeDashoffset: 300,
                            animation: 'drawPath 2.5s ease-out forwards'
                        }}
                    />
                    {/* Fill Layer (Fades in) */}
                    <path
                        d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55"
                        fill="rgba(212, 175, 55, 0.1)"
                        stroke="none"
                        className={`transition-opacity duration-1000 ${startFill ? 'opacity-100' : 'opacity-0'}`}
                    />
                </svg>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gold-400/20 blur-3xl rounded-full transition-opacity duration-1000 ${startFill ? 'opacity-50' : 'opacity-0'}`}></div>
            </div>

            {/* Text Animation */}
            <h1 className={`mt-8 text-4xl md:text-6xl font-extrabold text-white tracking-wider transform transition-all duration-1000 ${startFill ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Zam<span className="text-gold-400">Tour</span>
            </h1>

            <style>{`
                @keyframes drawPath {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
