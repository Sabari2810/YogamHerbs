import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const secret = "VUP6tvw_nbq7tvt9fwg";
    const body = await req.json()

    const crypto = require("crypto");
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(body))
    const digest = shasum.digest('hex')
    console.log(digest, req.headers.get("x-razorpay-signature"));

    return new Response()
}