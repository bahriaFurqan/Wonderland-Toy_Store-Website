import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import HeroScene from '../components/three/HeroScene';
import { ArrowRight, Star, Truck, Shield, HeadphonesIcon } from 'lucide-react';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await productAPI.getFeatured();
            setFeaturedProducts(response.data);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Action Figures', icon: '🦸', color: 'bg-red-100 text-red-600' },
        { name: 'Dolls', icon: '👧', color: 'bg-pink-100 text-pink-600' },
        { name: 'Building Blocks', icon: '🧱', color: 'bg-blue-100 text-blue-600' },
        { name: 'Educational', icon: '📚', color: 'bg-green-100 text-green-600' },
        { name: 'Vehicles', icon: '🚗', color: 'bg-yellow-100 text-yellow-600' },
        { name: 'Puzzles', icon: '🧩', color: 'bg-purple-100 text-purple-600' },
    ];

    const features = [
        {
            icon: <Truck className="w-8 h-8" />,
            title: 'Free Shipping',
            description: 'On orders over $50',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Safe & Secure',
            description: 'Quality guaranteed',
        },
        {
            icon: <HeadphonesIcon className="w-8 h-8" />,
            title: '24/7 Support',
            description: 'Always here to help',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section with 3D Scene */}
            <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Text Content */}
                        <div className="text-center lg:text-left z-10">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                                <span className="text-gradient">Magical Toys</span>
                                <br />
                                <span className="text-gray-800">For Every Child</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                                Discover a world of imagination with our curated collection of quality toys that inspire creativity and learning.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/products" className="btn-primary inline-flex items-center justify-center">
                                    Shop Now
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link to="/categories" className="btn-secondary inline-flex items-center justify-center">
                                    Browse Categories
                                </Link>
                            </div>
                        </div>

                        {/* 3D Scene */}
                        <div className="order-first lg:order-last">
                            <HeroScene />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-white border-y border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-lg text-gray-800">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-xl text-gray-600">
                            Find the perfect toy for every age and interest
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/products?category=${category.name}`}
                                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
                            >
                                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-4xl mx-auto mb-4`}>
                                    {category.icon}
                                </div>
                                <h3 className="font-display font-semibold text-gray-800">
                                    {category.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">
                            Featured Products
                        </h2>
                        <p className="text-xl text-gray-600">
                            Our most popular toys loved by kids everywhere
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.slice(0, 8).map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                    className="card overflow-hidden group"
                                >
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        <img
                                            src={product.image_url || 'https://via.placeholder.com/300'}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-display font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center mb-2">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="ml-1 text-sm text-gray-600">
                                                {product.rating || 5.0}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-primary-600">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No featured products available</p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/products" className="btn-primary inline-flex items-center">
                            View All Products
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-display font-bold mb-4">
                        Ready to Start Shopping?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of happy customers and find the perfect toy today!
                    </p>
                    <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block">
                        Create Account
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
