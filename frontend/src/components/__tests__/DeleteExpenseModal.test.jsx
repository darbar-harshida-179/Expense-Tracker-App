// frontend/src/components/__tests__/DeleteExpenseModal.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import DeleteExpenseModal from "../DeleteExpenseModal";

// Mock Loading
vi.mock("../Loading", () => ({
    default: () => <div>Loading...</div>
}));

describe("DeleteExpenseModal", () => {

    const expense = {
        _id: "1",
        title: "Pizza"
    };

    test("renders heading", () => {

        render(
            <DeleteExpenseModal
                selectedExpense={expense}
                setOpenDeleteModal={vi.fn()}
                handleDeleteExpense={vi.fn()}
            />
        );

        expect(
            screen.getByRole("heading", {
                name: /delete expense/i
            })
        ).toBeInTheDocument();
    });

    test("shows expense title", () => {

        render(
            <DeleteExpenseModal
                selectedExpense={expense}
                setOpenDeleteModal={vi.fn()}
                handleDeleteExpense={vi.fn()}
            />
        );

        expect(
            screen.getByText("Pizza")
        ).toBeInTheDocument();
    });

    test("calls handleDeleteExpense when delete button clicked", async () => {

        const mockHandleDeleteExpense = vi.fn();

        render(
            <DeleteExpenseModal
                selectedExpense={expense}
                setOpenDeleteModal={vi.fn()}
                handleDeleteExpense={mockHandleDeleteExpense}
            />
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /delete expense/i
            })
        );

        expect(
            mockHandleDeleteExpense
        ).toHaveBeenCalledWith("1");
    });

    test("closes modal when no button clicked", async () => {

        const mockSetOpenDeleteModal = vi.fn();

        render(
            <DeleteExpenseModal
                selectedExpense={expense}
                setOpenDeleteModal={mockSetOpenDeleteModal}
                handleDeleteExpense={vi.fn()}
            />
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: "No"
            })
        );

        expect(
            mockSetOpenDeleteModal
        ).toHaveBeenCalledWith(false);
    });

});