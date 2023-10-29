"use client"
import { ICategory } from '@/types/types';
import React from 'react'

interface IFilter {
    title: string;
    filters: IFilterItem[]
}

interface IFilterItem {
    title: string
    value: string | number
}

interface IProps {
    categories: ICategory[]
}

const Filters: React.FC<IProps> = ({ categories }) => {

    const filters: IFilter[] = [{
        title: "Category",
        filters: categories.map((category) => ({
            ...category,
            value: category.title
        }))
    }, {
        title: "Price",
        filters: [{
            title: "Under 100",
            value: 100
        }, {
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