import React from 'react'
import Button from '../Button'

const PincodeBox = () => {
    return (
        <div className='flex px-6 md:px-0 flex-col items-start'>
            {/* DELIVERY DATE SECTION */}
            <p>Pincode</p>
            <div className='flex md:flex-row gap-2 h-10 w-full items-center'>
                <input type="text" className='flex-1 h-full rounded-sm border outline-none px-2' name="" id="" />
                <Button onClick={() => { }} label='check' className='w-full' />
            </div>
        </div>
    )
}

export default PincodeBox