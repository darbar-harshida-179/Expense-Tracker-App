// frontend/src/utils/__tests__/api.test.js

import { describe, test, expect, vi, beforeEach } from "vitest";
import API from "../api";

// mock localStorage
beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
});

describe("API interceptor", () => {

    test("adds Authorization header when token exists", async () => {

        localStorage.setItem(
            "Expense-Tracker-App",
            JSON.stringify({
                token: "abc123"
            })
        );

        // mock request
        const request = {
            headers: {}
        };

        const interceptor = API.interceptors.request.handlers[0].fulfilled;

        const result = interceptor(request);

        expect(result.headers.Authorization).toBe("Bearer abc123");
    });

    test("does not add Authorization when token is missing", () => {

        localStorage.setItem(
            "Expense-Tracker-App",
            JSON.stringify({})
        );

        const request = {
            headers: {}
        };

        const interceptor = API.interceptors.request.handlers[0].fulfilled;

        const result = interceptor(request);

        expect(result.headers.Authorization).toBeUndefined();
    });
});