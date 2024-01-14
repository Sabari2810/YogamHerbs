import { deleteCart, getCartDetails, updateCartDetails } from "@/lib/services/cart";
import { IAddToCartRequestBody } from "@/types/apitypes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const sessionId = req.cookies.get("user");
    if (sessionId === undefined) {
        return Response.json("Invalid Session", {
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

export async function DELETE(req: NextRequest) {
    const sessionId = req.cookies.get("user");
    if (sessionId === undefined) {
        return Response.json("Invalid Session", {
            status: 404
        })
    }
    await deleteCart(sessionId?.value);
}