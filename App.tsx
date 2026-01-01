
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PlaceDetails from './pages/PlaceDetails';
import Packages from './pages/Packages';
import MyPackage from './pages/MyPackage';
import About from './pages/About';
import Admin from './pages/Admin';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { DataProvider } from './DataContext';
import ErrorBoundary from './components/ErrorBoundary';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const AppContent: React.FC = () => {
    const { language, isRTL } = useLanguage();

    // Global Spotlight Effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const wrappers = document.querySelectorAll('.spotlight-wrapper');
            wrappers.forEach((wrapper) => {
                const rect = (wrapper as HTMLElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (wrapper as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (wrapper as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
            });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Global Scroll Reveal Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        setTimeout(() => {
            document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
        }, 100);

        const mutationObserver = new MutationObserver(() => {
            document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(el => observer.observe(el));
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return (
        <div key={language} className={`flex flex-col min-h-screen relative ${isRTL ? 'font-arabic' : 'font-sans'}`}>
            <Header />
            <div className="flex-1 w-full">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/place-details" element={<PlaceDetails />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/my-package" element={<MyPackage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <DataProvider>
                <Router>
                    <ScrollToTop />
                    <ErrorBoundary>
                        <AppContent />
                    </ErrorBoundary>
                </Router>
            </DataProvider>
        </LanguageProvider>
    );
};

export default App;
