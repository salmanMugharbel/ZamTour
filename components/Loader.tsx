import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="relative w-24 h-24">
                <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-lg"
                >
                    {/* Background Trace (faint) */}
                    <path
                        d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55"
                        stroke="#D4AF37"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-20"
                    />

                    {/* Animated Drawing Path */}
                    <path
                        d="M5 55 L28 32 L38 42 L50 12 L62 42 L72 32 L95 55"
                        stroke="#D4AF37"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="animate-draw-loop"
                        style={{
                            strokeDasharray: 200, // Length of the path
                            strokeDashoffset: 200
                        }}
                    />
                </svg>
            </div>

            <style>{`
                .animate-draw-loop {
                    animation: drawLoop 2s ease-in-out infinite;
                }
                
                @keyframes drawLoop {
                    0% {
                        stroke-dashoffset: 200;
                    }
                    50% {
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dashoffset: -200;
                    }
                }
            `}</style>
        </div>
    );
};

export default Loader;
