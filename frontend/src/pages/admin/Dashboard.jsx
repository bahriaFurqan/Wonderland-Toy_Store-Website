import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import EcommerceMetrics from '../../components/admin/EcommerceMetrics';
import MonthlySalesChart from '../../components/admin/MonthlySalesChart';
import StatisticsChart from '../../components/admin/StatisticsChart';
import RecentOrders from '../../components/admin/RecentOrders';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
        fetchSalesData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/admin/analytics/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSalesData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/admin/analytics/sales?period=7', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSalesData(response.data.sales_data || []);
        } catch (error) {
            console.error('Error fetching sales data:', error);
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
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {/* Metrics */}
                <div className="col-span-12">
                    <EcommerceMetrics stats={stats} />
                </div>

                {/* Monthly Sales Chart */}
                <div className="col-span-12 xl:col-span-7">
                    <MonthlySalesChart salesData={salesData} />
                </div>

                {/* Top Products or Additional Info */}
                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-xl bg-white p-6 shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h4>
                        <div className="space-y-3">
                            {stats?.top_products && stats.top_products.length > 0 ? (
                                stats.top_products.map((product, index) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold">
                                                #{index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">${product.price}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {product.total_sold} sold
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No data available</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Statistics Chart */}
                <div className="col-span-12">
                    <StatisticsChart data={salesData} />
                </div>

                {/* Recent Orders */}
                <div className="col-span-12">
                    <RecentOrders orders={stats?.recent_orders} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
