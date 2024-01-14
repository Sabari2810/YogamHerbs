import React, { useState } from 'react'
import Button from '../Button'
import { CHECKOUT_ENDPOINT, DELETE_CART_ENDPOINT, LOGO_ENDPOINT } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { resetCart } from '@/redux/features/cartSlice'
import { useAppDispatch } from '@/redux/hooks'

function loadScript(src: string) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const PaymentButton = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const clearCartItems = async () => {
        if (await deleteCart()) {
            dispatch(resetCart())
        }
    }

    const deleteCart = async () => {
        const response = await fetch(DELETE_CART_ENDPOINT, {
            method: "DELETE"
        })
        if (response.ok) {
            return true
        }
        return false
    }

    async function displayRazorpay() {
        setIsLoading(true)
        // LOAD RAZORPAY SCRIPT
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            return
        }

        // GET ORDER INFORMATION
        const response = await fetch(CHECKOUT_ENDPOINT, { method: 'POST' })

        setIsLoading(false);

        if (response.status === 404) {
            return alert("Something's changed, Please refresh the page")
        }

        const data = await response.json();

        const options = {
            key: process.env.RAZOR_PAY_ID,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'Payment',
            description: 'Thank you for choosing Yogam Herbs.',
            image: LOGO_ENDPOINT,
            handler: async function (response: any) {
                await clearCartItems()
                router.push(`/order/${response.razorpay_order_id}`)
            },
            prefill: {
                name,
                email: 'sdfdsjfh2@ndsfdf.com',
                phone_number: '9899999999'
            }
        }
        const _window = window as any
        const paymentObject = _window.Razorpay(options)
        paymentObject.open()
    }

    return (
        <Button className='w-full' isLoading={isLoading} onClick={displayRazorpay} label='Proceed to pay' />
    )
}

export default PaymentButton