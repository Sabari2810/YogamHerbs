import { getProductVariants } from "@/lib/services/products";

interface IParams {
    params: {
        productGuid: string
    }
}

export async function GET(req: Request,
    { params }: IParams) {

    if (params.productGuid === "") {
        return new Response("Invalid GUID", {
            status: 400
        })
    }

    const productVariants = await getProductVariants(params.productGuid)

    return Response.json(productVariants);
}