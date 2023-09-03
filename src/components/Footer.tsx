import React from 'react'
import GetInTouch from './GetInTouch'

const Footer = () => {
    return (
        <footer className='relative pt-36 bg-gray-400'>
            <div className='px-56 flex items-center justify-center py-20 shadow-slate-300'>
                <div className='flex space-x-10'>
                    {/* CATEGORIES */}
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-lg'>CATEGORIES</h1>
                        <div className='flex items-start space-x-7'>
                            {/* LEFT SECTION */}
                            <div className='flex flex-col items-start space-y-2'>
                                <p>Beard</p>
                                <p>Fragrance</p>
                                <p>Hair</p>
                                <p>Tools & Accessories</p>
                            </div>
                            {/* RIGHT SECTION */}
                            <div className='flex flex-col items-start space-y-2'>
                                <p>Face</p>
                                <p>Shave</p>
                                <p>Body</p>
                            </div>
                        </div>
                    </div>
                    {/* IMPORTANT LINKS */}
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-lg'>CATEGORIES</h1>
                        <div className='flex items-start space-x-7'>
                            {/* LEFT SECTION */}
                            <div className='flex flex-col items-start space-y-2'>
                                <p>Our Ingredients</p>
                                <p>Partner with us</p>
                                <p>B2B Bulk Buying</p>
                                <p>Privacy Policy</p>
                                <p>Tems & Conditions</p>
                            </div>
                            {/* RIGHT SECTION */}
                            <div className='flex flex-col items-start space-y-2'>
                                <p>About us</p>
                                <p>Franchise Enquiry</p>
                                <p>FAQs</p>
                                <p>Sitemap</p>
                            </div>
                        </div>
                    </div>
                    {/* CONTACT US */}
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-lg'>CONTACT US</h1>
                        <div className='flex items-start'>
                            {/* LEFT SECTION */}
                            <div className='flex flex-col items-start space-y-2 whitespace-normal'>
                                <p>123 Fifth Avenue, New York, NY</p>
                                <p>10160</p>
                                <p>929-242-6868</p>
                                <p>contact@info.com</p>
                            </div>
                        </div>
                    </div>
                    {/* GET IN TOUCH */}
                    <GetInTouch />
                </div>
            </div>
            {/* COPY RIGHTS SECTION */}
            <div className='border-t-[0.2px] py-2 flex items-center justify-center border-slate-200'>
                Copyright Yogam Herbs
            </div>
            <div className="wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
        </footer>

    )
}

export default Footer