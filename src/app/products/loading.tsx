import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
    return (
        <div className='max-w-7xl py-10 mx-auto flex items-center justify-between'>
            {/* FILTER */}
            <div className='grid grid-cols-8 w-full'>
                <div className='w-full col-span-4 md:col-span-2 pr-10 h-fit'>
                    <h1 className='font-semibold text-2xl'>
                        <Skeleton />
                    </h1>
                    {/* FILTER LIST */}
                    <div className='mt-4'>
                        <Skeleton height={150} />
                    </div>
                </div>

                {/* PRODUCT LIST */}
                <div className='w-full col-span-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
                    {
                        Array(6).fill(0).map((product, index) => {

                            return (
                                <Skeleton key={index} height={250} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default loading