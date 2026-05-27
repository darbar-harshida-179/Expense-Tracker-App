// frontend/src/components/Sort.jsx

import React from 'react';
import Select from 'react-select';
import { LuArrowUpDown } from "react-icons/lu";

function Sort({ sortBy, setSortBy }) {

    const sortOptions = [
        { value: '', label: 'Select Sorting' },
        { value: 'latest', label: 'Latest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'highest', label: 'Highest Amount' },
        { value: 'lowest', label: 'Lowest Amount' }
    ];

    return (
        <div className='bg-white rounded shadow-sm px-4 py-3 h-full flex items-center'>

            <div className='flex items-center gap-3 w-full border border-[#154D71] rounded p-2'>

                <LuArrowUpDown
                    size={22}
                    className='text-[#154D71]'
                />

                <div className='w-full'>
                    <Select
                        options={sortOptions}
                        placeholder="Select Sorting"

                        value={
                            sortOptions.find(
                                (option) => option.value === sortBy
                            )
                        }

                        onChange={(selectedOption) =>
                            setSortBy(selectedOption.value)
                        }

                        menuPortalTarget={document.body}
                        menuPosition="fixed"

                        styles={{
                            control: (base) => ({
                                ...base,
                                border: 'none',
                                boxShadow: 'none',
                                minHeight: '10px'
                            }),

                            indicatorSeparator: () => ({
                                display: 'none'
                            }),

                            menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999
                            })
                        }}  
                    />
                </div>

            </div>

        </div>
    )
}

export default Sort