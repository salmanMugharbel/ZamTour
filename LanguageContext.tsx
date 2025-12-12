
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';

export type Language = 'en' | 'ru' | 'ar';
type Translations = typeof translations.en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
    dir: 'ltr' | 'rtl';
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default language set to Arabic ('ar')
    const [language, setLanguage] = useState<Language>('ar');

    const t = translations[language];
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    const isRTL = language === 'ar';

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [dir, language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
