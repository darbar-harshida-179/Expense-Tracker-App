import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function GoogleSuccess() {

    const navigate = useNavigate();

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        const token = queryParams.get("token");

        if (token) {

            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);

            const existingData = JSON.parse(localStorage.getItem("Expense-Tracker-App")) || {};
            existingData.token = token;

            existingData.user = {
                _id: decoded.id,
                name: decoded.name,
                email: decoded.email
            }
            localStorage.setItem("Expense-Tracker-App", JSON.stringify(existingData));

            navigate("/dashboard");
        }
    }, []);
    return (
        <div className='min-h-screen w-full flex justify-center items-center text-[#154D71] font-semibold text-2xl'>
            Loading...
        </div>
    );
}

export default GoogleSuccess;