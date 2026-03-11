import { Gamepad2, BookOpen, Puzzle, BookText, MemoryStick, Paintbrush } from 'lucide-react';
import { ComponentType } from 'react';
import { PlayPage } from './pages/PlayPage';
import { PuzzlesPage } from './pages/PuzzlesPage';
import { LearnPage } from './pages/LearnPage';
import { ReadingPage } from './pages/ReadingPage';
import { MemoryPage } from './pages/MemoryPage';
import { ColoringPage } from './pages/ColoringPage';

// Navigation configuration - easy to extend with new routes
export const navConfig = [
    { key: 'play', path: '/', icon: Gamepad2 },
    { key: 'puzzles', path: '/puzzles', icon: Puzzle },
    { key: 'learn', path: '/learn', icon: BookOpen },
    { key: 'reading', path: '/reading', icon: BookText },
    { key: 'memory', path: '/memory', icon: MemoryStick },
    { key: 'coloring', path: '/coloring', icon: Paintbrush },
];

// Route mappings for all supported languages
export const routeTranslations: Record<string, Record<string, string>> = {
    en: { puzzles: 'puzzles', learn: 'learn', reading: 'reading', memory: 'memory', coloring: 'coloring' },
    nl: { puzzles: 'puzzels', learn: 'leren', reading: 'lezen', memory: 'geheugen', coloring: 'kleurplaten' },
};

// Helper to get all route variations (merges all language routes)
export const allRouteVariations = Object.values(routeTranslations).reduce(
    (acc, routes) => ({ ...acc, ...routes }),
    {} as Record<string, string>
);

// Component map - maps route keys to page components
export const pageComponents: Record<string, ComponentType> = {
    play: PlayPage,
    puzzles: PuzzlesPage,
    learn: LearnPage,
    reading: ReadingPage,
    memory: MemoryPage,
    coloring: ColoringPage,
};

// Generate all route paths for a given route key (all language variations)
export const getRoutePaths = (key: string): string[] => {
    if (key === 'play') return ['/'];
    
    // Only generate paths for keys that exist in routeTranslations
    const validKeys = Object.values(routeTranslations)[0];
    if (!validKeys[key]) return [];
    
    return Object.values(routeTranslations).map(routes => `/${routes[key]}`);
};

// Generate all route entries for App.tsx
type RouteEntry = { path: string; key: string };
export const getAllRouteEntries = (): RouteEntry[] => {
    const entries: RouteEntry[] = [];
    navConfig.forEach(config => {
        if (config.key === 'play') {
            entries.push({ path: '/', key: 'play' });
        } else {
            const paths = getRoutePaths(config.key);
            paths.forEach(path => {
                if (path && path !== '/undefined') {
                    entries.push({ path, key: config.key });
                }
            });
        }
    });
    return entries;
};
