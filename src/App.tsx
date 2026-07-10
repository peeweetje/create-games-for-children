import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { getAllRouteEntries, pageComponents } from './routes';

function App() {
    const routeEntries = getAllRouteEntries();

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {routeEntries.map((entry) => {
                        const Component = pageComponents[entry.key];
                        return (
                            <Route
                                key={entry.path}
                                path={entry.path}
                                element={
                                    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                                        <Component />
                                    </Suspense>
                                }
                            />
                        );
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

