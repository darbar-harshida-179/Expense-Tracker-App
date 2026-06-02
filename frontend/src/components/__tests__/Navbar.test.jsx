// frontend/src/components/__tests__/Navbar.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

const mockLogout = vi.fn();

vi.mock("../../context/AuthContext", () => ({
    useAuth: () => ({
        user: {
            name: "Harshida"
        },
        logout: mockLogout
    })
}));

describe("Navbar", () => {

    test("shows Dashboard title by default", () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Dashboard")
        ).toBeInTheDocument();
    });

    test("shows logged in user name", () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Harshida")
        ).toBeInTheDocument();
    });

    test("shows Your Expenses title when showBackButton is true", () => {

        render(
            <MemoryRouter>
                <Navbar
                    setOpenModal={vi.fn()}
                    showBackButton={true}
                />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Your Expenses")
        ).toBeInTheDocument();
    });

    test("shows Add Expense button", () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        expect(
            screen.getByText("+ Add Expense")
        ).toBeInTheDocument();
    });

    test("shows View Expense button", () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        expect(
            screen.getByText("View Expense")
        ).toBeInTheDocument();
    });

    test("calls setOpenModal when Add Expense button is clicked", async () => {

        const mockSetOpenModal = vi.fn();

        render(
            <MemoryRouter>
                <Navbar setOpenModal={mockSetOpenModal} />
            </MemoryRouter>
        );

        await userEvent.click(
            screen.getByText("+ Add Expense")
        );

        expect(mockSetOpenModal).toHaveBeenCalled();
    });

    test("shows logout button when profile is clicked", async () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        await userEvent.click(
            screen.getByText("Harshida")
        );

        expect(
            screen.getByText("Logout")
        ).toBeInTheDocument();
    });

    test("opens logout modal when logout is clicked", async () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        await userEvent.click(
            screen.getByText("Harshida")
        );

        await userEvent.click(
            screen.getByText("Logout")
        );

        expect(
            screen.getByText(/are you sure/i)
        ).toBeInTheDocument();
    });

    test("closes logout modal when No button is clicked", async () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        await userEvent.click(
            screen.getByText("Harshida")
        );

        await userEvent.click(
            screen.getByText("Logout")
        );

        await userEvent.click(
            screen.getByText("No")
        );

        expect(
            screen.queryByText(/are you sure/i)
        ).not.toBeInTheDocument();
    });

    test("calls logout when Yes button is clicked", async () => {

        render(
            <MemoryRouter>
                <Navbar setOpenModal={vi.fn()} />
            </MemoryRouter>
        );

        await userEvent.click(
            screen.getByText("Harshida")
        );

        await userEvent.click(
            screen.getByText("Logout")
        );

        await userEvent.click(
            screen.getByText("Yes")
        );

        expect(mockLogout).toHaveBeenCalled();
    });
});