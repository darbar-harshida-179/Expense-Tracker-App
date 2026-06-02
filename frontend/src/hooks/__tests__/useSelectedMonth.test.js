// frontend/src/hooks/__tests__/useSelectedMonth.test.js

import { renderHook, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import useSelectedMonth from "../useSelectedMonth";

// Helper to control localStorage
function setLocalStorage(value) {
    localStorage.setItem("Expense-Tracker-App", JSON.stringify(value));
}

describe("useSelectedMonth hook", () => {

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    test("returns current date when no localStorage data exists", () => {

        const { result } = renderHook(() => useSelectedMonth());

        expect(result.current.selectedDate).toBeInstanceOf(Date);
        expect(result.current.setSelectedDate).toBeTypeOf("function");
    });

    test("loads saved month from localStorage", () => {

        const savedDate = "2026-06-01";

        setLocalStorage({
            selectedMonth: savedDate
        });

        const { result } = renderHook(() => useSelectedMonth());

        expect(result.current.selectedDate).toBeInstanceOf(Date);
        expect(result.current.selectedDate.toISOString().slice(0, 10)).toBe(savedDate);
    });

    test("updates selectedDate using setSelectedDate", () => {

        const { result } = renderHook(() => useSelectedMonth());

        const newDate = new Date("2026-05-01");

        act(() => {
            result.current.setSelectedDate(newDate);
        });

        expect(result.current.selectedDate).toEqual(newDate);
    });

    test("handles invalid localStorage gracefully", () => {

        localStorage.setItem("Expense-Tracker-App", "invalid-json");

        // should NOT crash
        const { result } = renderHook(() => useSelectedMonth());

        expect(result.current.selectedDate).toBeInstanceOf(Date);
    });
    test("handles JSON parse error safely from localStorage", () => {

        localStorage.setItem(
            "Expense-Tracker-App",
            "{invalid-json"
        );

        const { result } = renderHook(() => useSelectedMonth());

        expect(result.current.selectedDate).toBeInstanceOf(Date);
    });

});