// frontend/src/components/__tests__/Filter.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Filter from "../Filter";

describe("Filter", () => {

    const categories = [
        "Food",
        "Travel",
        "Shopping"
    ];

    test("renders Filter Category placeholder", () => {

        render(
            <Filter
                selectedCategory=""
                setSelectedCategory={vi.fn()}
                categories={categories}
            />
        );

        expect(
            screen.getByText("Filter Category")
        ).toBeInTheDocument();
    });

    test("shows selected category", () => {

        render(
            <Filter
                selectedCategory="Food"
                setSelectedCategory={vi.fn()}
                categories={categories}
            />
        );

        expect(
            screen.getByText("Food")
        ).toBeInTheDocument();
    });

    test("opens dropdown and shows category options", async () => {

        render(
            <Filter
                selectedCategory=""
                setSelectedCategory={vi.fn()}
                categories={categories}
            />
        );

        await userEvent.click(
            screen.getByText("Filter Category")
        );

        expect(
            screen.getByText("Food")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Travel")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Shopping")
        ).toBeInTheDocument();
    });

    test("calls setSelectedCategory when category is selected", async () => {

        const mockSetSelectedCategory = vi.fn();

        render(
            <Filter
                selectedCategory=""
                setSelectedCategory={mockSetSelectedCategory}
                categories={categories}
            />
        );

        await userEvent.click(
            screen.getByText("Filter Category")
        );

        await userEvent.click(
            screen.getByText("Food")
        );

        expect(
            mockSetSelectedCategory
        ).toHaveBeenCalledWith("Food");
    });

});