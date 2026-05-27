// src/routes/ProtectedRoute.jsx

import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Protectedroute({ children }) {

    const { token, loading } = useAuth();

    if (loading) {
        return (
            <p className='min-h-screen flex justify-center items-center text-gray-700 font-semibold'>
                Loading..
            </p>
        );
    }

    return token ? children : <Navigate to='/login' />;
}

export default Protectedroute;