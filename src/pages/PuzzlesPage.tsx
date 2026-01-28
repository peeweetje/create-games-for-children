import { useTranslation } from 'react-i18next';

export const PuzzlesPage = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-orange-50">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">{t('puzzles.title') || '🧩 Puzzles'}</h1>
            <p className="text-xl text-gray-700">{t('puzzles.comingSoon') || 'Coming soon! Solve fun chess puzzles here.'}</p>
        </div>
    );
};
