// frontend/src/components/SearchBar.jsx

import React from 'react';
import { BsSearch } from "react-icons/bs";

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <>
            <div className='bg-white rounded shadow-sm px-4 py-3 flex h-full items-center'>
               <div className='flex items-center gap-3 w-full border border-[#154D71] rounded p-2'>
                    <BsSearch
                        size={22}
                        className='text-[#154D71]'
                    />
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search by Title'
                       className='outline-none w-full'  
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBar