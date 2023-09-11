"use server"
import { prisma } from "./prisma"

export const getProducts = async () => {
    const products = await prisma.product.findMany({
        include: {
            ProductVariant: {
                where: {
                    is_default: true
                }
            }
        }
    })

    return products
}