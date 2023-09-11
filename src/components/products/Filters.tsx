"use client"
import { randomUUID } from 'crypto';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';

interface IFilter {
    title: string;
    filters: string[]
}

const Filters = () => {

    const filters: IFilter[] = [{
        title: "One",
        filters: [
            "One",
            "Two",
            "Three"
        ]
    }, {
        title: "Two",
        filters: [
            "One",
            "Two",
            "Three"
        ]
    }]

    const [activeCat, setActiveCat] = useState("");



    const toggleCurrentCat = (category: string) => {
        setActiveCat((prevState) => {
            if (prevState === category) {
                return ""
            }
            return category
        })
    }

    return (
        <div>
            {filters.map((filter) => (
                <div key={filter.title} >
                    <div onClick={() => toggleCurrentCat(filter.title)} className='flex items-center space-x-10 justify-between'>
                        <p className='text-sm font-semibold' >{filter.title}</p>
                        <FaPlus />
                    </div>
                    {filter.title === activeCat &&
                        <div >
                            {filter.filters.map((subFilter) => (
                                <div key={subFilter.length} className='text-sm'>{subFilter}</div>
                            ))}
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default Filters