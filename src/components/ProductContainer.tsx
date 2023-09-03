'use client'
import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import Button from './Button'
import { useRouter } from 'next/navigation'

export interface IProduct {
  image_url: string;
  banner_url: string;
  title: string;
  description: string;
  price: string;
  discount_price: string;
  discount_percent: string;
  variants: string[];
  quantity: number
}

const ProductContainer = () => {
  const router = useRouter();

  const product: IProduct = {
    image_url: "https://www.themancompany.com/cdn/shop/files/charcoal-facewash-100ml-front_480x.png?v=1690190685",
    banner_url: "/best-seller.svg",
    title: "Charcoal Peel Off Mask | Charcoal & Gooseberry",
    description: "Smoky Lips? And are you tired of all the home remedies that are not working? ...",
    price: "Rs.400",
    discount_price: "Rs.999",
    discount_percent: "20",
    variants: [],
    quantity: 1
  }

  return (
    <div className='bg-white space-y-3 relative rounded-2xl shadow-sm p-5 border-[1px]'>
      <div className='absolute top-2 left-2'>
        <Image alt='' width={50} height={10} src={product.banner_url} />
      </div>
      {/* PRODUCT IMAGE */}
      <div onClick={() => {
        router.push("/product/100");
      }} className='relative rounded hover:scale-95 duration-200 cursor-pointer'>
        <Image width={400} height={100} alt='product-image' src={product.image_url} />
      </div>
      {/* PRODUCT DETAILS */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-semibold text-xl line-clamp-2'>{product.title}</h1>
          <p className='text-sm line-clamp-2'>{product.description}</p>
        </div>
        <div>
          <AiOutlineHeart size={20} />
        </div>
      </div>
      {/* PRICING DETAILS */}
      <div className='flex items-center justify-between'>
        {/* PRICING */}
        <div className='flex items-center space-x-2'>
          <h1 className='font-semibold text-xl'>{product.price}</h1>
          <h1 className='font-semibold text-md text-slate-400 line-through'>{product.discount_price}</h1>
          <h1>{product.discount_percent}% OFF</h1>
        </div>
        {/* RATING */}
        <div></div>
      </div>
      <Button onClick={() => { }} label='Add to Cart' />
    </div>
  )
}

export default ProductContainer