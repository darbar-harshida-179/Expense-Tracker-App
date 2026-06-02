// frontend/src/context/__tests__/AuthContext.test.jsx

import { render, screen, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AuthProvider, { useAuth } from "../AuthContext";

// Test Component
function TestComponent() {

    const {
        user,
        token,
        login,
        logout,
        loading
    } = useAuth();

    return (
        <div>

            <p>User:
                {user ? user.name : "No User"}
            </p>

            <p>Token:
                {token || "No Token"}
            </p>

            <p>Loading:
                {loading ? "true" : "false"}
            </p>

            <button
                onClick={() =>
                    login({
                        token: "abc123",
                        user: {
                            name: "Harshida"
                        }
                    })
                }
            >
                Login
            </button>

            <button
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
}

describe("AuthContext", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test("renders with default values", async () => {

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(
            await screen.findByText(
                "User:No User"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Token:No Token"
            )
        ).toBeInTheDocument();
    });

    test("loads user from localStorage", async () => {

        localStorage.setItem(
            "Expense-Tracker-App",
            JSON.stringify({
                token: "xyz123",
                user: {
                    name: "Harshida"
                }
            })
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(
            await screen.findByText(
                "User:Harshida"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Token:xyz123"
            )
        ).toBeInTheDocument();
    });

    test("login updates user and token", async () => {

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText("Login").click();
        });

        expect(
            screen.getByText(
                "User:Harshida"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Token:abc123"
            )
        ).toBeInTheDocument();
    });

    test("logout clears user and token", async () => {

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText("Login").click();
        });

        await act(async () => {
            screen.getByText("Logout").click();
        });

        expect(
            screen.getByText(
                "User:No User"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Token:No Token"
            )
        ).toBeInTheDocument();
    });

    test("login stores data in localStorage", async () => {

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await act(async () => {
            screen.getByText("Login").click();
        });

        const data = JSON.parse(
            localStorage.getItem(
                "Expense-Tracker-App"
            )
        );

        expect(data.token).toBe("abc123");

        expect(data.user.name).toBe(
            "Harshida"
        );
    });

});