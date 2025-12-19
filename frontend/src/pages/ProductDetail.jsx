import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Star, ShoppingCart, Check, Truck, Shield } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { BuildingBlock } from '../components/three/ToyModel3D';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productAPI.getById(id);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        const result = await addToCart(product.id, quantity);
        if (result.success) {
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                    <Link to="/products" className="btn-primary mt-4 inline-block">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm text-gray-600">
                    <Link to="/" className="hover:text-primary-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/products" className="hover:text-primary-600">Products</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* 3D Product Viewer */}
                    <div className="card p-8">
                        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
                            <Canvas>
                                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                                <OrbitControls enableZoom={true} />
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 5]} intensity={1} />
                                <BuildingBlock position={[0, 0, 0]} scale={2} color={product.category === 'Building Blocks' ? '#ff6b6b' : '#4ecdc4'} />
                            </Canvas>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            🖱️ Drag to rotate • Scroll to zoom
                        </p>
                    </div>

                    {/* Product Info */}
                    <div>
                        {product.category && (
                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full mb-4">
                                {product.category}
                            </span>
                        )}

                        <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating || 5)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">
                                {product.rating || 5.0} ({Math.floor(Math.random() * 100) + 50} reviews)
                            </span>
                        </div>

                        <div className="mb-6">
                            <p className="text-4xl font-bold text-primary-600 mb-2">
                                ${product.price.toFixed(2)}
                            </p>
                            {product.stock_quantity > 0 ? (
                                <p className="text-green-600 flex items-center">
                                    <Check className="w-5 h-5 mr-1" />
                                    In Stock ({product.stock_quantity} available)
                                </p>
                            ) : (
                                <p className="text-red-600">Out of Stock</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">
                                Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description || 'This amazing toy will bring hours of fun and learning to children. Made with high-quality materials and designed for safety and durability.'}
                            </p>
                        </div>

                        {product.age_range && (
                            <div className="mb-6">
                                <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">
                                    Age Range
                                </h3>
                                <p className="text-gray-600">{product.age_range}</p>
                            </div>
                        )}

                        {product.brand && (
                            <div className="mb-6">
                                <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">
                                    Brand
                                </h3>
                                <p className="text-gray-600">{product.brand}</p>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block font-display font-semibold text-lg text-gray-800 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock_quantity === 0 || addedToCart}
                            className="btn-primary w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {addedToCart ? (
                                <>
                                    <Check className="w-5 h-5 mr-2" />
                                    Added to Cart!
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </>
                            )}
                        </button>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Truck className="w-6 h-6 text-primary-600" />
                                <div>
                                    <p className="font-medium text-gray-800">Free Shipping</p>
                                    <p className="text-sm text-gray-600">On orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Shield className="w-6 h-6 text-primary-600" />
                                <div>
                                    <p className="font-medium text-gray-800">Quality Guaranteed</p>
                                    <p className="text-sm text-gray-600">Safe & certified</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
