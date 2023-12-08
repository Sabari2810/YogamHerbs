import { CART_ENDPOINT } from '@/lib/constants'
import { updateCartItem } from '@/redux/features/cartSlice'
import { useAppDispatch } from '@/redux/hooks'
import { IAddToCartRequestBody } from '@/types/apitypes'
import { ICartItem } from '@/types/types'
import Image from 'next/image'
import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

interface IProps {
    item: ICartItem
}

const CartProduct: React.FC<IProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const updateCartItemQuantity = async ({ item, action }: { item: ICartItem; action: "INCREMENT" | "DECREMENT" }) => {
        if (item.Quantity === 0 && action === "DECREMENT") return
        const variantId = item.ProductVariantId
        const response: Response = await fetch(CART_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
                productVariantId: variantId,
                value: action === "INCREMENT" ? 1 : -1
            } as IAddToCartRequestBody)
        })
        if (response.ok) {
            dispatch(updateCartItem({
                action: action,
                product_variant_id: variantId
            }))
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 h-fit justify-between border-b last:border-none w-full border-slate-200 last:pb-0 pb-4">
            <div className='flex gap-2 w-full md:w-fit justify-between'>
                <Image
                    className='h-28 md:h-36 col-span-2 w-32 md:w-40 object-cover'
                    width={450}
                    height={450}
                    src={process.env.NEXT_PUBLIC_STORAGE_URL?.replace("{image_id}",
                        item!.ProductVariantGuid.toUpperCase()) ?? ""}
                    alt="product-image"
                />
                <div className=''>
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
            </div>
            <div className='flex flex-col h-full items-end justify-between'>
                <div className='flex md:flex-col md:w-fit h-fit justify-between w-full gap-2 items-center'>
                    <div className='flex space-x-1'>
                        <p className='font-semibold'>Total</p>
                        <p>{item.TotalPrice}</p>
                    </div>
                    <div className='border rounded-full w-32 justify-between flex'>
                        <button onClick={async () => {
                            await updateCartItemQuantity({
                                item,
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
                                item,
                                action: "INCREMENT"
                            })
                        }} className='px-3 rounded-r-full py-1 bg-slate-300'>
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <div className='hidden md:flex gap-2 h-fit items-center'>
                    <button className='text-sm underline'>Remove Product</button>
                    <div className='h-3 border border-slate-500'></div>
                    <button className='text-sm underline'>Move to Wishlist</button>
                    <div className='h-3 border border-slate-500'></div>
                    <button className='text-sm underline'>Save for Later</button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct