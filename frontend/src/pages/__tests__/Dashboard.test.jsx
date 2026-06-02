// frontend/src/pages/__tests__/Dashboard.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Dashboard from "../Dashboard";

// Mock API
const mockGetExpenses = vi.fn();

vi.mock("../../services/expenseServices", () => ({
    getExpenses: (...args) => mockGetExpenses(...args),
    addExpense: vi.fn()
}));

// Mock hook
vi.mock("../../hooks/useSelectedMonth", () => ({
    default: () => ({
        selectedDate: new Date("2026-06-01"),
        setSelectedDate: vi.fn()
    })
}));

// Mock utilities
vi.mock("../../utils/filterExpensesByMonth", () => ({
    default: (expenses) => expenses
}));

vi.mock("../../utils/checkBudgetLimits", () => ({
    default: vi.fn(() => true)
}));

vi.mock("../../utils/formatCurrency", () => ({
    formatCurrency: (value) => `₹${value}`
}));

// Mock Loading
vi.mock("../../components/Loading", () => ({
    default: () => <div>Loading...</div>
}));

// Mock Navbar
vi.mock("../../components/Navbar", () => ({
    default: ({ setOpenModal }) => (
        <div>
            Navbar
            <button
                onClick={() => setOpenModal(true)}
            >
                Open Modal
            </button>
        </div>
    )
}));

// Mock SummaryCard
vi.mock("../../components/SummaryCard", () => ({
    default: ({ title }) => (
        <div>{title}</div>
    )
}));

// Mock ExpenseCharts
vi.mock("../../components/ExpenseCharts", () => ({
    default: ({ type }) => (
        <div>{type} Chart</div>
    )
}));

// Mock RecentTransactions
vi.mock("../../components/RecentTransactions", () => ({
    default: () => (
        <div>RecentTransactions</div>
    )
}));

// Mock BudgetTracker
vi.mock("../../components/BudgetTracker", () => ({
    default: () => (
        <div>BudgetTracker</div>
    )
}));

// Mock AddExpenseModal
vi.mock("../../components/AddExpenseModal", () => ({
    default: () => (
        <div>AddExpenseModal</div>
    )
}));

describe("Dashboard", () => {

    test("renders navbar", async () => {

        mockGetExpenses.mockResolvedValue({
            data: []
        });

        render(<Dashboard />);

        expect(
            await screen.findByText("Navbar")
        ).toBeInTheDocument();
    });

    test("calls getExpenses on mount", async () => {

        mockGetExpenses.mockResolvedValue({
            data: []
        });

        render(<Dashboard />);

        expect(
            mockGetExpenses
        ).toHaveBeenCalled();
    });

    test("renders summary cards", async () => {

        mockGetExpenses.mockResolvedValue({
            data: []
        });

        render(<Dashboard />);

        expect(
            await screen.findByText(
                "Total Expenses"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Total Transactions"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Used Categories"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Latest Expense"
            )
        ).toBeInTheDocument();
    });

    test("renders charts", async () => {

        mockGetExpenses.mockResolvedValue({
            data: []
        });

        render(<Dashboard />);

        expect(
            await screen.findByText(
                "bar Chart"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "pie Chart"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "line Chart"
            )
        ).toBeInTheDocument();
    });

    test("renders recent transactions and budget tracker", async () => {

        mockGetExpenses.mockResolvedValue({
            data: []
        });

        render(<Dashboard />);

        expect(
            await screen.findByText(
                "RecentTransactions"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "BudgetTracker"
            )
        ).toBeInTheDocument();
    });

    test("opens add expense modal", async () => {

        mockGetExpenses.mockResolvedValue({
            data: []
        });

        render(<Dashboard />);

        await userEvent.click(
            await screen.findByText(
                "Open Modal"
            )
        );

        expect(
            screen.getByText(
                "AddExpenseModal"
            )
        ).toBeInTheDocument();
    });

});