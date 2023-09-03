"use client"
import ProductContainer from '@/components/ProductContainer';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

interface IFilter {
    title: string;
    filters: string[]
}

const products = () => {

    const [activeCat, setActiveCat] = useState("");

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

    const toggleCurrentCat = (category: string) => {
        setActiveCat((prevState) => {
            if (prevState === category) {
                return ""
            }
            return category
        })
    }

    return (
        <div className='max-w-7xl py-10 mx-auto flex items-center justify-between'>
            {/* FILTER */}
            <div className='grid grid-cols-8 w-full'>
                <div className='w-full col-span-2 pr-10 h-fit sticky top-24'>
                    <h1 className='font-semibold text-2xl'>Filter</h1>
                    {/* FILTER LIST */}
                    <hr className='py-3' />
                    <div className='space-y-2'>
                        {filters.map((filter) => (
                            <div>
                                <div onClick={() => toggleCurrentCat(filter.title)} className='flex items-center space-x-10 justify-between'>
                                    <p className='text-sm font-semibold' >{filter.title}</p>
                                    <FaPlus />
                                </div>
                                {filter.title === activeCat &&
                                    <div >
                                        {filter.filters.map((subFilter) => (
                                            <div className='text-sm'>{subFilter}</div>
                                        ))}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>


                {/* PRODUCT LIST */}
                <div className='w-full col-span-6 grid grid-cols-3 gap-4'>
                    {
                        Array(30).fill(0).map(() => (
                            <ProductContainer />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default products