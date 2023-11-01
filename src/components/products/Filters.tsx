"use client"
import { ICategory } from '@/types/types';
import React from 'react'

interface IFilter {
    title: string;
    filterItems: IFilterItem[]
}

interface IFilterItem {
    Title: string
    Value: string | number
}

interface IProps {
    categories: ICategory[]
}

const Filters: React.FC<IProps> = ({ categories }) => {

    const filters: IFilter[] = [{
        title: "Category",
        filterItems: categories.map((category) => ({
            ...category,
            Value: category.Title
        }))
    }, {
        title: "Price",
        filterItems: [{
            Title: "Under 100",
            Value: 100
        }, {
            Title: "Under 500",
            Value: 500
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
                            {filter.filterItems.map((subFilter) => (
                                <div key={subFilter.Title} className='flex items-center space-x-2'>
                                    <input type="checkbox" />
                                    <div className='text-sm'>{subFilter.Title}</div>
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