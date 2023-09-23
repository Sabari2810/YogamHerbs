import { selectCartValue, setCartItem } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { CART_ENDPOINT } from '@/lib/constants';

interface IMenuItem {
    title: string;
    path: string;
}

const Header = () => {
    const cartCount = useAppSelector(selectCartValue);
    const dispatch = useAppDispatch();

    const getCartCount = async () => {
        const response = await fetch(CART_ENDPOINT)
        if (response.ok) {
            const count = await response.json();
            dispatch(setCartItem(count))
        }
    }

    useEffect(() => {
        getCartCount()
    }, [])


    const menuItems: IMenuItem[] = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "Products",
            path: "/products"
        },
        {
            title: "Gifts",
            path: "/gifts"
        },
        {
            title: "About us",
            path: "/about-us"
        },
        {
            title: "Contact us",
            path: "#getintouch"
        }
    ]

    return (
        <div className='top-0 sticky z-50 flex items-center w-full justify-between px-12 h-16 bg-white shadow-sm shadow-slate-300'>
            {/* LEFT ACTIONS */}
            <div className='flex items-center min-w-[500px] justify-between'>
                {/* LOGO */}
                <Image width={100} height={100} alt='' src={"/main-logo.png"} />
                {/* MENU ITEMS */}
                <div className='flex items-center space-x-4'>
                    {menuItems.map((menuItem) => (
                        <Link scroll={true} href={menuItem.path} key={menuItem.title}>{menuItem.title}</Link>
                    ))}
                </div>
            </div>
            {/* RIGHT ACTIONS */}
            <div className='flex items-center space-x-4'>
                <div className='relative'>
                    <AiOutlineShoppingCart size={25} />
                    <p className='absolute bg-red-600 text-xs flex items-center justify-center
                      text-white p-1 rounded-full h-5 w-5 -top-2 -right-3'>{cartCount}</p>
                </div>
                <div className='h-6 border border-slate-500'></div>
                <AiOutlineUser size={25} />
                <div className='h-6 border border-slate-500'></div>
                <LiaShippingFastSolid size={25} />
            </div>
        </div>
    )
}

export default Header