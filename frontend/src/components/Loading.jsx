// src/components/Loading.jsx

import React from 'react'

function Loading({ text = "Loading...", fullScreen = true }) {

    if (fullScreen) {
        return (
            <div className='min-h-screen flex justify-center items-center text-xl font-semibold text-[#154D71]'>
                <p>{text}</p>
            </div>
        )
    }
    
    return (
        <span className='text-white font-medium'>
            {text}
        </span>
    )
}

export default Loading