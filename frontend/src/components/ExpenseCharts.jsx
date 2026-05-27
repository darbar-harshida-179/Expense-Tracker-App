// frontend/src/components/ExpenseCharts.jsx

import React from 'react'

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    CartesianGrid
} from 'recharts'

function ExpenseCharts({ type, expenses }) {

    const COLORS = ['#154D71', '#3B82F6', '#06b6d4', '#93c5fd'];

    const categoryMap = {};

    expenses.forEach((expense) => {
        const category = expense.category;

        if (categoryMap[category]) {
            categoryMap[category] += Number(expense.amount);
        } else {
            categoryMap[category] = Number(expense.amount);
        }
    });

    const pieData = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key]
    }));

    const monthlyMap = {};

    expenses.forEach((expense) => {
        
        const date = new Date(expense.date);

        const month = date.toLocaleString('default', {
            month: 'short'
        });

        if (monthlyMap[month]) {
            monthlyMap[month] += Number(expense.amount);
        } else {
            monthlyMap[month] = Number(expense.amount);
        }
    });

    const chartData = Object.keys(monthlyMap).map((key) => ({
        month: key,
        expense: monthlyMap[key]
    }))
    
    return (

        <div className='bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition duration-300'>
            <div className='mb-6'>
                <h1 className='text-xl font-bold text-[#154D71]'>
                    {
                        type === "bar"
                            ? "Yearly Expenses"
                            : type === "pie"
                                ? "Categories"
                                : "Expense Trend"
                    }

                </h1>
                <p className='text-gray-500 text-sm mt-1'>
                    Financial analytics overview
                </p>

            </div>

            <div className='h-[260px] outline-none'>
                <ResponsiveContainer width="100%" height="100%">
                    {
                        type === "bar" ? (

                            <BarChart data={chartData} barCategoryGap={20}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis dataKey="month" />
                                <Tooltip />
                                <Bar
                                    dataKey="expense"
                                    fill="#154D71"
                                    radius={[20, 20, 0, 0]}
                                />
                            </BarChart>
                        ) : type === "pie" ? (

                            <PieChart>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "16px",
                                        border: "none",
                                        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)"
                                    }}
                                />
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={65}
                                    outerRadius={95}
                                    paddingAngle={5}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {
                                        pieData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                                className='hover:opacity-80 duration-300 cursor-pointer outline-none'
                                            />
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        ) : (
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis dataKey="month" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#154D71"
                                    strokeWidth={4}
                                />
                            </LineChart>
                        )
                    }
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ExpenseCharts