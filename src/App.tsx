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
                                element={<Component />}
                            />
                        );
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

