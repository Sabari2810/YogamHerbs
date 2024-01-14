import { createOrder, updateRazorOrderId } from "@/lib/services/order";
import { IOrder } from "@/types/types";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
    // CREATE AN ORDER IN DB
    // GET SESSION
    const sessionId = cookies().get('user');

    if (sessionId === undefined) {
        return Response.json({}, {
            status: 404
        })
    }

    const order: IOrder = await createOrder(sessionId.value);

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_ID ?? "",
        key_secret: process.env.RAZOR_PAY_SECRET ?? ""
    })

    const payment_capture = 1

    const options = {
        amount: order.TotalPrice * 100,
        currency: "INR",
        receipt: order.OrderGuid,
        payment_capture
    }

    const response = await razorpay.orders.create(options)

    await updateRazorOrderId(order.OrderId, response.id);

    return new Response(JSON.stringify({
        id: response.id,
        currency: response.currency,
        amount: response.amount
    }))
}