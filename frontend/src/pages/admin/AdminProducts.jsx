import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { MdAdd, MdSearch, MdEdit, MdDelete, MdFilterList } from 'react-icons/md';
import axios from 'axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchTerm]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/admin/products', {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: currentPage, search: searchTerm }
            });
            setProducts(response.data.products);
            setTotalPages(response.data.pages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/admin/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your product inventory</p>
                </div>
                <Link
                    to="/admin/products/new"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                >
                    <MdAdd className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-2 relative">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <MdFilterList className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="rounded-xl bg-white shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Stock</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.image_url || 'https://via.placeholder.com/50'}
                                                alt={product.name}
                                                className="h-12 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                <p className="text-sm text-gray-500">{product.brand || 'No brand'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-blue-light-50 px-3 py-1 text-xs font-medium text-blue-light-700 dark:bg-blue-light-500/10 dark:text-blue-light-400">
                                            {product.category || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${product.stock_quantity < 10
                                                ? 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400'
                                                : product.stock_quantity < 50
                                                    ? 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400'
                                                    : 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400'
                                            }`}>
                                            {product.stock_quantity} units
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${product.stock_quantity > 0
                                                ? 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400'
                                                : 'bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
                                            }`}>
                                            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/admin/products/edit/${product.id}`}
                                                className="p-2 text-blue-light-600 hover:bg-blue-light-50 dark:hover:bg-blue-light-500/10 rounded-lg"
                                            >
                                                <MdEdit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-error-600 hover:bg-error-50 dark:hover:bg-error-500/10 rounded-lg"
                                            >
                                                <MdDelete className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-6 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Page {currentPage} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminProducts;
