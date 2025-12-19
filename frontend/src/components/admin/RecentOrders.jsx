import { MdWarning } from 'react-icons/md';

const RecentOrders = ({ orders }) => {
    const getStatusColor = (status) => {
        const colors = {
            delivered: 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400',
            shipped: 'bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/10 dark:text-blue-light-400',
            processing: 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400',
            cancelled: 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400',
            pending: 'bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
        };
        return colors[status] || colors.pending;
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h4 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h4>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                            <th className="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Customer</th>
                            <th className="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                            <th className="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                            <th className="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">#{order.id}</td>
                                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{order.user?.username || 'N/A'}</td>
                                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">${order.total_amount.toFixed(2)}</td>
                                    <td className="py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500">No recent orders</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;
