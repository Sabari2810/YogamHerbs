import { getProducts } from "@/lib/services/products";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const products = await getProducts();
    return Response.json(products);
}