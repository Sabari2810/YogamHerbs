import { prisma } from "@/lib/prisma";
import { IAddToCartRequestBody } from "@/types/apitypes";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const sessionId = req.cookies.get("user");

    const data = await prisma.cart.findMany({
        where: { session_id: sessionId?.value },
        select: {
            ProductVariant: {
                select: {
                    id: true,
                }
            },
            quantity: true
        }
    })

    const quantity = data.reduce((total, cartItem) => total + cartItem.quantity, 0)

    return new Response(JSON.stringify(quantity));
}

export async function POST(req: NextRequest) {
    const { productVariantId }: IAddToCartRequestBody = await req.json();

    const sessionId = req.cookies.get("user");

    // INSERT A NEW RECORD WIH A SESSION ID AND THE PRODUCT VARIANT ID
    // UPDATE THE QUANTITY BY ONE IF THE RECORD ALREADY EXIST

    try {
        const cart = await prisma.cart.upsert({
            where: {
                session_id_product_variant_id: {
                    session_id: sessionId!.value,
                    product_variant_id: productVariantId,
                }
            },
            update: {
                quantity: {
                    increment: 1
                }
            },
            create: {
                quantity: 1,
                session_id: sessionId!.value,
                updated_date: new Date(),
                product_variant_id: productVariantId
            }
        })
    } catch (error) {
        console.log('error', error)
    }


    return new Response();
}