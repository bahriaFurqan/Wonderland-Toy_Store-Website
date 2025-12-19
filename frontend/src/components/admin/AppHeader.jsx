import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import {
    MdMenu,
    MdSearch,
    MdNotifications,
    MdDarkMode,
    MdLightMode,
    MdPerson,
    MdLogout,
    MdDashboard,
    MdKeyboardArrowDown
} from 'react-icons/md';

const AppHeader = () => {
    const { user, logout } = useAuth();
    const { toggleSidebar, toggleMobileSidebar } = useSidebar();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                return saved === 'true';
            }
            // Check system preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });
    const [searchFocused, setSearchFocused] = useState(false);

    // Apply dark mode class on mount and when state changes
    useEffect(() => {
        const root = document.documentElement;
        // Force remove first to ensure clean state
        root.classList.remove('dark');
        
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            // Immediately update the DOM to ensure it works
            const root = document.documentElement;
            if (newMode) {
                root.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                root.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
            }
            return newMode;
        });
    };

    return (
        <header className="sticky top-0 z-40 flex w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11">
                {/* Left Side - Logo and Hamburger Menu */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileSidebar}
                        className="block lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <MdMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Desktop Sidebar Toggle */}
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <MdMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Logo */}
                    <Link to="/admin/dashboard" className="hidden md:flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">TailAdmin</span>
                    </Link>
                </div>

                {/* Center - Search Bar */}
                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <div className={`relative ${searchFocused ? 'ring-2 ring-brand-500' : ''} rounded-lg transition-all`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search or type command..."
                            className="block w-full pl-10 pr-20 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0"
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded">
                                ⌘K
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* Right Side - Dark Mode, Notifications, User */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title={darkMode ? 'Light mode' : 'Dark mode'}
                    >
                        {darkMode ? (
                            <MdLightMode className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        ) : (
                            <MdDarkMode className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <MdNotifications className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                    </button>

                    {/* User Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-white">
                                    {user?.first_name?.[0] || user?.username?.[0] || 'A'}
                                </span>
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {user?.first_name || user?.username || 'Admin'}
                                </p>
                            </div>
                            <MdKeyboardArrowDown className="hidden md:block w-4 h-4 text-gray-500" />
                        </button>

                        {/* Dropdown Menu */}
                        {showUserMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowUserMenu(false)}
                                ></div>
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {user?.first_name || user?.username || 'Admin'}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <MdPerson className="w-4 h-4" />
                                        <span>My Profile</span>
                                    </Link>
                                    <Link
                                        to="/"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <MdDashboard className="w-4 h-4" />
                                        <span>View Store</span>
                                    </Link>
                                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <MdLogout className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
