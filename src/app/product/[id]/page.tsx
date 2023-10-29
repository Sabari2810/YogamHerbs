"use client"
import Button from '@/components/Button'
import ProductRating from '@/components/Rating'
import { GET_PRODUCT_VARIANTS_ENDPOINT } from '@/lib/constants'
import { decrementVariantQuantity, incrementVariantQuantity, selectCurrentVariant, selectCurrentVariantQuantity, selectVariants, setCurrentVariant, setProductVariants } from '@/redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IProductVariant } from '@/types/types'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import 'react-loading-skeleton/dist/skeleton.css'


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

    useEffect(() => {
        async function getProductVariants() {
            const response = await fetch(GET_PRODUCT_VARIANTS_ENDPOINT + params.id)

            const data = await response.json() as IProductVariant[]

            dispatch(setProductVariants(data))
        }

        getProductVariants()
    }, [])

    const CustomLeftArrow: React.FC = ({ onClick }: any) => {
        return (
            <div onClick={onClick} className='p-1 bg-slate-200 rounded-full absolute left-4'>
                <FaArrowLeft size={10} className="cursor-pointer" />
            </div>
        )
    }

    const CustomRightArrow: React.FC = ({ onClick }: any) => {
        return (
            <div onClick={onClick} className='p-1 bg-slate-200 rounded-full absolute right-4'>
                <FaArrowRight size={10} className="cursor-pointer" />
            </div>
        )
    }

    const ProductCarousel = () => {
        return (
            <Carousel
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                arrows
                draggable
                focusOnSelect={false}
                infinite
                minimumTouchDrag={80}
                showDots
                slidesToSlide={1}
                swipeable
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 4,
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                    }
                }}
            >
                {Array(10).fill(0).map((imageUrl, index) => {
                    return (
                        <></>
                        // <Image key={imageUrl} className='w-full p-2 pb-6' width={50} objectFit='contain' height={50} src={product.image_url} alt="movie" />
                    );
                })}
            </Carousel>
        )
    }

    return (
        <>
            {

                currentVariant === undefined ?
                    <div className='max-w-4xl grid grid-cols-2 mx-auto gap-10 items-center py-10'>
                        <Skeleton height={250} className='col-span-1' />
                        <Skeleton height={350} width={600} className='col-span-1' />
                    </div>
                    :
                    <div className='max-w-4xl mx-auto grid grid-cols-2 items-center gap-10 py-10'>
                        {/* HERO SECTION */}
                        {/* PRODUCT IMAGE */}
                        <div className='col-span-1'>
                            <Image className='w-full object-cover h-96' width={700} height={450} alt='img'
                                src={process.env.NEXT_PUBLIC_STORAGE_URL?.replace("{image_id}",
                                    currentVariant!.product_variant_guid.toUpperCase()) ?? ""} />
                            {/* <ProductCarousel /> */}
                        </div>
                        {/* PRODUCT DETAILS */}
                        <div className='flex flex-col space-y-2'>
                            {/* TITLE SECTION */}
                            <div className='flex items-start space-x-2'>
                                <h1 className='font-bold text-3xl'>{currentVariant.title}</h1>
                                <div className='flex items-center space-x-2'>
                                    <AiOutlineHeart size={35} />
                                    <AiOutlineShareAlt size={35} />
                                </div>
                            </div>
                            {/* DESCRIPTION */}
                            <h2 className='font-semibold text-slate-600 line-clamp-3 text-xl'>{currentVariant.description}</h2>
                            {/* RATING SECTION */}
                            <ProductRating rating={3.5} />
                            {/* PRICING SECTION */}
                            <div className='flex items-center space-x-2'>
                                <h3 className='font-semibold text-2xl'>₹{currentVariant.price}</h3>
                                {currentVariant.discount_price &&
                                    <>
                                        <h4 className='font-semibold text-lg text-slate-400 line-through'>{currentVariant.discount_price}</h4>
                                        <h4>{currentVariant.discount_value}% OFF</h4>
                                    </>
                                }
                            </div>
                            {/* VARIANTS AND QUANTITY SECTION */}
                            <div className='flex justify-between'>
                                <div className='grid grid-cols-3 items-center gap-2'>
                                    {
                                        variants.map((variant) => (
                                            <button
                                                onClick={() => dispatch(setCurrentVariant(variant))}
                                                key={variant.product_variant_guid}
                                                className={`px-2 py-1 
                                                ${currentVariant.product_variant_guid === variant.product_variant_guid ? 'border-red-700 border-2 font-bold' : 'border-slate-900'} 
                                                border rounded `}>{variant.volume}
                                                <span className='text-xs'>{variant.unit.toLowerCase()}</span>
                                            </button>
                                        ))
                                    }
                                </div>
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
                            <Button className='py-4' onClick={() => { }} label='Add to Cart' />
                            {/* ESTIMATED DELIVERY */}
                            <div className='flex flex-col space-y-2'>
                                <div className='grid grid-cols-6 space-x-2'>
                                    <input placeholder='Enter Pincode' type="text" maxLength={6} className='col-span-5 border outline-none h-10 px-2' />
                                    <Button className="col-span-1" label='Check' onClick={() => { }} />
                                </div>
                                {/* <p>Est.Delivery Date</p> */}
                            </div>
                        </div>
                    </div>
            }

        </>

    )
}

export default Page