import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navConfig, routeTranslations } from '../routes';
import { Tip } from '../components/tip/Tip';
import { Gamepad2, LucideIcon } from 'lucide-react';

type ActivityItem = {
    key: string;
    path: string;
    icon: LucideIcon;
    label: string;
    description: string;
};

export const ActivitiesPage = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const routes = routeTranslations[lang] || routeTranslations.en;

    const activities = useMemo<ActivityItem[]>(() => {
        return navConfig
            .filter(config => config.key !== 'activities')
            .map(config => ({
                key: config.key,
                path: config.key === 'activities' ? '/' : `/${routes[config.key]}`,
                icon: config.icon,
                label: `sidebar.${config.key}`,
                description: `activities.descriptions.${config.key}`,
            }));
    }, [lang, routes]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 mb-3 flex items-center justify-center gap-3">
                        <Gamepad2 size={60} className="text-primary-500" />
                        {t('activities.title')}
                    </h1>
                    <p className="text-lg text-text-600 max-w-2xl mx-auto">
                        {t('activities.subtitle')}
                    </p>
                </div>

                {/* Activity Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {activities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <Link
                                key={activity.key}
                                to={activity.path}
                                className="group block"
                            >
                                <div className="bg-white rounded-2xl shadow-lg border-2 border-surface-200 p-6 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-primary-300">
                                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 group-hover:from-primary-200 group-hover:to-accent-200 transition-colors">
                                        <Icon size={32} className="text-primary-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-center text-text-800 mb-2 group-hover:text-primary-700 transition-colors">
                                        {t(activity.label)}
                                    </h2>
                                    <p className="text-sm text-center text-text-500 group-hover:text-text-600 transition-colors">
                                        {t(activity.description, { defaultValue: '' })}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Tip */}
                <div className="mt-12 flex justify-center">
                    <Tip>
                        {t('activities.tip')}
                    </Tip>
                </div>
            </div>
        </div>
    );
};
