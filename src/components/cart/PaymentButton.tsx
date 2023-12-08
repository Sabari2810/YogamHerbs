import React from 'react'
import Button from '../Button'
import { CHECKOUT_ENDPOINT, LOGO_ENDPOINT } from '@/lib/constants'

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
    async function displayRazorpay() {
        // LOAD RAZORPAY SCRIPT
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            return
        }

        // GET ORDER INFORMATION
        const response = await fetch(CHECKOUT_ENDPOINT, { method: 'POST' })

        if (response.status === 404) {
            return alert("Something's changed, Please refresh the page")
        }

        const data = await response.json();

        const options = {
            key: "rzp_test_6O84cWnqInEa8T",
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'Donation',
            description: 'Thank you for choosing Yogam Herbs.',
            image: LOGO_ENDPOINT,
            handler: function (response: any) {
                alert(response.razorpay_payment_id)
                alert(response.razorpay_order_id)
                alert(response.razorpay_signature)
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
        <Button className='w-full' onClick={displayRazorpay} label='Proceed to pay' />
    )
}

export default PaymentButton