// frontend/src/components/__tests__/SummaryCard.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import SummaryCard from "../SummaryCard";

describe("SummaryCard", () => {

    test("renders title", () => {

        render(
            <SummaryCard
                title="Total Expenses"
                amount="₹5000"
                percent="50%"
            />
        );

        expect(
            screen.getByText("Total Expenses")
        ).toBeInTheDocument();
    });

    test("renders amount", () => {

        render(
            <SummaryCard
                title="Total Expenses"
                amount="₹5000"
                percent="50%"
            />
        );

        expect(
            screen.getByText("₹5000")
        ).toBeInTheDocument();
    });

    test("renders percentage", () => {

        render(
            <SummaryCard
                title="Total Expenses"
                amount="₹5000"
                percent="50%"
            />
        );

        expect(
            screen.getByText("50%")
        ).toBeInTheDocument();
    });

    test("renders correctly when dark is true", () => {

        render(
            <SummaryCard
                title="Income"
                amount="₹10000"
                percent="80%"
                dark={true}
            />
        );

        expect(
            screen.getByText("Income")
        ).toBeInTheDocument();

        expect(
            screen.getByText("₹10000")
        ).toBeInTheDocument();

        expect(
            screen.getByText("80%")
        ).toBeInTheDocument();
    });

});