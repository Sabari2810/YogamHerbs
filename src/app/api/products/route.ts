import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            ProductVariant: {
                where: {
                    is_default: true
                },
                select: {
                    id: true,
                    price: true,
                    stock_quantity: true,
                }
            }
        }
    });
    return new Response(JSON.stringify(products));
}