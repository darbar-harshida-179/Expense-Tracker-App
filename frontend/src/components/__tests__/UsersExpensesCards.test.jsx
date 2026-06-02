import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import UsersExpensesCards from "../UsersExpensesCards";

/* ---------------- GLOBAL MOCKS (MUST BE TOP) ---------------- */

vi.mock("../../services/expenseServices", () => ({
    getExpenses: vi.fn(() =>
        Promise.resolve({
            data: [
                {
                    _id: "1",
                    title: "Food",
                    amount: 500,
                    category: "Food",
                    date: "2026-06-01T00:00:00.000Z"
                }
            ]
        })
    ),
    addExpense: vi.fn(),
    updateExpense: vi.fn(),
    deleteExpense: vi.fn()
}));

vi.mock("../../hooks/useSelectedMonth", () => ({
    default: () => ({
        selectedDate: new Date("2026-06-01"),
        setSelectedDate: vi.fn()
    })
}));

vi.mock("../Navbar", () => ({
    default: ({ setOpenModal }) => (
        <div>
            Navbar
            <button onClick={() => setOpenModal(true)}>Open Modal</button>
        </div>
    )
}));

vi.mock("../AddExpenseModal", () => ({ default: () => <div>AddExpenseModal</div> }));
vi.mock("../EditExpenseModal", () => ({ default: () => <div>EditExpenseModal</div> }));
vi.mock("../DeleteExpenseModal", () => ({ default: () => <div>DeleteExpenseModal</div> }));
vi.mock("../Loading", () => ({ default: () => <div>Loading...</div> }));

/* ---------------- TESTS ---------------- */

describe("UsersExpensesCards", () => {

    test("renders navbar", async () => {
        render(<UsersExpensesCards />);
        expect(await screen.findByText("Navbar")).toBeInTheDocument();
    });

    test("loads and shows expenses", async () => {
        render(<UsersExpensesCards />);

        // BEST FIX: find card heading safely
        const expenseHeading = await screen.findByText(/Expense:/i);
        expect(expenseHeading).toBeInTheDocument();
    });

    test("shows empty state when no expenses", async () => {

        // safer override using spy (NOT vi.mock inside test)
        vi.spyOn(
            await import("../../services/expenseServices"),
            "getExpenses"
        ).mockResolvedValue({ data: [] });

        render(<UsersExpensesCards />);

        expect(
            await screen.findByText("No Expenses Found!")
        ).toBeInTheDocument();
    });

    test("opens add modal", async () => {
        render(<UsersExpensesCards />);

        const btn = await screen.findByText("Open Modal");
        await userEvent.click(btn);

        expect(screen.getByText("AddExpenseModal")).toBeInTheDocument();
    });
});