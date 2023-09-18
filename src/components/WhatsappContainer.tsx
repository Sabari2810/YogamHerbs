"use client"
import Image from 'next/image'
import React from 'react'

const WhatsappContainer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <>
            <Image src={"/whatsapp.png"} width={45} height={50} alt='whatsapp' />
            <Image onClick={scrollToTop} src={"/arrow-up.png"} width={40} height={45} alt='whatsapp' />
        </>
    )
}

export default WhatsappContainer