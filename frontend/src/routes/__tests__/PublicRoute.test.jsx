// frontend/src/routes/__tests__/publicRoute.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import PublicRoute from "../PublicRoute";
import { MemoryRouter } from "react-router-dom";

const mockUseAuth = vi.fn();

vi.mock("../../context/AuthContext", () => ({
    useAuth: () => mockUseAuth()
}));

describe("PublicRoute", () => {

    test("shows loading text while authentication is loading", () => {

        mockUseAuth.mockReturnValue({
            token: null,
            loading: true
        });

        render(
            <PublicRoute>
                <h1>Login Page</h1>
            </PublicRoute>
        );

        expect(
            screen.getByText(/loading/i)
        ).toBeInTheDocument();
    });

    test("renders children when user is not authenticated", () => {

        mockUseAuth.mockReturnValue({
            token: null,
            loading: false
        });

        render(
            <PublicRoute>
                <h1>Login Page</h1>
            </PublicRoute>
        );

        expect(
            screen.getByText("Login Page")
        ).toBeInTheDocument();
    });

    test("redirects to dashboard when user is authenticated", () => {

        mockUseAuth.mockReturnValue({
            token: "abc123",
            loading: false
        });

        render(
            <MemoryRouter>
                <PublicRoute>
                    <h1>Login Page</h1>
                </PublicRoute>
            </MemoryRouter>
        );

        expect(
            screen.queryByText("Login Page")
        ).not.toBeInTheDocument();
    });
});