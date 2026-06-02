// frontend/src/components/__tests__/AddExpenseModal.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import AddExpenseModal from "../AddExpenseModal";

// Mock react-select
vi.mock("react-select", () => ({
    default: ({ onChange }) => (
        <button
            data-testid="category-select"
            onClick={() =>
                onChange({
                    value: "Food",
                    label: "Food"
                })
            }
        >
            Select Category
        </button>
    )
}));

// Mock Loading component
vi.mock("../Loading", () => ({
    default: () => <div>Loading...</div>
}));

// Mock icon
vi.mock("react-icons/im", () => ({
    ImCancelCircle: ({ onClick }) => (
        <button
            type="button"
            data-testid="cancel-button"
            onClick={onClick}
        >
            Cancel
        </button>
    )
}));

describe("AddExpenseModal", () => {

    test("renders heading", () => {

        render(
            <AddExpenseModal
                setOpenModal={vi.fn()}
                handleAddExpense={vi.fn()}
            />
        );

        expect(
            screen.getByRole("heading", {
                name: /add expense/i
            })
        ).toBeInTheDocument();
    });

    test("renders form inputs", () => {

        render(
            <AddExpenseModal
                setOpenModal={vi.fn()}
                handleAddExpense={vi.fn()}
            />
        );

        expect(
            screen.getByPlaceholderText("Enter Title")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Enter Amount")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("category-select")
        ).toBeInTheDocument();
    });

    test("renders submit button", () => {

        render(
            <AddExpenseModal
                setOpenModal={vi.fn()}
                handleAddExpense={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", {
                name: /add expense/i
            })
        ).toBeInTheDocument();
    });

    test("shows validation errors on empty submit", async () => {

        render(
            <AddExpenseModal
                setOpenModal={vi.fn()}
                handleAddExpense={vi.fn()}
            />
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /add expense/i
            })
        );

        expect(
            await screen.findByText("Title is required")
        ).toBeInTheDocument();

        expect(
            await screen.findByText("Amount is required")
        ).toBeInTheDocument();
    });

    test("closes modal when cancel button is clicked", async () => {

        const mockSetOpenModal = vi.fn();

        render(
            <AddExpenseModal
                setOpenModal={mockSetOpenModal}
                handleAddExpense={vi.fn()}
            />
        );

        await userEvent.click(
            screen.getByTestId("cancel-button")
        );

        expect(
            mockSetOpenModal
        ).toHaveBeenCalledWith(false);
    });

    test("calls handleAddExpense on valid submit", async () => {

        const mockHandleAddExpense = vi.fn();

        render(
            <AddExpenseModal
                setOpenModal={vi.fn()}
                handleAddExpense={mockHandleAddExpense}
            />
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter Title"),
            "Pizza"
        );

        await userEvent.type(
            screen.getByPlaceholderText("Enter Amount"),
            "500"
        );

        fireEvent.click(
            screen.getByTestId("category-select")
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /add expense/i
            })
        );

        expect(
            mockHandleAddExpense
        ).toHaveBeenCalled();
    });

});