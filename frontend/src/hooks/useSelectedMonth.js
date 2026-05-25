// frontend/src/hooks/useSelectedMonth.js

import React, { useState } from 'react'

function useSelectedMonth() {

    const [selectedDate, setSelectedDate] = useState(() => {
        const appData = JSON.parse(localStorage.getItem("Expense-Tracker-App"));
        const savedDate = appData?.selectedMonth;
        return savedDate ? new Date(savedDate) : new Date();
    });

    return{
        selectedDate,
        setSelectedDate
    }
}

export default useSelectedMonth