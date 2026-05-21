// frontend/src/components/Calender.jsx

import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calender({
    selectedDate,
    setSelectedDate,
    setOpenCalendar
}) {
    return (
        <>
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        const existingData = JSON.parse(localStorage.getItem("Expense-Tracker-App")) || {};
                        existingData.selectedMonth = date;
                        localStorage.setItem("Expense-Tracker-App", JSON.stringify(existingData));
                        setOpenCalendar(false);
                    }}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    inline
                    className='bg-white border border-gray-200 px-5 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md cursor-pointer outline-none text-center'
                />
            </div>
        </>
    )
}

export default Calender
