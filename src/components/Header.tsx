import { useTranslation } from 'react-i18next';

export const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="mb-4 md:mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-violet-500 mb-2 drop-shadow-sm tracking-wide">
                🦁 {t('app.title')} 🦄
            </h1>
            <p className="text-base md:text-lg text-violet-400 font-medium">{t('app.subtitle')}</p>
        </header>
    );
};
