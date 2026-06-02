// frontend/src/components/__tests__/Sort.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Sort from "../Sort";

describe("Sort", () => {

    test("renders Select Sorting placeholder", () => {

        render(
            <Sort
                sortBy=""
                setSortBy={vi.fn()}
            />
        );

        expect(
            screen.getByText("Select Sorting")
        ).toBeInTheDocument();
    });

    test("shows selected sorting option", () => {

        render(
            <Sort
                sortBy="latest"
                setSortBy={vi.fn()}
            />
        );

        expect(
            screen.getByText("Latest First")
        ).toBeInTheDocument();
    });

    test("opens dropdown options when clicked", async () => {

        render(
            <Sort
                sortBy=""
                setSortBy={vi.fn()}
            />
        );

        await userEvent.click(
            screen.getByText("Select Sorting")
        );

        expect(
            screen.getByText("Latest First")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Oldest First")
        ).toBeInTheDocument();
    });

    test("calls setSortBy when option is selected", async () => {

        const mockSetSortBy = vi.fn();

        render(
            <Sort
                sortBy=""
                setSortBy={mockSetSortBy}
            />
        );

        await userEvent.click(
            screen.getByText("Select Sorting")
        );

        await userEvent.click(
            screen.getByText("Latest First")
        );

        expect(mockSetSortBy).toHaveBeenCalledWith(
            "latest"
        );
    });

});