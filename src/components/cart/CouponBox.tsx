import React from 'react'
import Button from '../Button'

const CouponBox = () => {
    return (
        <div className='flex flex-col px-6 md:px-0 w-full h-full items-start'>
            {/* DELIVERY DATE SECTION */}
            <p>Coupon</p>
            <div className='flex gap-2 w-full h-10 items-center'>
                <input type="text" className='flex-1 h-full border rounded-sm outline-none px-2' name="" id="" />
                <Button onClick={() => { }} label='Apply' className='w-full' />
            </div>
        </div>
    )
}

export default CouponBox