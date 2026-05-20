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

            localStorage.setItem("user", JSON.stringify({
                _id: decoded.id,
                name: decoded.name,
                email: decoded.email
            }));

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