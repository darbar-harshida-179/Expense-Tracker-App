// src/pages/GoogleSuccess.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

function GoogleSuccess() {

    const { login } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        const token = queryParams.get("token");

        if (token) {
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
        <Loading text='Signing In' />
    );
}

export default GoogleSuccess;