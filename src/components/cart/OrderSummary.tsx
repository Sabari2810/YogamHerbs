import { selectCartItems, selectCouponApplied } from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { ICartItem } from '@/types/types';
import React from 'react'

const OrderSummary = () => {
    const cartItems: ICartItem[] | undefined = useAppSelector(selectCartItems);
    const couponApplied: boolean = useAppSelector(selectCouponApplied);

    return (
        <div className='border-slate-200 border p-4 rounded-md'>
            {/* PRICE SUMMARY */}
            <div>
                <div className='py-2 border-b-2 border-b-slate-200'>
                    {
                        cartItems.map((item) => (
                            <div className='grid grid-cols-6 items-center justify-between'>
                                <p className='col-span-4 w-48 md:w-32 text-lg md:text-sm truncate'>{item.Title}</p>
                                <p className='col-span-1'>x{item.Quantity}</p>
                                <p className='col-span-1'>{item.TotalPrice}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex border-b-2 items-center py-2 justify-between'>
                    <p>Total</p>
                    <p>{cartItems.reduce((total, item) => item.TotalPrice + total, 0)}</p>
                </div>
            </div>

            {/* DISCOUNT SUMMARY */}
            <div>
                {
                    couponApplied && <div className='py-2 border-b-2 border-b-slate-200'>
                        {/* COUPON APPLIED */}
                        <div className='flex items-center justify-between'>
                            <p className='w-48 md:w-32 text-lg md:text-sm truncate'>Coupon Discount</p>
                            <p>{100}</p>
                        </div>
                    </div>
                }

                <div className='flex border-b-2 items-center py-2 justify-between'>
                    <p>Grand Total</p>
                    <p>{cartItems.reduce((total, item) => item.TotalPrice + total, 0)}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary