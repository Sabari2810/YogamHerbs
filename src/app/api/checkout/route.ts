import { createOrder } from "@/lib/services/order";
import { IOrder } from "@/types/types";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
    // CREATE AN ORDER IN DB
    // GET SESSION
    const sessionId = cookies().get('user');

    console.log('sessionId', sessionId)

    if (sessionId === undefined) {
        return Response.json({}, {
            status: 404
        })
    }

    const order: IOrder = await createOrder(sessionId.value);

    const razorpay = new Razorpay({
        key_id: 'rzp_test_6O84cWnqInEa8T',
        key_secret: '6mgeEdeNi9fN6qpk2qT13ZgF'
    })

    const payment_capture = 1

    const options = {
        amount: order.TotalPrice * 100,
        currency: "INR",
        receipt: order.OrderGuid,
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)

        return new Response(JSON.stringify({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        }))
    } catch (error) {
        console.log(error)
    }
}