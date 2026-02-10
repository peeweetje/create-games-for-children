import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { navConfig, routeTranslations } from '../routes';
import { detectCurrentRoute, useLanguageSwitch } from '../hooks/useNavigation';
import { useMemo } from 'react';

type NavItem = {
    path: string;
    label: string;
    icon: typeof Languages;
};

export const MobileBottomNav = () => {
    const { t } = useTranslation();
    const { switchLanguage, currentLanguage: lang } = useLanguageSwitch();
    const isDutch = lang === 'nl';

    // Generate navigation items based on current language
    const navItems = useMemo<NavItem[]>(() => {
        const routes = routeTranslations[lang] || routeTranslations.en;
        return navConfig.map(config => ({
            path: config.key === 'play' ? '/' : `/${routes[config.key]}`,
            label: `sidebar.${config.key}`,
            icon: config.icon,
        }));
    }, [lang]);

    // Handle language change
    const handleLanguageChange = (lng: string) => {
        const currentKey = detectCurrentRoute(window.location.pathname);
        switchLanguage(lng, currentKey);
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50 pb-safe">
            <ul className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <li key={item.path} className="flex-1">
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium transition-colors ${
                                    isActive ? 'text-orange-400' : 'text-gray-400'
                                }`
                            }
                        >
                            <item.icon size={24} className="text-orange-400" />
                            <span>{t(item.label)}</span>
                        </NavLink>
                    </li>
                ))}
                <li className="flex-1">
                    <button
                        onClick={() => handleLanguageChange(isDutch ? 'en' : 'nl')}
                        className="flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium text-orange-400"
                    >
                        <Languages size={24} />
                        <span>{isDutch ? 'EN' : 'NL'}</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};
