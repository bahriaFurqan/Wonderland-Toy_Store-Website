import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartCount } = useCart();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🧸</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-gradient">
                            ToyStore
                        </span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <User className="w-5 h-5 text-gray-700" />
                                    <span className="hidden md:block text-sm font-medium text-gray-700">
                                        {user?.first_name || user?.username}
                                    </span>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[10000]">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Orders
                                    </Link>
                                    <hr className="my-2" />
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn-primary text-sm px-4 py-2"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
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
