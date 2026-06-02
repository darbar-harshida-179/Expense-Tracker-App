// src/routes/__tests__PublicRoute.jsx

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {

    const { token, loading } = useAuth();

    if (loading) {
        return (
            <p className='min-h-screen flex justify-center items-center text-gray-700 font-semibold'>Loading...</p>
        )
    }
    return token ? <Navigate to='/dashboard' /> : children;
}

export default PublicRoute