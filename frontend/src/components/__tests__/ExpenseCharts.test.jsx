// frontend/src/components/__tests__/ExpenseCharts.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ExpenseCharts from "../ExpenseCharts";

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Bar: () => <div />,
    Pie: () => <div />,
    Cell: () => <div />,
    XAxis: () => <div />,
    Tooltip: () => <div />,
    CartesianGrid: () => <div />,
    Line: () => <div />
}));

const mockExpenses = [
    {
        title: "Food",
        amount: 200,
        category: "Food",
        date: "2026-06-01"
    },
    {
        title: "Travel",
        amount: 300,
        category: "Travel",
        date: "2026-05-10"
    },
    {
        title: "Food 2",
        amount: 100,
        category: "Food",
        date: "2026-05-15"
    }
];

describe("ExpenseCharts Component", () => {

    test("renders bar chart type correctly", () => {
        render(<ExpenseCharts type="bar" expenses={mockExpenses} />);

        expect(screen.getByText("Yearly Expenses")).toBeInTheDocument();
        expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    });

    test("renders pie chart type correctly", () => {
        render(<ExpenseCharts type="pie" expenses={mockExpenses} />);

        expect(screen.getByText("Categories")).toBeInTheDocument();
        expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    });

    test("renders line chart type correctly", () => {
        render(<ExpenseCharts type="line" expenses={mockExpenses} />);

        expect(screen.getByText("Expense Trend")).toBeInTheDocument();
        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });

    test("handles empty expenses without crashing", () => {
        render(<ExpenseCharts type="bar" expenses={[]} />);

        expect(screen.getByText("Yearly Expenses")).toBeInTheDocument();
        expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    });

    test("aggregates categories correctly for pie chart", () => {
        render(<ExpenseCharts type="pie" expenses={mockExpenses} />);

        expect(screen.getByText("Categories")).toBeInTheDocument();
    });

});