import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";

interface IMenuItem {
    title: string;
    path: string;
}

const Header = () => {

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
            <div className='flex items-center space-x-2'>
                <AiOutlineShoppingCart size={25} />
                <div className='h-6 border border-slate-500'></div>
                <AiOutlineUser size={25} />
                <div className='h-6 border border-slate-500'></div>
                <LiaShippingFastSolid size={25} />
            </div>
        </div>
    )
}

export default Header