import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Search, Filter, Star } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedAgeRange, setSelectedAgeRange] = useState(searchParams.get('age_range') || '');

    const categories = ['Action Figures', 'Dolls', 'Building Blocks', 'Educational', 'Vehicles', 'Puzzles', 'Board Games', 'Outdoor Toys'];
    const ageRanges = ['0-2 years', '3-5 years', '6-8 years', '9-12 years', '13+ years'];

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {};

            if (searchTerm) params.search = searchTerm;
            if (selectedCategory) params.category = selectedCategory;
            if (selectedAgeRange) params.age_range = selectedAgeRange;

            const response = await productAPI.getAll(params);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        updateFilters({ search: searchTerm });
    };

    const updateFilters = (newFilters) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        setSearchParams(params);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedAgeRange('');
        setSearchParams({});
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
                        Our Products
                    </h1>
                    <p className="text-xl text-gray-600">
                        Discover amazing toys for every age and interest
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for toys..."
                                className="input-field pl-10"
                            />
                        </div>
                        <button type="submit" className="btn-primary">
                            Search
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-display font-semibold text-gray-800 flex items-center">
                                    <Filter className="w-5 h-5 mr-2" />
                                    Filters
                                </h2>
                                {(selectedCategory || selectedAgeRange || searchTerm) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-primary-600 hover:text-primary-700"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-800 mb-3">Category</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === category}
                                                onChange={() => {
                                                    setSelectedCategory(category);
                                                    updateFilters({ category, age_range: selectedAgeRange });
                                                }}
                                                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Age Range Filter */}
                            <div>
                                <h3 className="font-medium text-gray-800 mb-3">Age Range</h3>
                                <div className="space-y-2">
                                    {ageRanges.map((ageRange) => (
                                        <label key={ageRange} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="age_range"
                                                checked={selectedAgeRange === ageRange}
                                                onChange={() => {
                                                    setSelectedAgeRange(ageRange);
                                                    updateFilters({ category: selectedCategory, age_range: ageRange });
                                                }}
                                                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{ageRange}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                                <p className="mt-4 text-gray-600">Loading products...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="mb-4 text-gray-600">
                                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
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
                                                {product.category && (
                                                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded mb-2">
                                                        {product.category}
                                                    </span>
                                                )}
                                                <h3 className="font-display font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center mb-2">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="ml-1 text-sm text-gray-600">
                                                        {product.rating || 5.0}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-2xl font-bold text-primary-600">
                                                        ${product.price.toFixed(2)}
                                                    </p>
                                                    {product.stock_quantity > 0 ? (
                                                        <span className="text-sm text-green-600">In Stock</span>
                                                    ) : (
                                                        <span className="text-sm text-red-600">Out of Stock</span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 card">
                                <p className="text-xl text-gray-600 mb-4">No products found</p>
                                <button onClick={clearFilters} className="btn-primary">
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
