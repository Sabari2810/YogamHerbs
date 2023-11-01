import { prisma } from "@/lib/prisma";
import { getCartDetails } from "@/lib/services/cart";
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
    const { productVariantId, action }: IAddToCartRequestBody = await req.json();

    const sessionId = req.cookies.get("user");

    // INSERT A NEW RECORD WIH A SESSION ID AND THE PRODUCT VARIANT ID
    // UPDATE THE QUANTITY BY ONE IF THE RECORD ALREADY EXIST

    try {
        const cart = await prisma.yH_Cart.upsert({
            where: {
                SessionId_ProductVariantId_FK: {
                    SessionId: sessionId!.value,
                    ProductVariantId_FK: productVariantId,
                }
            },
            update: {
                Quantity: {
                    increment: action == "INCREMENT" ? 1 : -1
                },
                ModifiedDt: new Date()
            },
            create: {
                Quantity: 1,
                SessionId: sessionId!.value,
                ProductVariantId_FK: productVariantId
            }
        })
    } catch (error) {
        console.log('error', error)
    }


    return new Response();
}