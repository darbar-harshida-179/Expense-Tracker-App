// frontend/src/components/ExpenseCharts.jsx


import React from 'react'

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from 'recharts';

function ExpenseCharts() {

    const monthlyData = [
        { month: 'Jan', expense: 4000 },
        { month: 'Feb', expense: 3000 },
        { month: 'Mar', expense: 5000 },
        { month: 'Apr', expense: 2500 },
        { month: 'May', expense: 4500 },
        { month: 'Jun', expense: 6000 },
    ];

    const categoryData = [
        { name: 'Food', value: 400 },
        { name: 'Travel', value: 300 },
        { name: 'Shopping', value: 300 },
        { name: 'Bills', value: 200 },
    ];

    const COLORS = ['#154D71', '#3B82F6', '#10B981', '#F59E0B'];

    return (
        <>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10 px-14 py-10'>
                <div className='bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl'>

                    <h1 className='text-[#154D71] text-xl font-semibold mb-5'>
                        Monthly Expenses
                    </h1>

                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="expense"
                                fill="#154D71"
                                radius={[10, 10, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl'>
                    <h1 className='text-[#154D71] text-xl font-semibold mb-5'>
                        Expense Categories
                    </h1>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                dataKey="value"
                                label
                            >
                                {
                                    categoryData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className='bg-white rounded-2xl shadow-lg p-5 xl:col-span-2 hover:shadow-2xl transition'>

                    <h1 className='text-[#154D71] text-xl font-semibold mb-5'>
                        Expense Trend
                    </h1>

                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={monthlyData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />
                            <YAxis />

                            <Tooltip />
                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="#154D71"
                                strokeWidth={4}
                            />

                        </LineChart>
                    </ResponsiveContainer>

                </div>

            </div>
        </>
    )
}

export default ExpenseCharts