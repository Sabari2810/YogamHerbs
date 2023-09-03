'use client'
import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import Button from './Button'

const ProductContainer = () => {
  return (
    <div className='bg-white space-y-3 relative rounded-2xl shadow-sm p-5 border-[1px]'>
      <div className='absolute top-2 left-2'>
        <Image alt='' width={50} height={10} src={"/best-seller.svg"} />
      </div>
      {/* PRODUCT IMAGE */}
      <div className='relative rounded hover:scale-95 duration-200 cursor-pointer'>
        <Image width={400} height={100} alt='product-image' src={"https://www.themancompany.com/cdn/shop/files/charcoal-facewash-100ml-front_480x.png?v=1690190685"} />
      </div>
      {/* PRODUCT DETAILS */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-semibold text-xl line-clamp-2'>Charcoal Peel Off Mask | Charcoal & Gooseberry</h1>
          <p className='text-sm line-clamp-2'>Smoky Lips? And are you tired of all the home remedies that are not working? ...</p>
        </div>
        <div>
          <AiOutlineHeart size={20} />
        </div>
      </div>
      {/* PRICING DETAILS */}
      <div className='flex items-center justify-between'>
        {/* PRICING */}
        <div className='flex items-center space-x-2'>
          <h1 className='font-semibold text-xl'>Rs.400</h1>
          <h1 className='font-semibold text-md text-slate-400 line-through'>Rs.999</h1>
          <h1>20% OFF</h1>
        </div>
        {/* RATING */}
        <div></div>
      </div>
      <Button onClick={() => { }} label='Add to Cart' />
    </div>
  )
}

export default ProductContainer