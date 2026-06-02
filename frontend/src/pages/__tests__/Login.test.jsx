// frontend/src/pages/__tests__/Login.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Login from "../Login";

// Mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}));

// Mock auth context
const mockLogin = vi.fn();

vi.mock("../../context/AuthContext", () => ({
    useAuth: () => ({
        login: mockLogin
    })
}));

// Mock API
const mockLoginUser = vi.fn();

vi.mock("../../services/authServices", () => ({
    loginUser: (...args) => mockLoginUser(...args)
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

// Mock icons
vi.mock("react-icons/io5", () => ({
    IoEyeSharp: () => <span>EyeOpen</span>
}));

vi.mock("react-icons/pi", () => ({
    PiEyeSlashFill: () => <span>EyeClose</span>
}));

vi.mock("react-icons/fc", () => ({
    FcGoogle: () => <span>GoogleIcon</span>
}));

describe("Login", () => {

    test("renders login heading", () => {

        render(<Login />);

        expect(
            screen.getByRole("heading", {
                name: /login/i
            })
        ).toBeInTheDocument();
    });

    test("renders email and password inputs", () => {

        render(<Login />);

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

    test("renders login button", () => {

        render(<Login />);

        expect(
            screen.getByRole("button", {
                name: /login/i
            })
        ).toBeInTheDocument();
    });

    test("shows validation errors on empty submit", async () => {

        render(<Login />);

        await userEvent.click(
            screen.getByRole("button", {
                name: /login/i
            })
        );

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

        render(<Login />);

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

    test("navigates to signup page", async () => {

        render(<Login />);

        await userEvent.click(
            screen.getByText(/sign up/i)
        );

        expect(mockNavigate).toHaveBeenCalledWith(
            "/signup"
        );
    });

    test("calls login api on valid submit", async () => {

        mockLoginUser.mockResolvedValue({
            data: {
                token: "abc123",
                user: {
                    name: "Harshida"
                }
            }
        });

        render(<Login />);

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
                name: /login/i
            })
        );

        expect(mockLoginUser).toHaveBeenCalled();

        expect(mockLogin).toHaveBeenCalled();
    });

});