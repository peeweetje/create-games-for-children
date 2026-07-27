import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';

type ActivityCardProps = {
    key: string;
    path: string;
    icon: LucideIcon;
    label: string;
    description: string;
};

export const ActivityCard = ({ path, icon: Icon, label, description }: ActivityCardProps) => {
    const { t } = useTranslation();

    return (
        <Link to={path} className="group block">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-surface-200 p-6 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-primary-300">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 group-hover:from-primary-200 group-hover:to-accent-200 transition-colors">
                    <Icon size={32} className="text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-center text-text-800 mb-2 group-hover:text-primary-700 transition-colors">
                    {t(label)}
                </h2>
                <p className="text-sm text-center text-text-500 group-hover:text-text-600 transition-colors">
                    {t(description, { defaultValue: '' })}
                </p>
            </div>
        </Link>
    );
};