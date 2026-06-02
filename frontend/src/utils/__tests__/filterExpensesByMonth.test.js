// frontend/src/utils/__tests__/filterExpensesByMonth.test.js

import { describe, test, expect } from "vitest";
import filterExpensesByMonth from "../filterExpensesByMonth";

describe("filterExpensesByMonth", () => {

    test("returns expenses from the selected month only", () => {

        const expenses = [
            {
                id: 1,
                title: "Food",
                amount: 100,
                date: "2026-06-05"
            },
            {
                id: 2,
                title: "Travel",
                amount: 500,
                date: "2026-05-20"
            },
            {
                id: 3,
                title: "Shopping",
                amount: 300,
                date: "2026-06-15"
            }
        ];

        const selectedDate = new Date("2026-06-01");

        const result = filterExpensesByMonth(
            expenses,
            selectedDate
        );
        console.log(result)

        expect(result).toHaveLength(2);

    });

    test("returns empty array when no expenses match", () => {

        const expenses = [
            {
                id: 1,
                title: "Food",
                amount: 100,
                date: "2026-05-05"
            },
            {
                id: 2,
                title: "Travel",
                amount: 500,
                date: "2026-04-20"
            }
        ];

        const selectedDate = new Date("2026-06-01");

        const result = filterExpensesByMonth(
            expenses,
            selectedDate
        );
        console.log(result);

        expect(result).toHaveLength(0);
    });

    test("returns all expenses when all belong to selected month", () => {

        const expenses = [
            {
                id: 1,
                title: "Food",
                amount: "100",
                date: "2026-06-05"
            },
            {
                id: 2,
                title: "Travel",
                amount: 500,
                date: "2026-06-20"
            }
        ];

        const selectedDate = new Date("2026-06-01");

        const result = filterExpensesByMonth(
            expenses,
            selectedDate
        );
        const length = result.length
        console.log('length', length)
        expect(result).toHaveLength(2);
    });
}); 