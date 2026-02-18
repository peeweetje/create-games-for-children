import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gamepad2 } from 'lucide-react';
import { navConfig, routeTranslations } from '../../routes';
import { useLanguageSwitch } from '../../hooks/useNavigation';
import { LanguageSwitch } from './LanguageSwitch';

type NavItem = {
    path: string;
    label: string;
    icon: typeof Gamepad2;
};

export const DesktopSidebar = () => {
    const { t } = useTranslation();
    const { currentLanguage: lang } = useLanguageSwitch();

    // Generate navigation items based on current language
    const navItems = useMemo<NavItem[]>(() => {
        const routes = routeTranslations[lang] || routeTranslations.en;
        return navConfig.map(config => ({
            path: config.key === 'play' ? '/' : `/${routes[config.key]}`,
            label: `sidebar.${config.key}`,
            icon: config.icon,
        }));
    }, [lang]);

    return (
        <aside className="hidden md:flex flex-col w-48 lg:w-64 bg-gray-900 min-h-screen text-gray-100 fixed left-0 top-0 z-50">
            <div className="p-4 mb-4">
                <h1 className="text-lg font-extrabold text-orange-300 tracking-wide leading-snug">
                    🦁 {t('sidebar.chess')} 🦄
                </h1>
            </div>

            <nav className="flex-1">
                <ul className="flex flex-col gap-2 p-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-md transition-all font-semibold ${
                                        isActive 
                                            ? 'bg-orange-300 text-white border-l-4 border-orange-500' 
                                            : 'hover:bg-orange-900 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon size={20} className="text-orange-400 shrink-0" />
                                <span className="text-base truncate">{t(item.label)}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 mt-auto border-t border-gray-700">
                <LanguageSwitch />
            </div>
        </aside>
    );
};
