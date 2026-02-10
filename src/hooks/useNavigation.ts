import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navConfig, routeTranslations } from '../routes';

// Detect current route key from path
export const detectCurrentRoute = (path: string): string => {
    for (const config of navConfig) {
        if (config.key === 'play') continue;
        const variations = Object.values(routeTranslations).map(r => r[config.key]);
        if (variations.some(v => path.includes(v))) {
            return config.key;
        }
    }
    return 'play';
};

// Hook for language switching with navigation
export const useLanguageSwitch = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const switchLanguage = useCallback((lng: string, currentKey: string) => {
        const newPath = currentKey === 'play' 
            ? '/' 
            : `/${routeTranslations[lng][currentKey]}`;
        
        i18n.changeLanguage(lng);
        navigate(newPath);
    }, [navigate, i18n]);

    return { switchLanguage, currentLanguage: i18n.language };
};
