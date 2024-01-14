"use client"
import CartProduct from '@/components/cart/CartProduct';
import CouponBox from '@/components/cart/CouponBox';
import EmptyCart from '@/components/cart/EmptyCart';
import OrderSummary from '@/components/cart/OrderSummary';
import PaymentButton from '@/components/cart/PaymentButton';
import PincodeBox from '@/components/cart/PincodeBox';
import { CART_ENDPOINT } from '@/lib/constants';
import { selectCartItems, setCartItems } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ICartItem } from '@/types/types';
import { useEffect } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";

const Cart = () => {
    const dispatch = useAppDispatch();
    const cartItems: ICartItem[] | undefined = useAppSelector(selectCartItems);

    useEffect(() => {
        async function getCartDetails() {
            const response = await fetch(CART_ENDPOINT)

            const data = await response.json() as ICartItem[]

            dispatch(setCartItems(data))
        }

        getCartDetails()
    }, [dispatch])

    return (
        <>
            {
                cartItems !== undefined && cartItems.length > 0 ? <div className='max-w-7xl mx-auto pb-10 pt-2'>
                    <div className='flex items-center gap-2 justify-center py-4'>
                        <AiOutlineShoppingCart size={25} />
                        <h1 className='font-bold text-2xl capitalize'>
                            My Cart
                        </h1>
                    </div>
                    <div className='grid gap-4 grid-cols-8'>
                        <div className='border h-fit py-4 rounded-xl w-full border-slate-200 col-span-8 md:col-span-6 px-4 flex flex-col gap-4'>
                            {
                                cartItems.map((value) => (
                                    <CartProduct key={value.ProductVariantGuid} item={value} />
                                ))
                            }
                        </div>
                        <div className='col-span-8 sticky top-20 h-fit flex flex-col gap-4 md:col-span-2 w-full'>
                            <PincodeBox />
                            <CouponBox />
                            <OrderSummary />
                            <PaymentButton />
                        </div>
                    </div>
                </div> : <EmptyCart />
            }

        </>
    )
}

export default Cart