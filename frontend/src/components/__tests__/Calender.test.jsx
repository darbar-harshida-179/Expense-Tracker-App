// frontend/src/components/__tests__/Calender.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Calender from "../Calender";

vi.mock("react-datepicker", () => ({
    default: ({ onChange }) => (
        <button
            data-testid="datepicker"
            onClick={() => onChange(new Date("2026-06-01"))}
        >
            Select Date
        </button>
    )
}));

describe("Calender", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test("renders date picker", () => {

        render(
            <Calender
                selectedDate={new Date("2026-05-01")}
                setSelectedDate={vi.fn()}
                setOpenCalendar={vi.fn()}
            />
        );

        expect(
            screen.getByTestId("datepicker")
        ).toBeInTheDocument();
    });

    test("calls setSelectedDate when date changes", () => {

        const mockSetSelectedDate = vi.fn();

        render(
            <Calender
                selectedDate={new Date("2026-05-01")}
                setSelectedDate={mockSetSelectedDate}
                setOpenCalendar={vi.fn()}
            />
        );

        fireEvent.click(
            screen.getByTestId("datepicker")
        );

        expect(
            mockSetSelectedDate
        ).toHaveBeenCalled();
    });

    test("stores selected month in localStorage", () => {

        render(
            <Calender
                selectedDate={new Date("2026-05-01")}
                setSelectedDate={vi.fn()}
                setOpenCalendar={vi.fn()}
            />
        );

        fireEvent.click(
            screen.getByTestId("datepicker")
        );

        const data = JSON.parse(
            localStorage.getItem("Expense-Tracker-App")
        );

        expect(data.selectedMonth).toBeTruthy();
    });

    test("closes calendar after selecting date", () => {

        const mockSetOpenCalendar = vi.fn();

        render(
            <Calender
                selectedDate={new Date("2026-05-01")}
                setSelectedDate={vi.fn()}
                setOpenCalendar={mockSetOpenCalendar}
            />
        );

        fireEvent.click(
            screen.getByTestId("datepicker")
        );

        expect(
            mockSetOpenCalendar
        ).toHaveBeenCalledWith(false);
    });

});