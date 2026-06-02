// frontend/src/utils/__tests__/checkBudgetLimits.test.js

import { describe, test, expect, vi } from "vitest";
import checkBudgetLimit from "../checkBudgetLimits";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn(),
        warning: vi.fn()
    }
}));

describe("checkBudgetLimit", () => {

    test("returns true when budget is not exceeded", () => {

        const result = checkBudgetLimit(
            [{ category: "food", amount: 1000 }],
            { category: "food", amount: 500 }
        );

        expect(result).toBe(true);
    });

    test("returns false when budget is exceeded", () => {

        const result = checkBudgetLimit(
            [{ category: "food", amount: 20000 }],
            { category: "food", amount: 1000 }
        );

        expect(result).toBe(false);
    });

    test("triggers warning at 80 percent threshold", () => {

        checkBudgetLimit(
            [{ category: "food", amount: 15000 }],
            { category: "food", amount: 1000 }
        );

        expect(toast.warning).toHaveBeenCalled();
    });

    test("triggers error when limit exceeded", () => {

        checkBudgetLimit(
            [{ category: "food", amount: 20000 }],
            { category: "food", amount: 1000 }
        );

        expect(toast.error).toHaveBeenCalled();
    });

    test("ignores current expense during edit", () => {

        const result = checkBudgetLimit(
            [{ _id: "1", category: "food", amount: 20000 }],
            { category: "food", amount: 1000 },
            "1"
        );

        expect(result).toBe(true);
    });

    // 🔥 NEW EDGE CASE (MISSING COVERAGE FIX)
    test("handles empty expenses safely", () => {

        const result = checkBudgetLimit([], {
            category: "food",
            amount: 500
        });

        expect(result).toBe(true);
    });
});