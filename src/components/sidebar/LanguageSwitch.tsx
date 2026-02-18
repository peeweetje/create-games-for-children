import { useTranslation } from 'react-i18next';
import { detectCurrentRoute, useLanguageSwitch } from '../../hooks/useNavigation';
import { Languages } from 'lucide-react';

type LanguageSwitchProps = {
    variant?: 'desktop' | 'mobile';
    className?: string;
};

export const LanguageSwitch = ({ 
    variant = 'desktop', 
    className = '' 
}: LanguageSwitchProps) => {
    const { t } = useTranslation();
    const { switchLanguage, currentLanguage: lang } = useLanguageSwitch();
    const isDutch = lang === 'nl';

    const handleLanguageChange = (lng: string) => {
        const currentKey = detectCurrentRoute(window.location.pathname);
        switchLanguage(lng, currentKey);
    };

    if (variant === 'mobile') {
        return (
            <button
                onClick={() => handleLanguageChange(isDutch ? 'en' : 'nl')}
                className={`flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium text-orange-400 ${className}`}
                title={t('language.switch')}
            >
                <Languages size={24} />
                <span>{isDutch ? t('language.english') : t('language.dutch')}</span>
            </button>
        );
    }

    return (
        <div className={`flex justify-center gap-4 ${className}`}>
            <button 
                onClick={() => handleLanguageChange('en')} 
                className={`text-2xl hover:scale-110 transition-transform ${lang === 'en' ? 'opacity-100' : 'opacity-50'}`}
                title={t('language.english')}
            >
                {t('language.english')}
            </button>
            <button 
                onClick={() => handleLanguageChange('nl')} 
                className={`text-2xl hover:scale-110 transition-transform ${lang === 'nl' ? 'opacity-100' : 'opacity-50'}`}
                title={t('language.dutch')}
            >
                {t('language.dutch')}
            </button>
        </div>
    );
};
