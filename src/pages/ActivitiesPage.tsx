import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { navConfig, routeTranslations } from '../routes';
import { Tip } from '../components/tip/Tip';
import { Gamepad2, LucideIcon } from 'lucide-react';
import { ActivityCard } from '../components/activity-page/ActivityCard';

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
                    {activities.map((activity) => (
                        <ActivityCard
                            key={activity.key}
                            path={activity.path}
                            icon={activity.icon}
                            label={activity.label}
                            description={activity.description}
                        />
                    ))}
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
