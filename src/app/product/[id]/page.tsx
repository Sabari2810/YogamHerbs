"use client"
import Button from '@/components/Button'
import CustomSkeleton from '@/components/CustomSkeleton'
import ProductRating from '@/components/Rating'
import { CART_ENDPOINT, GET_PRODUCT_VARIANTS_ENDPOINT } from '@/lib/constants'
import { increaseCartCount } from '@/redux/features/cartSlice'
import { decrementVariantQuantity, incrementVariantQuantity, selectCurrentVariant, selectCurrentVariantQuantity, selectVariants, setCurrentVariant, setProductVariants } from '@/redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IAddToCartRequestBody } from '@/types/apitypes'
import { IProductVariant } from '@/types/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FaMinus, FaPlus } from 'react-icons/fa'


interface IProps {
    params: {
        id: string
    }
}

const Page: React.FC<IProps> = ({ params }) => {
    const dispatch = useAppDispatch()
    const currentVariant: IProductVariant | undefined = useAppSelector(selectCurrentVariant);
    const variants: IProductVariant[] | undefined = useAppSelector(selectVariants);
    const quantity: number | undefined = useAppSelector(selectCurrentVariantQuantity);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getProductVariants() {
            const response = await fetch(GET_PRODUCT_VARIANTS_ENDPOINT + params.id)
            const data = await response.json() as IProductVariant[]
            dispatch(setProductVariants(data))
        }

        getProductVariants()
    }, [dispatch, params.id])

    const addToCart = async () => {
        setIsLoading(true);
        const response: Response = await fetch(CART_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
                productVariantId: currentVariant?.ProductVariantId,
                value: quantity
            } as IAddToCartRequestBody)
        })
        if (response.ok) {
            dispatch(increaseCartCount(quantity))
        }
        setIsLoading(false);
    }

    const ScreenSkeleton: React.FC = () => {
        return (
            <>
                {/* TITLE SECTION */}
                <CustomSkeleton className='h-96' />
                <div className='flex flex-col h-full items-start px-2 justify-center space-y-2'>
                    <CustomSkeleton className='h-8 w-72' />
                    <CustomSkeleton className='h-4 w-full' />
                    <CustomSkeleton className='h-4 w-full' />
                    <CustomSkeleton className='h-4 w-full' />
                    <CustomSkeleton className='h-4 w-full' />
                    <CustomSkeleton className='h-5 w-60' />
                    <CustomSkeleton className='h-5 w-72' />
                    <div className='flex items-center w-full justify-between'>
                        <CustomSkeleton className='h-10 rounded-lg w-20' />
                        <CustomSkeleton className='h-7 w-32 rounded-full' />
                    </div>
                    <CustomSkeleton className='h-14 w-full rounded-lg' />
                    <div className='flex items-center justify-between w-full space-x-3'>
                        <CustomSkeleton className='h-14 flex-1 rounded-lg' />
                        <CustomSkeleton className='h-14 w-24 rounded-lg' />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {
                <div className='max-w-4xl  mx-auto grid sm:grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-10 py-4 md:py-10'>
                    {
                        currentVariant === undefined ? <ScreenSkeleton /> :
                            <>
                                {/* PRODUCT IMAGE */}
                                <div className='col-span-1'>
                                    <Image className='w-full md:rounded-sm object-cover h-72 md:h-96' width={700} height={450} alt='img'
                                        src={process.env.NEXT_PUBLIC_STORAGE_URL?.replace("{image_id}",
                                            currentVariant.ProductVariantGuid.toUpperCase()) ?? ""} />
                                    {/* <ProductCarousel /> */}
                                </div>
                                {/* PRODUCT DETAILS */}
                                <div className='flex px-4 md:px-0 flex-col space-y-2'>
                                    {/* TITLE SECTION */}
                                    <div className='flex items-start space-x-2'>
                                        <h1 className='font-bold text-xl md:text-3xl'>{currentVariant!.Title}</h1>
                                        <div className='flex items-center space-x-2'>
                                            <div className="h-7 md:h-10">
                                                <AiOutlineHeart className="w-full h-full" />
                                            </div>
                                            <div className="h-7 md:h-10">
                                                <AiOutlineShareAlt className="w-full h-full" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* DESCRIPTION */}
                                    <h2 className='font-semibold text-slate-600 line-clamp-3 text-sm md:text-xl'>{currentVariant.Description}</h2>
                                    {/* RATING SECTION */}
                                    <ProductRating rating={3.5} />
                                    {/* PRICING SECTION */}
                                    <div className='flex items-center space-x-2'>
                                        <h3 className='font-semibold text-2xl'>₹{currentVariant.DiscountPrice ?? currentVariant.Price}</h3>
                                        {currentVariant.DiscountPrice &&
                                            <>
                                                <h4 className='font-semibold text-lg text-slate-400 line-through'>{currentVariant.Price}</h4>
                                                <h4>{currentVariant.DiscountValue}% OFF</h4>
                                            </>
                                        }
                                    </div>
                                    {/* VARIANTS AND QUANTITY SECTION */}
                                    <div className='md:flex space-y-2 md:space-y-0 md:justify-between'>
                                        {/* VARIANTS */}
                                        <div className='grid grid-cols-4 md:grid-cols-2 items-center gap-2'>
                                            {
                                                variants.map((variant) => (
                                                    <button
                                                        onClick={() => dispatch(setCurrentVariant(variant))}
                                                        key={variant.ProductVariantGuid}
                                                        className={`px-2 py-1 text-lg col-span-1
                                        ${currentVariant.ProductVariantGuid === variant.ProductVariantGuid ? 'border-red-700 border-2 font-bold' : 'border-slate-900'} 
                                        border rounded `}>{variant.Volume}
                                                        <span className='text-xs'>{variant.Unit.toLowerCase()}</span>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                        {/* QUANTITY */}
                                        <div className='flex items-center space-x-2'>
                                            <h5 className='font-semibold text-lg'>Quantity</h5>
                                            <div className='border rounded-full w-32 justify-between flex'>
                                                <button onClick={() => dispatch(decrementVariantQuantity())} className='px-3 rounded-l-full py-1 bg-slate-300'>
                                                    <FaMinus />
                                                </button>
                                                <p className='text-black py-1'>
                                                    {quantity}
                                                </p>
                                                <button onClick={() => dispatch(incrementVariantQuantity())} className='px-3 rounded-r-full py-1 bg-slate-300'>
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ADD TO CART */}
                                    <Button isLoading={isLoading} className='py-4' onClick={async () => await addToCart()} label='Add to Cart' />
                                    {/* ESTIMATED DELIVERY */}
                                    <div className='flex flex-col space-y-2'>
                                        <div className='grid grid-cols-6 space-x-2'>
                                            <input placeholder='Enter Pincode' type="text" maxLength={6} className='col-span-4 md:col-span-5 border outline-none h-10 px-2' />
                                            <Button className="col-span-2 md:col-span-1" label='Check' onClick={() => { }} />
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            }

        </>

    )
}

export default Page