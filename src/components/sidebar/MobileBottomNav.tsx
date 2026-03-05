import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navConfig, routeTranslations } from '../../routes';
import { useLanguageSwitch } from '../../hooks/useNavigation';
import { useMemo, useState } from 'react';
import { LanguageSwitch } from '../sidebar/LanguageSwitch';
import { Languages, MoreHorizontal } from 'lucide-react';

type NavItem = {
    path: string;
    label: string;
    icon: typeof Languages;
};

export const MobileBottomNav = () => {
    const { t } = useTranslation();
    const { currentLanguage: lang } = useLanguageSwitch();
    const [showMore, setShowMore] = useState(false);

    // Generate navigation items based on current language
    const navItems = useMemo<NavItem[]>(() => {
        const routes = routeTranslations[lang] || routeTranslations.en;
        return navConfig.map(config => ({
            path: config.key === 'play' ? '/' : `/${routes[config.key]}`,
            label: `sidebar.${config.key}`,
            icon: config.icon,
        }));
    }, [lang]);

    // Split items into main and overflow based on screen width
    const mainItems = navItems.slice(0, 3); // Show first 3 items
    const overflowItems = navItems.slice(3); // Remaining items go to "more"

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50 pb-safe">
            <ul className="flex items-center h-16 relative">
                {/* Main navigation items */}
                {mainItems.map((item) => (
                    <li key={item.path} className="flex-1">
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium transition-colors ${
                                    isActive ? 'text-violet-400' : 'text-gray-400'
                                }`
                            }
                        >
                            <item.icon size={24} className="text-violet-400" />
                            <span>{t(item.label)}</span>
                        </NavLink>
                    </li>
                ))}
                
                {/* More button */}
                <li className="flex-1 relative">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium text-gray-400 transition-colors hover:text-violet-400"
                    >
                        <MoreHorizontal size={24} className="text-violet-400" />
                        <span>{t('sidebar.more')}</span>
                    </button>
                    
                    {/* Overflow dropdown */}
                    {showMore && (
                        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 min-w-[120px] z-50">
                            {overflowItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setShowMore(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${
                                            isActive ? 'text-violet-400 bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    <item.icon size={20} />
                                    <span>{t(item.label)}</span>
                                </NavLink>
                            ))}
                            <div className="border-t border-gray-600 my-1"></div>
                            <div className="px-4 py-2">
                                <LanguageSwitch variant="dropdown" />
                            </div>
                        </div>
                    )}
                </li>
            </ul>
            
            {/* Close dropdown when clicking outside */}
            {showMore && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMore(false)}
                />
            )}
        </nav>
    );
};
