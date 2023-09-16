"use client"
import Button from '@/components/Button'
import ProductRating from '@/components/Rating'
import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"

interface IProps {
    params: {
        id: string
    }
}

const Page: React.FC<IProps> = ({ params }) => {

    console.log('params.id', params.id)

    const product = {
        image_url: "https://www.themancompany.com/cdn/shop/products/3_bc632f6c-4c83-43e4-a92c-14e19e04a77a_765x.jpg?v=1690190685",
        banner_url: "/best-seller.svg",
        title: "Lightening Lip Balm SPF15 | Vitamin E & Liquorice Oil",
        description: "Smoky Lips? And are you tired of all the home remedies that are not working? ...",
        price: "Rs.400",
        discount_price: "Rs.999",
        discount_percent: "20",
        variants: ["300", "500"],
        quantity: 10
    }

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
                        <Image key={imageUrl} className='w-full p-2 pb-6' width={50} objectFit='contain' height={50} src={product.image_url} alt="movie" />
                    );
                })}
            </Carousel>
        )
    }

    return (
        <div className='max-w-4xl mx-auto grid grid-cols-2 items-center gap-10 py-10'>
            {/* HERO SECTION */}
            {/* PRODUCT IMAGE */}
            <div className='col-span-1'>
                <div >
                    <Image className='w-full' width={700} height={450} alt='img' src={product.image_url} />
                </div>
                <ProductCarousel />
            </div>
            {/* PRODUCT DETAILS */}
            <div className='flex flex-col space-y-2'>
                {/* TITLE SECTION */}
                <div className='flex items-start space-x-2'>
                    <h1 className='font-bold text-3xl'>{product.title}</h1>
                    <div className='flex items-center space-x-2'>
                        <AiOutlineHeart size={35} />
                        <AiOutlineShareAlt size={35} />
                    </div>
                </div>
                {/* DESCRIPTION */}
                <h1 className='font-semibold text-slate-600 line-clamp-3 text-xl'>{product.description}</h1>
                {/* RATING SECTION */}
                <ProductRating rating={3.5} />
                {/* PRICING SECTION */}
                <div className='flex items-center space-x-2'>
                    <h1 className='font-semibold text-2xl'>{product.price}</h1>
                    <h1 className='font-semibold text-lg text-slate-400 line-through'>{product.discount_price}</h1>
                    <h1>{product.discount_percent}% OFF</h1>
                </div>
                {/* VARIANTS AND QUANTITY SECTION */}
                <div className='flex justify-between'>
                    <div className='flex items-center space-x-2'>
                        {
                            product.variants.map((variant) => (
                                <button key={variant} className='px-4 py-1 border rounded border-slate-900'>{variant}</button>
                            ))
                        }
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1 className='font-semibold text-xl'>Quantity</h1>
                        <div className='border rounded-full w-40 justify-between flex'>
                            <button className='px-4 rounded-l-full py-2 bg-slate-300'>
                                <FaMinus />
                            </button>
                            <p className='text-black py-2'>
                                {product.quantity}
                            </p>
                            <button className='px-4 rounded-r-full py-2 bg-slate-300'>
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
    )
}

export default Page