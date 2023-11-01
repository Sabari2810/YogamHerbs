"use client"
import { CART_ENDPOINT } from '@/lib/constants';
import { addCartItem, selectCartItems, setCartItems, updateCartItem } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IAddToCartRequestBody } from '@/types/apitypes';
import { ICartItem } from '@/types/types';
import Image from 'next/image';
import { useEffect } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaMinus, FaPlus } from 'react-icons/fa';

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
    }, [])

    const updateCartItemQuantity = async ({ productVariantId, action }: IAddToCartRequestBody) => {
        const response: Response = await fetch(CART_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
                productVariantId,
                action
            } as IAddToCartRequestBody)
        })
        if (response.ok) {
            dispatch(updateCartItem({
                action: action,
                product_variant_id: productVariantId
            }))
        }
    }

    const CartProduct = ({ item }: { item: ICartItem }) => {
        return (
            <div className="grid grid-cols-8 gap-4 border-b last:border-none border-slate-200 last:pb-0 pb-4">
                <Image
                    className='h-48 col-span-2 w-40 object-cover'
                    width={450}
                    height={450}
                    src={process.env.NEXT_PUBLIC_STORAGE_URL?.replace("{image_id}",
                        item!.ProductVariantGuid.toUpperCase()) ?? ""}
                    alt=""
                />
                <div className='col-span-2'>
                    <h2 className='font-semibold text-base'>{item.Title}</h2>
                    <h3>
                        <span className='pr-1 text-slate-500'>
                            Volume :
                        </span>
                        {item.Volume + item.Unit.toLowerCase()}
                    </h3>
                    <h3>
                        <span className='pr-1 text-slate-500'>
                            Price :
                        </span>
                        {item.DiscountPrice ?? item.Price}
                        <span className='pl-1 line-through text-slate-400'>{item.Price}</span>
                    </h3>
                </div>
                <div className='col-span-2'>
                    <div className='flex flex-col gap-2 items-start'>
                        <h5 className='font-semibold text-lg'>Quantity</h5>
                        <div className='border rounded-full w-32 justify-between flex'>
                            <button onClick={async () => {
                                await updateCartItemQuantity({
                                    productVariantId: item.ProductVariantId,
                                    action: "DECREMENT"
                                })
                            }} className='px-3 rounded-l-full py-1 bg-slate-300'>
                                <FaMinus />
                            </button>
                            <p className='text-black py-1'>
                                {item.Quantity}
                            </p>
                            <button onClick={async () => {
                                await updateCartItemQuantity({
                                    productVariantId: item.ProductVariantId,
                                    action: "INCREMENT"
                                })
                            }} className='px-3 rounded-r-full py-1 bg-slate-300'>
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <p>Total</p>
                    <p>{item.TotalPrice}</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center gap-2 justify-center py-4'>
                    <AiOutlineShoppingCart size={25} />
                    <h1 className='font-bold text-2xl capitalize'>
                        My Cart
                    </h1>
                </div>
                <div className='grid grid-cols-8'>
                    <div className='border py-4 rounded-xl border-slate-200 col-span-5 px-4 flex flex-col gap-4'>
                        {
                            cartItems.map((value) => (
                                <CartProduct key={value.ProductVariantGuid} item={value} />
                            ))
                        }
                    </div>
                    <div className='col-span-3'></div>
                </div>
            </div>
        </>
    )
}

export default Cart