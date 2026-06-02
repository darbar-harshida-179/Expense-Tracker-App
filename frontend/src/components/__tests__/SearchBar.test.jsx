// frontend/src/components/__tests__/SearchBar.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {

    test("renders search input", () => {

        render(
            <SearchBar
                searchTerm=""
                setSearchTerm={vi.fn()}
            />
        );

        expect(
            screen.getByPlaceholderText("Search by Title")
        ).toBeInTheDocument();
    });

    test("displays the searchTerm value", () => {

        render(
            <SearchBar
                searchTerm="Food"
                setSearchTerm={vi.fn()}
            />
        );

        expect(
            screen.getByDisplayValue("Food")
        ).toBeInTheDocument();
    });

    test("calls setSearchTerm when user types", async () => {

        const mockSetSearchTerm = vi.fn();

        render(
            <SearchBar
                searchTerm=""
                setSearchTerm={mockSetSearchTerm}
            />
        );

        const input = screen.getByPlaceholderText(
            "Search by Title"
        );

        await userEvent.type(input, "Food");

        expect(mockSetSearchTerm).toHaveBeenCalled();
    });

    test("calls setSearchTerm with correct value", async () => {

        const mockSetSearchTerm = vi.fn();

        render(
            <SearchBar
                searchTerm=""
                setSearchTerm={mockSetSearchTerm}
            />
        );

        const input = screen.getByPlaceholderText(
            "Search by Title"
        );

        await userEvent.type(input, "F");   

        expect(mockSetSearchTerm).toHaveBeenCalledWith("F");
    });

});