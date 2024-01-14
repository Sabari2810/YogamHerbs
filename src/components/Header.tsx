import { selectCartTotalCount, setCartCount } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AiFillAppstore, AiOutlineGift, AiOutlineHome, AiOutlineIdcard, AiOutlineMenu, AiOutlineMenuFold, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { CART_COUNT_ENDPOINT, CART_ENDPOINT } from '@/lib/constants';
import { useRouter } from 'next/router';
import HeaderDrawer from './HeaderDrawer';
import { setIsDrawerOpen } from '@/redux/features/drawerSlice';
import { IconType } from 'react-icons';

export interface IMenuItem {
    title: string;
    path: string;
    icon: IconType
}

const Header = () => {
    const cartCount = useAppSelector(selectCartTotalCount);
    const dispatch = useAppDispatch();

    async function getCartCount() {
        const response = await fetch(CART_COUNT_ENDPOINT)
        if (response.ok) {
            const count = await response.json();
            dispatch(setCartCount(count))
        }
    }

    useEffect(() => {
        getCartCount()
    }, [])


    const menuItems: IMenuItem[] = [
        {
            title: "Home",
            path: "/",
            icon: AiOutlineHome
        },
        {
            title: "Products",
            path: "/products",
            icon: AiFillAppstore
        },
        {
            title: "Gifts",
            path: "/gifts",
            icon: AiOutlineGift
        },
        {
            title: "About us",
            path: "/about-us",
            icon: AiOutlineIdcard
        },
        {
            title: "Contact us",
            path: "#getintouch",
            icon: AiOutlineUser
        }
    ]

    return (
        <>
            <div className='top-0 sticky z-50 flex items-center w-full justify-between px-4 md:px-12 h-12 md:h-16 bg-white shadow-sm shadow-slate-300'>
                {/* LEFT ACTIONS */}
                <div className='flex items-center space-x-4 md:space-x-0 md:min-w-[500px] justify-between'>
                    {/* LOGO */}
                    <button className='md:hidden' onClick={() => dispatch(setIsDrawerOpen(true))}>
                        <AiOutlineMenu size={25} />
                    </button>
                    <Image className='h-7 md:h-9 w-20 md:w-28' width={100} height={100} alt='' src={"/yogam-main.png"} />
                    {/* MENU ITEMS */}
                    <div className='items-center hidden md:flex space-x-4'>
                        {menuItems.map((menuItem) => (
                            <Link scroll={true} href={menuItem.path} key={menuItem.title}>{menuItem.title}</Link>
                        ))}
                    </div>
                </div>
                {/* RIGHT ACTIONS */}
                <div className='flex items-center space-x-4'>
                    <Link href={"/cart"} className='relative'>
                        <AiOutlineShoppingCart size={25} />
                        <p className='absolute bg-[#E7700D] text-xs flex items-center justify-center
                      text-white p-1 rounded-full h-5 w-5 -top-2 -right-3'>{cartCount}</p>
                    </Link>
                    <div className='h-6 border border-slate-500'></div>
                    <AiOutlineUser size={25} />
                    <div className='h-6 border border-slate-500'></div>
                    <LiaShippingFastSolid size={25} />
                </div>
            </div>
            <HeaderDrawer menuItems={menuItems} />
        </>

    )
}

export default Header