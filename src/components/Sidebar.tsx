import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gamepad2, BookOpen, Puzzle, Languages } from 'lucide-react';

export const Sidebar = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const navItems = [
        { path: '/', label: 'sidebar.play', icon: Gamepad2, iconLabel: 'Play' },
        { path: '/puzzles', label: 'sidebar.puzzles', icon: Puzzle, iconLabel: 'Puzzles' },
        { path: '/learn', label: 'sidebar.learn', icon: BookOpen, iconLabel: 'Learn' },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-48 lg:w-64 bg-[#262522] min-h-screen text-[#c3c4c3] fixed left-0 top-0 z-50">
                <div className="p-4 mb-4">
                    <h1 className="text-2xl font-extrabold text-[#7fa650] tracking-wide">
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
                                        `flex items-center gap-3 px-4 py-3 rounded-md transition-all font-semibold ${isActive
                                            ? 'bg-[#3b3a37] text-white border-l-4 border-[#7fa650]'
                                            : 'hover:bg-[#2b2a27] hover:text-white'
                                        }`
                                    }
                                >
                                    <item.icon size={24} className="text-[#81b64c]" />
                                    <span>{t(item.label) || item.iconLabel}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 mt-auto border-t border-[#3b3a37]">
                    <div className="flex justify-center gap-4">
                        <button onClick={() => changeLanguage('en')} className={`text-2xl hover:scale-110 transition-transform ${i18n.language === 'en' ? 'opacity-100' : 'opacity-50'}`} title="English">🇬🇧</button>
                        <button onClick={() => changeLanguage('nl')} className={`text-2xl hover:scale-110 transition-transform ${i18n.language === 'nl' ? 'opacity-100' : 'opacity-50'}`} title="Nederlands">🇳🇱</button>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#262522] border-t border-[#3b3a37] z-50 pb-safe">
                <ul className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <li key={item.path} className="flex-1">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium transition-colors ${isActive
                                        ? 'text-[#81b64c]'
                                        : 'text-[#989795]'
                                    }`
                                }
                            >
                                <item.icon size={24} />
                                <span>{t(item.label) || item.iconLabel}</span>
                            </NavLink>
                        </li>
                    ))}
                    <li className="flex-1">
                        <div className="flex flex-col items-center justify-center h-full w-full gap-1 text-xs font-medium text-[#989795]" onClick={() => changeLanguage(i18n.language === 'en' ? 'nl' : 'en')}>
                            <Languages size={24} />
                            <span>{i18n.language === 'en' ? 'NL' : 'EN'}</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};
