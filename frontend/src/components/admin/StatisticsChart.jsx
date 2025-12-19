import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsChart = ({ data }) => {
    const [period, setPeriod] = useState('Monthly');

    // Generate sample data if not provided
    const chartData = data && data.length > 0 
        ? data 
        : [
            { month: 'Jan', value: 80 },
            { month: 'Feb', value: 120 },
            { month: 'Mar', value: 150 },
            { month: 'Apr', value: 180 },
            { month: 'May', value: 200 },
            { month: 'Jun', value: 220 },
            { month: 'Jul', value: 210 },
            { month: 'Aug', value: 190 },
            { month: 'Sep', value: 200 },
            { month: 'Oct', value: 230 },
            { month: 'Nov', value: 240 },
            { month: 'Dec', value: 250 }
        ];

    const periods = ['Monthly', 'Quarterly', 'Annually'];

    return (
        <div className="rounded-xl bg-white p-6 shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Statistics</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Target you've set for each month.</p>
                </div>
                <div className="flex gap-2">
                    {periods.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                period === p
                                    ? 'bg-brand-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#465FFF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#465FFF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[50, 250]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                padding: '8px 12px'
                            }}
                            labelStyle={{ color: '#374151', fontSize: '12px', marginBottom: '4px' }}
                            itemStyle={{ color: '#465FFF', fontSize: '14px', fontWeight: '600' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#465FFF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatisticsChart;

