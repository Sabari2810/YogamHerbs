import { getProducts } from "@/lib/services/products";
import { IGetProductsRequestBody } from "@/types/apitypes";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { page }: IGetProductsRequestBody = await req.json();
    const products = await getProducts(page);
    return Response.json(products);
}