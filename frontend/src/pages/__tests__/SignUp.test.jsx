// frontend/src/pages/__tests__/SignUp.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SignUp from "../SignUp";

// Mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}));

// Mock API
const mockRegisterUser = vi.fn();

vi.mock("../../services/authServices", () => ({
    registerUser: (...args) => mockRegisterUser(...args)
}));

// Mock toast
vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

// Mock Loading
vi.mock("../../components/Loading", () => ({
    default: () => <div>Loading...</div>
}));

// Mock Icons
vi.mock("react-icons/io5", () => ({
    IoEyeSharp: () => <span>EyeOpen</span>
}));

vi.mock("react-icons/pi", () => ({
    PiEyeSlashFill: () => <span>EyeClose</span>
}));

describe("SignUp", () => {

    test("renders signup heading", () => {

        render(<SignUp />);

        expect(
            screen.getByRole("heading", {
                name: /create account/i
            })
        ).toBeInTheDocument();
    });

    test("renders all form inputs", () => {

        render(<SignUp />);

        expect(
            screen.getByPlaceholderText(
                "Enter Your Name"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(
                "Enter Your Email"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(
                "Enter Your Password"
            )
        ).toBeInTheDocument();
    });

    test("renders signup button", () => {

        render(<SignUp />);

        expect(
            screen.getByRole("button", {
                name: /sign up/i
            })
        ).toBeInTheDocument();
    });

    test("shows validation errors on empty submit", async () => {

        render(<SignUp />);

        await userEvent.click(
            screen.getByRole("button", {
                name: /sign up/i
            })
        );

        expect(
            await screen.findByText(
                "Name is required"
            )
        ).toBeInTheDocument();

        expect(
            await screen.findByText(
                "Emaiil is required"
            )
        ).toBeInTheDocument();

        expect(
            await screen.findByText(
                "Password is required"
            )
        ).toBeInTheDocument();
    });

    test("toggles password visibility", async () => {

        render(<SignUp />);

        const passwordInput =
            screen.getByPlaceholderText(
                "Enter Your Password"
            );

        expect(passwordInput).toHaveAttribute(
            "type",
            "password"
        );

        await userEvent.click(
            screen.getByText("EyeClose")
        );

        expect(passwordInput).toHaveAttribute(
            "type",
            "text"
        );
    });

    test("navigates to login page", async () => {

        render(<SignUp />);

        await userEvent.click(
            screen.getByText(/login/i)
        );

        expect(
            mockNavigate
        ).toHaveBeenCalledWith("/login");
    });

    test("calls register api on valid submit", async () => {

        mockRegisterUser.mockResolvedValue({
            data: {
                message: "User Registered"
            }
        });

        render(<SignUp />);

        await userEvent.type(
            screen.getByPlaceholderText(
                "Enter Your Name"
            ),
            "Harshida"
        );

        await userEvent.type(
            screen.getByPlaceholderText(
                "Enter Your Email"
            ),
            "test@gmail.com"
        );

        await userEvent.type(
            screen.getByPlaceholderText(
                "Enter Your Password"
            ),
            "123456"
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /sign up/i
            })
        );

        expect(
            mockRegisterUser
        ).toHaveBeenCalled();

        expect(
            mockNavigate
        ).toHaveBeenCalledWith("/login");
    });

});