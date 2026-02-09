import { useState, useMemo, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gamepad2, Languages } from 'lucide-react';
import { navConfig, routeTranslations } from '../routes';

type NavItem = {
    path: string;
    label: string;
    icon: typeof Gamepad2;
};

export const Sidebar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [lang, setLang] = useState(i18n.language);

    // Detect current route key from path
    const detectCurrentRoute = useCallback((path: string): string => {
        for (const config of navConfig) {
            if (config.key === 'play') continue;
            const variations = Object.values(routeTranslations).map(r => r[config.key]);
            if (variations.some(v => path.includes(v))) {
                return config.key;
            }
        }
        return 'play';
    }, []);

    // Switch language and navigate to translated route
    const changeLanguage = useCallback((lng: string) => {
        const currentKey = detectCurrentRoute(window.location.pathname);
        const newPath = currentKey === 'play' 
            ? '/' 
            : `/${routeTranslations[lng][currentKey]}`;
        
        i18n.changeLanguage(lng);
        setLang(lng);
        navigate(newPath);
    }, [detectCurrentRoute, i18n, navigate]);

    // Generate navigation items based on current language
    const navItems = useMemo<NavItem[]>(() => {
        const routes = routeTranslations[lang] || routeTranslations.en;
        return navConfig.map(config => ({
            path: config.key === 'play' ? '/' : `/${routes[config.key]}`,
            label: `sidebar.${config.key}`,
            icon: config.icon,
        }));
    }, [lang]);

    const isDutch = lang === 'nl';

    return (
        <>
            {/* Desktop Sidebar */}
<aside className="hidden md:flex flex-col w-48 lg:w-64 bg-gray-900 min-h-screen text-gray-100 fixed left-0 top-0 z-50">
                <div className="p-4 mb-4">
                    <h1 className="text-2xl font-extrabold text-orange-300 tracking-wide">
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
                                    <item.icon size={24} className="text-orange-400" />
                                    <span>{t(item.label)}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

<div className="p-4 mt-auto border-t border-gray-700">
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => changeLanguage('en')} 
                            className={`text-2xl hover:scale-110 transition-transform ${lang === 'en' ? 'opacity-100' : 'opacity-50'}`}
                            title="English"
                        >
                            en
                        </button>
                        <button 
                            onClick={() => changeLanguage('nl')} 
                            className={`text-2xl hover:scale-110 transition-transform ${lang === 'nl' ? 'opacity-100' : 'opacity-50'}`}
                            title="Nederlands"
                        >
                            🇳🇱
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
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
                            onClick={() => changeLanguage(isDutch ? 'en' : 'nl')}
                            className="flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium text-orange-400"
                        >
                            <Languages size={24} />
                            <span>{isDutch ? 'EN' : 'NL'}</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};
