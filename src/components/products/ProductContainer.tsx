'use client'
import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { IProduct } from '@/types/types'

interface IProps {
  product: IProduct
}

const ProductContainer: React.FC<IProps> = ({ product }) => {
  const router = useRouter();
  const banner_url = "/best-seller.svg"

  const getImageUrl = () => {
    return
  }

  const url = getImageUrl();

  return (
    <div className='bg-white space-y-3 relative rounded-2xl shadow-sm p-5 border-[1px]'>
      <div className='absolute top-2 z-10 left-2'>
        <Image alt='' width={50} height={10} src={banner_url} />
      </div>
      {/* PRODUCT IMAGE */}
      <div onClick={() => {
        router.push(`/product/${product.id}`);
      }} className='relative rounded hover:scale-95 duration-200 cursor-pointer'>
        <Image key={product.id} width={400} height={100} className='w-full h-64 object-cover' alt='product-image'
          src={process.env.STORAGE_URL?.replace("{image_id}", product.ProductVariant[0].id.toUpperCase()) ?? ""} />
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
          <h1 className='font-semibold text-xl'>{product.ProductVariant[0].price}</h1>
          <h1 className='font-semibold text-md text-slate-400 line-through'>{"500"}</h1>
          <h1>{"50"}% OFF</h1>
        </div>
        {/* RATING */}
        <div></div>
      </div>
      <Button onClick={() => { }} label='Add to Cart' />
    </div>
  )
}

export default ProductContainer