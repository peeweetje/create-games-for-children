import { useTranslation } from 'react-i18next';
import { detectCurrentRoute, useLanguageSwitch } from '../../hooks/useNavigation';
import { Languages } from 'lucide-react';

type LanguageSwitchProps = {
    variant?: 'desktop' | 'mobile' | 'dropdown';
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
                className={`flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium text-violet-400 ${className}`}
                title={t('language.switch')}
            >
                <Languages size={24} />
                <span>{isDutch ? t('language.english') : t('language.dutch')}</span>
            </button>
        );
    }

    if (variant === 'dropdown') {
        return (
            <div className="flex items-center gap-2 px-2 py-1">
                <Languages size={16} className="text-gray-400" />
                <button 
                    onClick={() => handleLanguageChange('en')} 
                    className={`text-sm font-medium hover:text-white transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-300'}`}
                >
                    {t('language.english')}
                </button>
                <span className="text-gray-500">|</span>
                <button 
                    onClick={() => handleLanguageChange('nl')} 
                    className={`text-sm font-medium hover:text-white transition-colors ${lang === 'nl' ? 'text-white' : 'text-gray-300'}`}
                >
                    {t('language.dutch')}
                </button>
            </div>
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
