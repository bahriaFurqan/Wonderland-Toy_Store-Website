import { MdTrendingUp, MdTrendingDown, MdPeople, MdShoppingCart } from 'react-icons/md';

const MetricCard = ({ title, value, change, changeType, icon: Icon, iconBg }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBg}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${changeType === 'increase' ? 'text-success-500' : 'text-error-500'}`}>
                        {changeType === 'increase' ? <MdTrendingUp className="w-4 h-4" /> : <MdTrendingDown className="w-4 h-4" />}
                        <span>{change}</span>
                    </div>
                )}
            </div>
            <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h4>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            </div>
        </div>
    );
};

const MonthlyTargetCard = ({ stats }) => {
    const progress = 75.55;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="rounded-xl bg-white p-6 shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Target</h3>
            <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                            cx="64"
                            cy="64"
                            r="45"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="45"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="text-brand-500 transition-all duration-500"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{progress}%</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Complete</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    You earn $3287 today, it's higher than last month. Keep up your good work!
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Target</p>
                        <p className="font-semibold text-gray-900 dark:text-white">$20K</p>
                        <p className="text-error-500 flex items-center gap-1">
                            <MdTrendingDown className="w-3 h-3" />
                            <span>↓</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
                        <p className="font-semibold text-gray-900 dark:text-white">$20K</p>
                        <p className="text-success-500 flex items-center gap-1">
                            <MdTrendingUp className="w-3 h-3" />
                            <span>↑</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Today</p>
                        <p className="font-semibold text-gray-900 dark:text-white">$20K</p>
                        <p className="text-success-500 flex items-center gap-1">
                            <MdTrendingUp className="w-3 h-3" />
                            <span>↑</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EcommerceMetrics = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
            <MetricCard
                title="Customers"
                value={stats?.total_users || 3782}
                change="↑ 11.01%"
                changeType="increase"
                icon={MdPeople}
                iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <MetricCard
                title="Orders"
                value={stats?.total_orders || 5359}
                change="↓ 9.05%"
                changeType="decrease"
                icon={MdShoppingCart}
                iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <div className="xl:col-span-2">
                <MonthlyTargetCard stats={stats} />
            </div>
        </div>
    );
};

export default EcommerceMetrics;
