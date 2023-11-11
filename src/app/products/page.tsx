"use client"
import CustomSkeleton from '@/components/CustomSkeleton';
import Filters from '@/components/products/Filters';
import ProductContainer from '@/components/products/ProductContainer';
import { GET_CATEGORIES_ENDPOINT, GET_PRODUCTS_ENDPOINT } from '@/lib/constants';
import { noCache } from '@/lib/utils';
import { changePage, selectCategories, selectCurrentPage, selectPageProducts, setCategories, setProducts } from '@/redux/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IGetProductsRequestBody } from '@/types/apitypes';
import { ICategory, IProduct } from '@/types/types';
import { Pagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Products: React.FC = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const products = useAppSelector(selectPageProducts)
    const categories = useAppSelector(selectCategories)
    const currentPage = useAppSelector(selectCurrentPage)
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const fetchProducts = async (page: number) => {
        const response: Response = await fetch(GET_PRODUCTS_ENDPOINT, {
            cache: noCache,
            next: {
                tags: ["products"]
            },
            method: "POST",
            body: JSON.stringify({ page: page } as IGetProductsRequestBody)
        });
        const productsData = await response.json() as IProduct[]
        dispatch(setProducts(productsData))
    }

    const fetchCategories = async () => {
        const categoryResponse: Response = await fetch(GET_CATEGORIES_ENDPOINT, {
            cache: noCache,
            next: {
                tags: ["categories"]
            }
        });

        const categoryData = await categoryResponse.json() as ICategory[]
        dispatch(setCategories(categoryData))
    }

    useEffect(() => {
        const page = Number(searchParams.get("page") ?? 1) ?? 1
        setPageQueryString(page)
        dispatch(changePage(page))
        fetchProducts(page)
        fetchCategories()
    }, [])

    const setPageQueryString = (value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", value.toString());
        router.replace(`${pathname}?${params}`)
    }

    const handlePageChange = async (e: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changePage(value))
        setPageQueryString(value)
        dispatch(setProducts([]));
        await fetchProducts(value)
    }

    return (
        <div className='max-w-7xl py-10 px-2 mx-auto flex gap-x-10 items-center justify-between'>
            {/* FILTER */}
            <div className='grid grid-cols-8 w-full'>
                {
                    <div className='w-full md:inline-block hidden col-span-4 md:col-span-2 pr-10 h-fit sticky top-24'>
                        <h1 className='font-semibold text-2xl'>Filter</h1>
                        {/* FILTER LIST */}
                        <hr className='py-3' />
                        <div className='space-y-2'>
                            {categories.length === 0 ? <>
                                <CustomSkeleton className='h-52' />
                                <CustomSkeleton className='h-52' />
                            </>
                                :
                                <Filters categories={categories} />
                            }
                        </div>

                    </div>
                }


                {/* PRODUCT LIST */}
                <div className='col-span-8 items-center space-y-3 justify-center flex-col flex md:col-span-6'>
                    <div className='w-full grid lg:grid-cols-3 grid-cols-2 gap-4'>
                        {
                            products.length === 0 ? (
                                Array(9).fill(0).map((value, idx) => (
                                    <CustomSkeleton key={idx} className='h-64 w-30' />
                                ))
                            )
                                : products.map((product) => {
                                    return (
                                        <ProductContainer product={product} key={product.VariantGuid}
                                            imageUrl={process.env.NEXT_PUBLIC_STORAGE_URL?.replace("{image_id}",
                                                product.VariantGuid.toUpperCase()) ?? ""} />
                                    )
                                })
                        }
                    </div>
                    <Pagination page={currentPage} onChange={handlePageChange} count={10} />
                </div>
            </div>
        </div>
    )
}

export default Products