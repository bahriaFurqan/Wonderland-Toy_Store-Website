import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlySalesChart = ({ salesData }) => {
    // Generate sample monthly data if not provided
    const monthlyData = salesData && salesData.length > 0 
        ? salesData 
        : [
            { month: 'Jan', sales: 150 },
            { month: 'Feb', sales: 350 },
            { month: 'Mar', sales: 200 },
            { month: 'Apr', sales: 250 },
            { month: 'May', sales: 180 },
            { month: 'Jun', sales: 220 },
            { month: 'Jul', sales: 280 },
            { month: 'Aug', sales: 100 },
            { month: 'Sep', sales: 190 },
            { month: 'Oct', sales: 300 },
            { month: 'Nov', sales: 240 },
            { month: 'Dec', sales: 80 }
        ];

    return (
        <div className="rounded-xl bg-white p-6 shadow-theme-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Monthly Sales</h4>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#465FFF" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#465FFF" stopOpacity={0.3} />
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
                            domain={[0, 400]}
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
                        <Bar
                            dataKey="sales"
                            fill="url(#colorSales)"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MonthlySalesChart;
