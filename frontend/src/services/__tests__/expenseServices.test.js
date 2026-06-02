// frontend/src/services/__tests__/expenseServices.test.js

import { describe, test, expect, vi } from "vitest";
import API from "../../utils/api";
import {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} from "../expenseServices";

// Mock API instance
vi.mock("../../utils/api", () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
    }
}));

describe("expenseServices", () => {

    test("addExpense calls API.post correctly", async () => {

        API.post.mockResolvedValue({ data: "added" });

        const payload = { title: "Food", amount: 100 };

        const res = await addExpense(payload);

        expect(API.post).toHaveBeenCalledWith("/add-expense", payload);
        expect(res.data).toBe("added");
    });

    test("getExpenses calls API.get correctly", async () => {

        API.get.mockResolvedValue({ data: [] });

        const res = await getExpenses();

        expect(API.get).toHaveBeenCalledWith("/expenses");
        expect(res.data).toEqual([]);
    });

    test("updateExpense calls API.put correctly", async () => {

        API.put.mockResolvedValue({ data: "updated" });

        const id = "123";
        const payload = { title: "Updated Food" };

        const res = await updateExpense(id, payload);

        expect(API.put).toHaveBeenCalledWith(`/update-expense/${id}`, payload);
        expect(res.data).toBe("updated");
    });

    test("deleteExpense calls API.delete correctly", async () => {

        API.delete.mockResolvedValue({ data: "deleted" });

        const id = "123";

        const res = await deleteExpense(id);

        expect(API.delete).toHaveBeenCalledWith(`/delete-expense/${id}`);
        expect(res.data).toBe("deleted");
    });

});