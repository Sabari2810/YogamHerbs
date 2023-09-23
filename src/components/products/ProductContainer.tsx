"use client"
import { IProduct } from '@/types/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import Button from '../Button'
import { CART_ENDPOINT } from '@/lib/constants'
import { useDispatch } from 'react-redux'
import { addCartItem } from '@/redux/features/cartSlice'
import { IAddToCartRequestBody } from '@/types/apitypes'

interface IProps {
  product: IProduct,
  imageUrl: string
}

const ProductContainer: React.FC<IProps> = ({ product, imageUrl }) => {
  const router = useRouter();
  const banner_url = "/best-seller.svg"

  const dispath = useDispatch();

  const addToCart = async () => {
    const response: Response = await fetch(CART_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        productVariantId: product.ProductVariant[0].id
      } as IAddToCartRequestBody)
    })
    if (response.ok) {
      dispath(addCartItem())
    }
  }

  const getPrice = () => {
    return product.discount ? product.discount_price : product.ProductVariant[0].price
  }

  return (
    <div className='bg-white space-y-3 relative rounded-2xl shadow-sm p-5 border-[1px]'>
      <div className='absolute top-2 z-10 left-2'>
        <Image alt='' width={50} height={10} src={banner_url} />
      </div>
      {/* PRODUCT IMAGE */}
      <div onClick={() => {
        router.push(`/product/${product.id}`)
      }} className='relative rounded hover:scale-95 duration-200 cursor-pointer'>
        <Image priority={true} key={product.id} width={400} height={100} className='w-full h-64 object-cover' alt='product-image'
          src={imageUrl} />
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
          {/* PRODUCT PRICE AFTER DISCOUNT */}
          <h1 className='font-semibold text-xl'>₹{getPrice()}</h1>
          {product.discount &&
            <>
              {/* PRODUCT PRICE */}
              <h1 className='font-semibold text-md text-slate-400 line-through'>{product.ProductVariant[0].price}</h1>
              <h1>{product.discount.value}% OFF</h1>
            </>
          }
        </div>
        {/* RATING */}
        <div></div>
      </div>
      <Button onClick={addToCart} label='Add to Cart' />
    </div>
  )
}

export default ProductContainer