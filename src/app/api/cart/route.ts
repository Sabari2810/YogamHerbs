import { prisma } from "@/lib/prisma";
import { getCartDetails, updateCartDetails } from "@/lib/services/cart";
import { IAddToCartRequestBody } from "@/types/apitypes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const sessionId = req.cookies.get("user");
    if (sessionId === undefined) {
        return Response.json({
            status: 404
        })
    }

    const cartDetails = await getCartDetails(sessionId.value);

    return new Response(JSON.stringify(cartDetails));
}

export async function POST(req: NextRequest) {
    const { productVariantId, value }: IAddToCartRequestBody = await req.json();
    const sessionId = req.cookies.get("user");
    await updateCartDetails(sessionId?.value!, productVariantId, value)
    return new Response();
}