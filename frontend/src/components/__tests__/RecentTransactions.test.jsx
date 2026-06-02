// frontend/src/components/__tests__/RecentTransactions.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RecentTransactions from "../RecentTransactions";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}));

vi.mock("../../utils/formatCurrency", () => ({
    formatCurrency: (value) => `₹${value}`
}));

describe("RecentTransactions", () => {

    test("renders heading", () => {

        render(
            <RecentTransactions expenses={[]} />
        );

        expect(
            screen.getByText("Recent Transactions")
        ).toBeInTheDocument();
    });

    test("shows message when there are no transactions", () => {

        render(
            <RecentTransactions expenses={[]} />
        );

        expect(
            screen.getByText("No Recent Transaction")
        ).toBeInTheDocument();
    });

    test("renders transaction title", () => {

        const expenses = [
            {
                _id: "1",
                title: "Food",
                category: "Food",
                amount: 500,
                date: "2026-06-02"
            }
        ];

        render(
            <RecentTransactions expenses={expenses} />
        );

        expect(
            screen.getAllByText("Food")[0]
        ).toBeInTheDocument();
    });
    test("renders transaction category", () => {

        const expenses = [
            {
                _id: "1",
                title: "Food",
                category: "Food",
                amount: 500,
                date: "2026-06-02"
            }
        ];

        render(
            <RecentTransactions expenses={expenses} />
        );

        expect(
            screen.getAllByText("Food")[1]
        ).toBeInTheDocument();
    });

    test("renders formatted amount", () => {

        const expenses = [
            {
                _id: "1",
                title: "Food",
                category: "Food",
                amount: 500,
                date: "2026-06-02"
            }
        ];

        render(
            <RecentTransactions expenses={expenses} />
        );

        expect(
            screen.getByText("₹500")
        ).toBeInTheDocument();
    });

    test("navigates when See All button is clicked", async () => {

        render(
            <RecentTransactions expenses={[]} />
        );

        await userEvent.click(
            screen.getByText("See All")
        );

        expect(mockNavigate).toHaveBeenCalledWith(
            "/usersexpensescards"
        );
    });

});