import { SidebarProvider } from '../../context/SidebarContext';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

const AdminLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
                {/* Sidebar */}
                <AppSidebar />

                {/* Main Content Area */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* Header */}
                    <AppHeader />

                    {/* Main Content */}
                    <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 w-full">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default AdminLayout;
