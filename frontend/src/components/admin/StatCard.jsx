import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

const StatCard = ({ title, value, icon: Icon, trend, color = 'blue', bgColor }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        yellow: 'from-yellow-500 to-yellow-600',
        purple: 'from-purple-500 to-purple-600',
        red: 'from-red-500 to-red-600',
    };

    const iconBgClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        purple: 'bg-purple-100 text-purple-600',
        red: 'bg-red-100 text-red-600',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${iconBgClasses[color]}`}>
                    <Icon className="w-7 h-7" />
                </div>
                {trend && (
                    <div className={`flex items-center space-x-1 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {trend.isPositive ? <MdTrendingUp className="w-4 h-4" /> : <MdTrendingDown className="w-4 h-4" />}
                        <span>{trend.value}</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
