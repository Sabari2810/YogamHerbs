import { CreatePayment } from "@/lib/services/checkout";
import { IRazorPaymentDetails } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const secret = "VUP6tvw_nbq7tvt9fwg";
    const body: IRazorPaymentDetails = await req.json()

    // VERIFICATION
    const crypto = require("crypto");
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(body))
    const digest = shasum.digest('hex')
    if (digest !== req.headers.get("x-razorpay-signature")) {
        return new Response("Un Authorized", {
            status: 401
        })
    }
    console.log('body.', body.payload.payment.entity.order_id)
    // INSERT PAYMENT DETAILS INTO DB
    await CreatePayment(JSON.stringify(body));

    return new Response()
}