"use client"
import { IProduct } from '@/types/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import Button from '../Button'
import { CART_ENDPOINT } from '@/lib/constants'
import { useDispatch } from 'react-redux'
import { addCartItem } from '@/redux/features/cartSlice'
import { IAddToCartRequestBody } from '@/types/apitypes'
import ProductRating from '../Rating'

interface IProps {
  product: IProduct,
  imageUrl: string
}

const ProductContainer: React.FC<IProps> = ({ product, imageUrl }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const banner_url = "/best-seller.svg"

  const dispatch = useDispatch();

  const addToCart = async () => {
    setIsLoading(true);
    const response: Response = await fetch(CART_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        productVariantId: product.VariantId,
        action: "INCREMENT"
      } as IAddToCartRequestBody)
    })
    if (response.ok) {
      dispatch(addCartItem())
    }
    setIsLoading(false);
  }

  const getPrice = () => {
    return product.DiscountPrice ?? product.Price
  }

  return (
    <div className='bg-white w-full space-y-3 relative rounded-xl shadow-sm p-2 md:p-5 border-[1px]'>
      <div className='absolute top-2 z-10 -left-2 md:left-2'>
        <Image alt='' className='md:h-10 h-7' width={50} height={10} src={banner_url} />
      </div>
      {/* PRODUCT IMAGE */}
      <div onClick={() => {
        router.push(`/product/${product.ProductGuid}`)
      }} className='relative rounded hover:scale-95 duration-200 cursor-pointer'>
        <Image priority={true} key={product.VariantGuid} width={400} height={100} className='w-full h-36 md:h-64 object-cover' alt='product-image'
          src={imageUrl ?? "https://dsitestsa.blob.core.windows.net/yogam/C2ED9EEB-631D-40C4-87BB-BC2BE772C926.jpg"} />
      </div>
      {/* PRODUCT DETAILS */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='font-semibold text-xs md:text-xl line-clamp-2'>{product.Title}</h1>
          <p className='md:block hidden text-sm'>
            <span className='line-clamp-2'>
              {product.Description}
            </span>
          </p>
        </div>
        <div className='hidden md:block'>
          <AiOutlineHeart size={20} />
        </div>
      </div>
      {/* PRICING DETAILS */}
      <div className='flex flex-col items-start justify-between'>
        {/* PRICING */}
        <div className='flex items-center md:text-base text-xs space-x-1 md:space-x-2'>
          {/* PRODUCT PRICE AFTER DISCOUNT */}
          <h1 className='font-semibold md:text-xl'>₹{getPrice()}</h1>
          {product.DiscountId &&
            <>
              {/* PRODUCT PRICE */}
              <h1 className='font-semibold text-slate-400 line-through'>{product.Price}</h1>
              <h1>{product.DiscountValue}% OFF</h1>
            </>
          }
        </div>
        {/* RATING */}
        <ProductRating rating={3.5} />
      </div>
      <Button className='text-xs md:text-lg' isLoading={isLoading} onClick={addToCart} label='Add to Cart' />
    </div>
  )
}

export default ProductContainer