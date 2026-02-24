import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar';

export const Layout = () => {
    return (
        <div className="flex min-h-screen bg-violet-50 font-sans text-gray-900">
            <Sidebar />
            <div className="flex-1 md:ml-48 lg:ml-64 w-full">
                <Outlet />
            </div>
        </div>
    );
};
