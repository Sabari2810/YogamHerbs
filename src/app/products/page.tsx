import Filters from '@/components/products/Filters';
import ProductContainer from '@/components/products/ProductContainer';
import { GET_CATEGORIES_ENDPOINT, GET_PRODUCTS_ENDPOINT } from '@/lib/constants';
import { noCache } from '@/lib/utils';
import { ICategory, IProduct } from '@/types/types';
import React from 'react'


const products = async () => {

    // FETCH PRODUCT DETAILS
    const response: Response = await fetch(GET_PRODUCTS_ENDPOINT, {
        cache: noCache,
        next: {
            tags: ["products"]
        }
    });

    // FETCH CATEGORIES
    const categoryResponse: Response = await fetch(GET_CATEGORIES_ENDPOINT, {
        cache: noCache,
        next: {
            tags: ["categories"]
        }
    });

    const products = await response.json() as IProduct[];
    const categories = await categoryResponse.json() as ICategory[];

    return (
        <div className='max-w-7xl py-10 mx-auto flex items-center justify-between'>
            {/* FILTER */}
            <div className='grid grid-cols-8 w-full'>
                <div className='w-full col-span-4 md:col-span-2 pr-10 h-fit sticky top-24'>
                    <h1 className='font-semibold text-2xl'>Filter</h1>
                    {/* FILTER LIST */}
                    <hr className='py-3' />
                    <div className='space-y-2'>
                        <Filters categories={categories} />
                    </div>
                </div>

                {/* PRODUCT LIST */}
                <div className='w-full col-span-6 grid md:grid-cols-3 sm:grid-cols-2  gap-4'>
                    {
                        products.map((product) => {
                            return (
                                <ProductContainer product={product} key={product.variant_guid}
                                    imageUrl={process.env.NEXT_PUBLIC_STORAGE_URL?.replace("{image_id}",
                                        product.variant_guid.toUpperCase()) ?? ""} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default products