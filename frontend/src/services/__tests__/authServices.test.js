// frontend/src/services/__tests__/authServices.test.js

import { describe, test, expect, vi } from "vitest";
import API from "../../utils/api";
import { loginUser, registerUser } from "../authServices";

// Mock API
vi.mock("../../utils/api", () => ({
    default: {
        post: vi.fn()
    }
}));

describe("authServices", () => {

    test("loginUser calls API.post correctly", async () => {

        API.post.mockResolvedValue({ data: { token: "123abc" } });

        const payload = {
            email: "test@gmail.com",
            password: "123456"
        };

        const res = await loginUser(payload);

        expect(API.post).toHaveBeenCalledWith("/auth/login", payload);
        expect(res.data.token).toBe("123abc");
    });

    test("registerUser calls API.post correctly", async () => {

        API.post.mockResolvedValue({ data: { message: "User created" } });

        const payload = {
            name: "Test User",
            email: "test@gmail.com",
            password: "123456"
        };

        const res = await registerUser(payload);

        expect(API.post).toHaveBeenCalledWith("/auth/register", payload);
        expect(res.data.message).toBe("User created");
    });

});