// frontend/src/components/__tests__/EditExpenseModal.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import EditExpenseModal from "../EditExpenseModal";

// Mock react-select
vi.mock("react-select", () => ({
    default: ({ onChange }) => (
        <button
            data-testid="category-select"
            onClick={() =>
                onChange({
                    value: "food",
                    label: "Food"
                })
            }
        >
            Select Category
        </button>
    )
}));

// Mock Loading
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

describe("EditExpenseModal", () => {

    const expense = {
        _id: "1",
        title: "Pizza",
        amount: 500,
        category: "Food"
    };

    test("renders heading", () => {

        render(
            <EditExpenseModal
                selectedExpense={expense}
                setOpenEditModal={vi.fn()}
                handleUpdateExpense={vi.fn()}
            />
        );

        expect(
            screen.getByRole("heading", {
                name: /edit expense/i
            })
        ).toBeInTheDocument();
    });

    test("renders existing expense values", () => {

        render(
            <EditExpenseModal
                selectedExpense={expense}
                setOpenEditModal={vi.fn()}
                handleUpdateExpense={vi.fn()}
            />
        );

        expect(
            screen.getByDisplayValue("Pizza")
        ).toBeInTheDocument();

        expect(
            screen.getByDisplayValue("500")
        ).toBeInTheDocument();
    });

    test("renders category select", () => {

        render(
            <EditExpenseModal
                selectedExpense={expense}
                setOpenEditModal={vi.fn()}
                handleUpdateExpense={vi.fn()}
            />
        );

        expect(
            screen.getByTestId("category-select")
        ).toBeInTheDocument();
    });

    test("closes modal when cancel button is clicked", async () => {

        const mockSetOpenEditModal = vi.fn();

        render(
            <EditExpenseModal
                selectedExpense={expense}
                setOpenEditModal={mockSetOpenEditModal}
                handleUpdateExpense={vi.fn()}
            />
        );

        await userEvent.click(
            screen.getByTestId("cancel-button")
        );

        expect(
            mockSetOpenEditModal
        ).toHaveBeenCalledWith(false);
    });

    test("updates title input", async () => {

        render(
            <EditExpenseModal
                selectedExpense={expense}
                setOpenEditModal={vi.fn()}
                handleUpdateExpense={vi.fn()}
            />
        );

        const titleInput = screen.getByDisplayValue("Pizza");

        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, "Burger");

        expect(titleInput).toHaveValue("Burger");
    });

    test("calls handleUpdateExpense on submit", async () => {

        const mockHandleUpdateExpense = vi.fn();

        render(
            <EditExpenseModal
                selectedExpense={expense}
                setOpenEditModal={vi.fn()}
                handleUpdateExpense={mockHandleUpdateExpense}
            />
        );

        fireEvent.click(
            screen.getByTestId("category-select")
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /update expense/i
            })
        );

        expect(
            mockHandleUpdateExpense
        ).toHaveBeenCalled();
    });

});