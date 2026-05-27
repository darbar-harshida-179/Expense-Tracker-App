// frontend/src/components/Filter.jsx

import React from 'react';
import { BiFilter } from "react-icons/bi";
import Select from 'react-select';

function Filter({ selectedCategory, setSelectedCategory, categories }) {

    const categoryOptions = categories.map((category) => ({
        value: category,
        label: category
    }));

    return (
        <div className='bg-white rounded shadow-sm px-4 py-3 h-full flex items-center'>

            <div className='flex items-center gap-3 w-full border border-[#154D71] rounded p-2'>

                <BiFilter
                    size={24}
                    className='text-[#154D71]'
                />

                <div>
                    <Select
                        options={categoryOptions}
                        placeholder="Filter Category"
                        menuPortalTarget={document.body}
                        menuPosition='fixed'
                        value={
                            categoryOptions.find(
                                (option) => option.value === selectedCategory
                            )
                        }
                        onChange={(selectedOption) =>
                            setSelectedCategory(selectedOption?.value || "")
                        }
                        styles={{
                            control: (base) => ({
                                ...base,
                                border: 'none',
                                boxShadow: 'none',
                                minHeight: '20px',
                                maxWidth: '200px'
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

export default Filter