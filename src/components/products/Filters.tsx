"use client"
import React from 'react'

interface IFilter {
    title: string;
    filters: IFilterItem[]
}

interface IFilterItem {
    title: string
    value: string | number
}

const Filters = () => {

    const filters: IFilter[] = [{
        title: "Category",
        filters: [{
            title: "One",
            value: "one"
        }]
    }, {
        title: "Price",
        filters: [{
            title: "Under 500",
            value: 500
        }]
    }]

    return (
        <div className='space-y-4'>
            {
                filters.map((filter) => {
                    return (<div key={filter.title}>
                        <div className='flex pb-2 items-center space-x-10 justify-between'>
                            <p className='text-sm font-semibold'>{filter.title}</p>
                        </div>
                        <div >
                            {filter.filters.map((subFilter) => (
                                <div key={subFilter.title} className='flex items-center space-x-2'>
                                    <input type="checkbox" />
                                    <div className='text-sm'>{subFilter.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

export default Filters