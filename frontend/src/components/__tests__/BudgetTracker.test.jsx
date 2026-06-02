// frontend/src/components/__tests__/BudgetTracker.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import BudgetTracker from "../BudgetTracker";

vi.mock("../../utils/formatCurrency", () => ({
    formatCurrency: (value) => `₹${value}`
}));

vi.mock("../Categories", () => ({
    budgetLimits: {
        food: 20000,
        travel: 15000,
        shopping: 10000
    }
}));

describe("BudgetTracker", () => {

    test("renders heading", () => {

        render(
            <BudgetTracker expenses={[]} />
        );

        expect(
            screen.getByText("Budget Tracker")
        ).toBeInTheDocument();
    });

    test("shows message when there are no expenses", () => {

        render(
            <BudgetTracker expenses={[]} />
        );

        expect(
            screen.getByText("No budget used this month")
        ).toBeInTheDocument();
    });

    test("renders category when expenses exist", () => {

        const expenses = [
            {
                category: "Food",
                amount: 5000
            }
        ];

        render(
            <BudgetTracker expenses={expenses} />
        );

        expect(
            screen.getByText("food")
        ).toBeInTheDocument();
    });

    test("shows warning message when spending reaches 80 percent of limit", () => {

        const expenses = [
            {
                category: "Food",
                amount: 17000
            }
        ];

        render(
            <BudgetTracker expenses={expenses} />
        );

        expect(
            screen.getByText(
                "Almost Reached Your Budget Limit!"
            )
        ).toBeInTheDocument();
    });

    test("shows exceeded message when budget limit is crossed", () => {

        const expenses = [
            {
                category: "Food",
                amount: 25000
            }
        ];

        render(
            <BudgetTracker expenses={expenses} />
        );

        expect(
            screen.getByText(
                /Budget Limit Exceeded For food/i
            )
        ).toBeInTheDocument();
    });

    test("handles multiple categories correctly", () => {

    render(
        <BudgetTracker
            expenses={[
                { category: "Food", amount: 5000 },
                { category: "Travel", amount: 3000 }
            ]}
        />
    );

    expect(screen.getByText("food")).toBeInTheDocument();
    expect(screen.getByText("travel")).toBeInTheDocument();
});

});