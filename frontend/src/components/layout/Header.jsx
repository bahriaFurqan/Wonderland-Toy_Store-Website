import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import PillNav from '../common/PillNav';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartCount } = useCart();
    const location = useLocation();

    // Logo as emoji/text instead of image
    const logoElement = '🧸';

    const navItems = [
        {
            label: '',
            component: (
                <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 hover:opacity-80 transition-opacity"
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" />
                </button>
            )
        },
        {
            label: '',
            component: (
                <Link
                    to="/cart"
                    className="p-2 hover:opacity-80 transition-opacity relative"
                    aria-label="Shopping Cart"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {getCartCount()}
                        </span>
                    )}
                </Link>
            )
        },
        {
            label: '',
            component: isAuthenticated ? (
                <div className="relative group">
                    <button className="p-2 hover:opacity-80 transition-opacity flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span className="hidden md:inline text-sm">{user?.first_name || user?.username}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[10000]">
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            My Profile
                        </Link>
                        <Link
                            to="/orders"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            My Orders
                        </Link>
                        <hr className="my-2" />
                        <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <Link
                    to="/login"
                    className="px-4 py-2 hover:opacity-80 transition-opacity text-sm font-medium"
                >
                    Login
                </Link>
            )
        }
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-2xl">{logoElement}</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-gradient">
                            ToyStore
                        </span>
                    </Link>

                    {/* PillNav with Search, Cart, Login */}
                    <PillNav
                        logo={logoElement}
                        logoAlt="ToyStore"
                        items={navItems}
                        activeHref={location.pathname}
                        baseColor="#ff6b9d"
                        pillColor="#ffffff"
                        hoveredPillTextColor="#ffffff"
                        pillTextColor="#111111"
                        ease="power2.easeOut"
                        initialLoadAnimation={false}
                    />
                </div>

                {/* Search Bar (Expandable) */}
                {isSearchOpen && (
                    <div className="pb-4">
                        <input
                            type="text"
                            placeholder="Search for toys..."
                            className="input-field"
                            autoFocus
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
