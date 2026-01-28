import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PlayPage } from './pages/PlayPage';
import { LearnPage } from './pages/LearnPage';
import { PuzzlesPage } from './pages/PuzzlesPage';

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PlayPage />} />
                    <Route path="learn" element={<LearnPage />} />
                    <Route path="puzzles" element={<PuzzlesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

