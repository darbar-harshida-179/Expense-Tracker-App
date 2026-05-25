
// src/pages/GoogleSuccess.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

function GoogleSuccess() {

    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        const token = queryParams.get("token");

        if(token){
            const decoded = jwtDecode(token);
            login({
                token,
                user: {
                    _id: decoded.id,
                    name: decoded.name,
                    email: decoded.email
                }
            })
            navigate('/dashboard');
        }

    }, [login, navigate]);
    return (
        <div className='min-h-screen w-full flex justify-center items-center text-[#154D71] font-semibold text-2xl'>
            Loading...
        </div>
    );
}

export default GoogleSuccess;