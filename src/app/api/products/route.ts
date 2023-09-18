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
            },
            discount: {
                where: {
                    valid_upto: {
                        gt: new Date()
                    }
                },
                select: {
                    value: true,
                    discount_type: true
                }
            }
        }
    });
    const final_products = products.map(product => ({
        ...product,
        discount_price: (product.ProductVariant[0].price - (product.discount?.value! / 100) * product.ProductVariant[0].price).toFixed()
    }))
    return new Response(JSON.stringify(final_products));
}