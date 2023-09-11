import { prisma } from "@/lib/prisma";

interface IParams {
    params: {
        productId: string
    }
}

export async function GET(req: Request,
    { params }: IParams) {
    const product = prisma.product.findFirst({
        where: {
            id: params.productId
        },
        select: {}
    })
    return new Response(params.productId);
}