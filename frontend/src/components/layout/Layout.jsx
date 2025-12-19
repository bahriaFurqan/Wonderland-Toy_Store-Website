import Footer from './Footer';
import BubbleMenu from '../common/BubbleMenu';
import PillNav from '../common/PillNav';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Layout = ({ children }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartCount } = useCart();
    const location = useLocation();

    const logoElement = '🧸';

    const menuItems = [
        {
            label: 'home',
            href: '/',
            ariaLabel: 'Home',
            rotation: -8,
            hoverStyles: { bgColor: '#ff6b9d', textColor: '#ffffff' }
        },
        {
            label: 'products',
            href: '/products',
            ariaLabel: 'Products',
            rotation: 8,
            hoverStyles: { bgColor: '#fbbf24', textColor: '#ffffff' }
        },
        {
            label: 'categories',
            href: '/categories',
            ariaLabel: 'Categories',
            rotation: -8,
            hoverStyles: { bgColor: '#a78bfa', textColor: '#ffffff' }
        },
        {
            label: 'about',
            href: '/about',
            ariaLabel: 'About',
            rotation: 8,
            hoverStyles: { bgColor: '#34d399', textColor: '#ffffff' }
        }
    ];

    const pillNavItems = [
        {
            label: 'Search',
            href: '/search',
            ariaLabel: 'Search'
        },
        {
            label: 'Cart',
            href: '/cart',
            ariaLabel: 'Shopping Cart'
        },
        ...(isAuthenticated ? [
            {
                label: user?.first_name || user?.username || 'User',
                href: '/profile',
                ariaLabel: 'User Profile'
            },
            ...(user?.is_admin ? [{
                label: 'Admin Portal',
                href: '/admin/dashboard',
                ariaLabel: 'Admin Portal'
            }] : []),
            {
                label: 'Logout',
                component: (
                    <button
                        onClick={logout}
                        className="px-4 py-2 hover:opacity-80 transition-opacity text-sm font-medium"
                    >
                        Logout
                    </button>
                )
            }
        ] : [
            {
                label: 'Login',
                href: '/login',
                ariaLabel: 'Login'
            }
        ])
    ];

    // Simple logo element
    const logoComponent = (
        <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-2xl">🧸</span>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* PillNav at top */}
            <div className="fixed top-4 left-0 right-0 z-[9998] flex justify-center">
                <PillNav
                    logo={logoComponent}
                    logoAlt="ToyStore"
                    items={pillNavItems}
                    activeHref={location.pathname}
                    baseColor="#ff6b9d"
                    pillColor="#ffffff"
                    hoveredPillTextColor="#ffffff"
                    pillTextColor="#111111"
                    ease="power2.easeOut"
                    initialLoadAnimation={true}
                />
            </div>

            {/* Search Bar (Expandable) */}
            {isSearchOpen && (
                <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[9997] w-full max-w-md px-4">
                    <input
                        type="text"
                        placeholder="Search for toys..."
                        className="input-field w-full shadow-lg"
                        autoFocus
                    />
                </div>
            )}

            {/* Fixed BubbleMenu on left side */}
            <div className="fixed left-4 top-24 z-[9999]">
                <BubbleMenu
                    items={menuItems}
                    menuAriaLabel="Toggle navigation"
                    menuBg="#ffffff"
                    menuContentColor="#111111"
                    useFixedPosition={true}
                    animationEase="back.out(1.5)"
                    animationDuration={0.5}
                    staggerDelay={0.12}
                />
            </div>

            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
