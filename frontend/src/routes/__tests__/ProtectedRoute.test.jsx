// frontend/src/routes/__tests__/ProtectedRoute.test.jsx    

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Protectedroute from "../ProtectedRoute";
import { MemoryRouter } from "react-router-dom";

const mockUseAuth = vi.fn();

vi.mock("../../context/AuthContext", () => ({
    useAuth: () => mockUseAuth()
}));

describe("Protectedroute", () => {

    test("shows loading text while authentication is loading", () => {


        mockUseAuth.mockReturnValue({
            token: null,
            loading: true
        });

        render(
            <Protectedroute>
                <h1>Dashboard</h1>
            </Protectedroute>
        );

        expect(
            screen.getByText(/loading/i)
        ).toBeInTheDocument();
    });

    test("renders children when user is authenticated", () => {

        mockUseAuth.mockReturnValue({
            token: "abc123",
            loading: false
        });

        render(
            <Protectedroute>
                <h1>Dashboard</h1>
            </Protectedroute>
        );

        expect(
            screen.getByText("Dashboard")
        ).toBeInTheDocument();
    });

    test("redirects to login when user is not authenticated", () => {

        mockUseAuth.mockReturnValue({
            token: null,
            loading: false
        });

        render(
            <MemoryRouter>  
                <Protectedroute>
                    <h1>Dashboard</h1>
                </Protectedroute>
            </MemoryRouter>
        );

        expect(
            screen.queryByText("Dashboard")
        ).not.toBeInTheDocument();
    });

});